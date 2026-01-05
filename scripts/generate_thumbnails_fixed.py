from google import genai
from google.genai import types
import os
from PIL import Image
import io
import frontmatter
from pathlib import Path
from dotenv import load_dotenv
import time
import yaml

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("Error: GOOGLE_API_KEY not found.")
    exit(1)

# Initialize Client
client = genai.Client(api_key=API_KEY)

# 画像生成に対応したモデルを使用
# オプション1: Gemini 2.5 Flash Image (テキストから画像生成)
# オプション2: Imagen 4.0 (より高品質)
MODEL_NAME = "gemini-2.5-flash-image"  # または "imagen-4.0-fast-generate-001"

CONTENT_DIR = Path("content")
IMAGE_FILENAME = "cover.jpg"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

# Retry configuration
MAX_RETRIES = 3
RETRY_DELAY = 15  # Seconds

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
    """Gemini APIを使用してサムネイル画像を生成"""
    try:
        prompt_template = load_prompt_template()
        prompt = prompt_template.format(title=title)
        
        print(f"  > プロンプト: {prompt[:100]}...")
        
        # 画像生成APIを呼び出す
        # generate_content ではなく generate_images を使用
        try:
            response = client.models.generate_images(
                model=MODEL_NAME,
                prompt=prompt,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    # aspect_ratio="16:9",  # オプション: アスペクト比を指定
                    safety_filter_level="block_some",
                    person_generation="allow_adult"
                )
            )
            
            # 生成された画像を取得
            if response.generated_images and len(response.generated_images) > 0:
                generated_image = response.generated_images[0]
                
                # 画像データを取得
                # generated_image.image.data にバイトデータが含まれる
                if hasattr(generated_image, 'image') and hasattr(generated_image.image, 'data'):
                    image_bytes = generated_image.image.data
                    return resize_and_save_image(image_bytes, output_path)
                else:
                    print(f"  [警告] 画像データの形式が予期しないものです")
                    return False
            else:
                print(f"  [警告] 画像が生成されませんでした")
                return False
                
        except AttributeError as attr_err:
            # generate_images メソッドが存在しない場合のフォールバック
            print(f"  [警告] generate_images メソッドが使えません。generate_content を試します...")
            
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=prompt
            )
            
            # レスポンスから画像を抽出
            if hasattr(response, 'candidates') and response.candidates:
                for candidate in response.candidates:
                    if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                        for part in candidate.content.parts:
                            if hasattr(part, 'inline_data') and part.inline_data:
                                image_bytes = part.inline_data.data
                                return resize_and_save_image(image_bytes, output_path)
            
            print(f"  [警告] レスポンスに画像データが含まれていません")
            return False
            
    except Exception as e:
        print(f"  [エラー] API呼び出しエラー: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_shizuoka():
    """静岡の記事のみを処理（テスト用）"""
    search_path = CONTENT_DIR / "shizuoka"
    
    if not search_path.exists():
        print(f"エラー: {search_path} が見つかりません")
        return
    
    files = list(search_path.rglob("index.md"))
    
    print(f"静岡エリアで {len(files)} 件の記事を発見しました。")
    
    count_generated = 0
    count_skipped = 0
    count_error = 0
    
    for i, file_path in enumerate(files):
        try:
            post = frontmatter.load(file_path)
            title = post.get('title')
            
            if not title:
                print(f"[{i+1}/{len(files)}] スキップ: タイトルなし ({file_path.parent.name})")
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
    print(f"サムネイル生成スクリプト起動")
    print(f"使用モデル: {MODEL_NAME}")
    print(f"対象: 静岡エリアの記事")
    print("="*50)
    process_shizuoka()


