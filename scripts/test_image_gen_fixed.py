"""
画像生成APIのテストスクリプト
複数のモデルを試して、どれが動作するか確認します
"""

from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
from PIL import Image
import io

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("エラー: GOOGLE_API_KEY が見つかりません")
    exit(1)

client = genai.Client(api_key=API_KEY)

# テストするモデルのリスト
MODELS_TO_TEST = [
    "imagen-4.0-fast-generate-001",
    "imagen-4.0-generate-001",
    "gemini-2.0-flash-exp-image-generation",
    "gemini-2.5-flash-image-preview",
]

TEST_PROMPT = "美しい海釣り公園、晴れた日、高品質、鮮やかなスタイル、フォトリアリスティック"

print("="*60)
print("画像生成APIテスト開始")
print("="*60)

for model_name in MODELS_TO_TEST:
    print(f"\n【テスト中】 モデル: {model_name}")
    print("-" * 60)
    
    try:
        # 方法1: generate_images を試す
        try:
            print("  方法1: generate_images() を試行中...")
            response = client.models.generate_images(
                model=model_name,
                prompt=TEST_PROMPT,
                config=types.GenerateImagesConfig(
                    number_of_images=1,
                    safety_filter_level="block_low_and_above",
                    person_generation="allow_adult"
                )
            )
            
            if response.generated_images and len(response.generated_images) > 0:
                print(f"  [SUCCESS] generate_images() で画像生成できました")
                
                # 画像を保存
                generated_image = response.generated_images[0]
                if hasattr(generated_image, 'image') and hasattr(generated_image.image, 'data'):
                    image_bytes = generated_image.image.data
                    img = Image.open(io.BytesIO(image_bytes))
                    output_file = f"test_output_{model_name.replace('/', '_').replace('.', '_')}.png"
                    img.save(output_file)
                    print(f"  [SUCCESS] 保存成功: {output_file} (サイズ: {img.size})")
                    print(f"\n[OK] このモデルが使えます: {model_name}")
                    print("="*60)
                    break  # 成功したら終了
            else:
                print(f"  [WARN] 画像が生成されませんでした")
                
        except AttributeError as attr_err:
            print(f"  [INFO] generate_images() メソッドが存在しません")
            
            # 方法2: generate_content を試す
            print("  方法2: generate_content() を試行中...")
            response = client.models.generate_content(
                model=model_name,
                contents=TEST_PROMPT
            )
            
            # レスポンスから画像を抽出
            image_found = False
            
            if hasattr(response, 'candidates') and response.candidates:
                for candidate in response.candidates:
                    if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                        for part in candidate.content.parts:
                            if hasattr(part, 'inline_data') and part.inline_data:
                                image_bytes = part.inline_data.data
                                img = Image.open(io.BytesIO(image_bytes))
                                output_file = f"test_output_{model_name.replace('/', '_').replace('.', '_')}.png"
                                img.save(output_file)
                                print(f"  [SUCCESS] generate_content() で画像生成できました")
                                print(f"  [SUCCESS] 保存成功: {output_file} (サイズ: {img.size})")
                                print(f"\n[OK] このモデルが使えます: {model_name}")
                                print("="*60)
                                image_found = True
                                break
                    if image_found:
                        break
            
            if image_found:
                break  # 成功したら終了
            else:
                print(f"  [WARN] レスポンスに画像データが含まれていません")
                
    except Exception as e:
        print(f"  [ERROR] エラー: {e}")
        # エラーの詳細を表示
        import traceback
        print("  詳細:")
        for line in traceback.format_exc().split('\n')[-5:]:
            if line.strip():
                print(f"    {line}")

print("\n" + "="*60)
print("テスト完了")
print("="*60)

