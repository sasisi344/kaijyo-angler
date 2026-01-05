"""
タイトルを直接指定してサムネイル生成をテスト
"""

import mimetypes
import os
from pathlib import Path
import yaml
from google import genai
from google.genai import types
from dotenv import load_dotenv
from PIL import Image
import io

# 環境変数を読み込む
load_dotenv()

# 設定
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = "gemini-2.5-flash-image"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

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
    """サムネイル画像を生成"""
    try:
        client = genai.Client(api_key=API_KEY)
        
        # プロンプトテンプレートを読み込み
        prompt_template = load_prompt_template()
        prompt = prompt_template.format(title=title)
        
        print(f"\n  プロンプト（最初の200文字）:")
        print(f"  {prompt[:200]}...")
        
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
        
        print(f"\n  生成中...")
        
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
                    print(f"  [AI応答] {chunk.text[:80]}...")
        
        return image_generated
        
    except Exception as e:
        print(f"  [エラー] API呼び出しエラー: {e}")
        return False


def test_with_title():
    """タイトルを直接指定してテスト"""
    
    # 実際の記事タイトル
    title = "【静岡県】新居弁天海釣公園｜24時間営業で浜名湖を満喫できる釣りスポット・料金・アクセス情報"
    output_path = Path("content/shizuoka/araibenten-sea-fishing-park/cover.jpg")
    
    print("="*60)
    print("タイトル指定でサムネイル生成テスト")
    print("="*60)
    print(f"\nタイトル: {title}")
    print(f"保存先: {output_path}")
    
    print(f"\n{MODEL_NAME} で生成中...")
    
    success = generate_thumbnail(title, output_path)
    
    if success:
        print("\n" + "="*60)
        print("✓ 成功！サムネイルが生成されました")
        print("="*60)
        print(f"保存先: {output_path}")
    else:
        print("\n" + "="*60)
        print("✗ 失敗しました")
        print("="*60)


if __name__ == "__main__":
    test_with_title()


