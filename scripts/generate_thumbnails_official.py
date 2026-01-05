"""
公式メソッドを使用したサムネイル生成スクリプト
注意: このスクリプトはGemini APIの課金プランが必要です
"""

import mimetypes
import os
import sys
from pathlib import Path
import frontmatter
import yaml
from google import genai
from google.genai import types
from dotenv import load_dotenv
import time
from PIL import Image
import io

# Windows環境での文字コード問題を回避
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 環境変数を読み込む
load_dotenv()

# 設定
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = "gemini-2.5-flash-image"
CONTENT_DIR = Path("content")
IMAGE_FILENAME = "cover.jpg"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

# リトライ設定
MAX_RETRIES = 3
RETRY_DELAY = 15  # 秒

if not API_KEY:
    print("エラー: GOOGLE_API_KEY が見つかりません")
    exit(1)


def load_prompt_template():
    """YAMLファイルからプロンプトテンプレートを読み込む"""
    if not PROMPT_FILE.exists():
        return "High quality fishing blog thumbnail for: {title}"
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        return data.get('thumbnail_prompt', "")


def resize_and_save_image(image_bytes, output_path):
    """画像をリサイズしてJPEGとして保存"""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        if img.width >= 1200:
            ratio = MAX_WIDTH / float(img.width)
            new_height = int(float(img.height) * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
        img.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"  ✓ 保存成功: {output_path} (サイズ: {img.size})")
        return True
    except Exception as e:
        print(f"  [エラー] 保存失敗: {e}")
        return False


def generate_thumbnail(title, output_path):
    """
    公式メソッドを使用してサムネイル画像を生成
    
    Args:
        title: 記事のタイトル
        output_path: 保存先のパス
    
    Returns:
        bool: 成功した場合True
    """
    try:
        client = genai.Client(api_key=API_KEY)
        
        # プロンプトテンプレートを読み込み
        prompt_template = load_prompt_template()
        prompt = prompt_template.format(title=title)
        
        print(f"  > プロンプト: {prompt[:80]}...")
        
        # コンテンツを構築
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_text(text=prompt),
                ],
            ),
        ]
        
        # 画像生成の設定
        generate_content_config = types.GenerateContentConfig(
            response_modalities=[
                "IMAGE",
                "TEXT",
            ],
        )
        
        # ストリーミングで生成
        image_generated = False
        
        for chunk in client.models.generate_content_stream(
            model=MODEL_NAME,
            contents=contents,
            config=generate_content_config,
        ):
            if (
                chunk.candidates is None
                or chunk.candidates[0].content is None
                or chunk.candidates[0].content.parts is None
            ):
                continue
            
            # 画像データがあるか確認
            if (chunk.candidates[0].content.parts[0].inline_data and 
                chunk.candidates[0].content.parts[0].inline_data.data):
                
                inline_data = chunk.candidates[0].content.parts[0].inline_data
                image_bytes = inline_data.data
                
                # 画像を保存
                if resize_and_save_image(image_bytes, output_path):
                    image_generated = True
                    break
            else:
                # テキストレスポンスの場合
                if hasattr(chunk, 'text') and chunk.text:
                    print(f"  [情報] {chunk.text[:100]}...")
        
        return image_generated
        
    except Exception as e:
        print(f"  [エラー] API呼び出しエラー: {e}")
        
        # クォータエラーの場合は特別なメッセージを表示
        if "RESOURCE_EXHAUSTED" in str(e) or "429" in str(e):
            print("\n" + "="*60)
            print("⚠️  クォータ超過エラー")
            print("="*60)
            print("このエラーは以下のいずれかが原因です：")
            print("1. 無料プランでは画像生成機能が利用できません")
            print("2. レート制限に達しました")
            print("\n解決方法：")
            print("- Google AI Studioで課金を有効にしてください")
            print("- https://aistudio.google.com/")
            print("="*60 + "\n")
        
        return False


def process_shizuoka():
    """静岡の記事のみを処理（テスト用）"""
    search_path = CONTENT_DIR / "shizuoka"
    
    if not search_path.exists():
        print(f"エラー: {search_path} が見つかりません")
        return
    
    # index.mdファイルを検索
    files = []
    for item in search_path.iterdir():
        if item.is_dir():
            index_file = item / "index.md"
            if index_file.exists():
                files.append(index_file)
    
    print(f"静岡エリアで {len(files)} 件の記事を発見しました。")
    
    count_generated = 0
    count_skipped = 0
    count_error = 0
    
    for i, file_path in enumerate(files):
        try:
            # frontmatterを読み込む
            post = frontmatter.loads(file_path.read_text(encoding='utf-8'))
            
            title = post.get('title')
            
            # デバッグ出力
            if not title:
                print(f"[{i+1}/{len(files)}] デバッグ: {file_path}")
                print(f"  metadata keys: {list(post.metadata.keys())[:5]}")
                print(f"  スキップ: タイトルなし ({file_path.parent.name})")
                continue
            
            print(f"\n[{i+1}/{len(files)}] 処理中: {title}")
            
            image_path = file_path.parent / IMAGE_FILENAME
            
            if not image_path.exists():
                print(f"  > {MODEL_NAME} で生成中...")
                
                success = False
                attempts = 0
                
                while not success and attempts < MAX_RETRIES:
                    attempts += 1
                    
                    success = generate_thumbnail(title, image_path)
                    
                    if success:
                        count_generated += 1
                        # frontmatterを更新
                        if post.get('featureimage') != IMAGE_FILENAME:
                            post['featureimage'] = IMAGE_FILENAME
                            with open(file_path, 'wb') as f:
                                frontmatter.dump(post, f)
                            print("  ✓ frontmatter更新完了")
                        break
                    else:
                        if attempts < MAX_RETRIES:
                            print(f"    リトライ {attempts}/{MAX_RETRIES} を {RETRY_DELAY}秒後に実行...")
                            time.sleep(RETRY_DELAY)
                
                if not success:
                    print("  ✗ リトライ後も失敗しました")
                    count_error += 1
                    
                # レート制限対策
                time.sleep(3)
            else:
                print("  > スキップ (画像が既に存在)")
                count_skipped += 1
                
        except Exception as e:
            print(f"  [エラー] ループ処理エラー: {e}")
            count_error += 1
    
    print("\n" + "="*50)
    print("処理完了サマリー")
    print("="*50)
    print(f"総記事数:     {len(files)}")
    print(f"生成成功:     {count_generated}")
    print(f"スキップ:     {count_skipped}")
    print(f"エラー:       {count_error}")
    print("="*50)


if __name__ == "__main__":
    print("="*60)
    print("サムネイル生成スクリプト（公式メソッド版）")
    print("="*60)
    print(f"使用モデル: {MODEL_NAME}")
    print(f"対象: 静岡エリアの記事")
    print("\n注意: このスクリプトは課金プランが必要です")
    print("="*60 + "\n")
    
    process_shizuoka()

