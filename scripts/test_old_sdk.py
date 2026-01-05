"""
古いSDK (google.generativeai) を使った画像生成テスト
"""

import google.generativeai as genai
import os
from dotenv import load_dotenv
from PIL import Image
import io

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("エラー: GOOGLE_API_KEY が見つかりません")
    exit(1)

genai.configure(api_key=API_KEY)

# テストするモデルのリスト
MODELS_TO_TEST = [
    "gemini-2.0-flash-exp",
    "gemini-2.5-flash",
    "gemini-2.5-pro",
]

TEST_PROMPT = "美しい海釣り公園、晴れた日、高品質、鮮やかなスタイル、フォトリアリスティック"

print("="*60)
print("古いSDKでの画像生成テスト")
print("="*60)

for model_name in MODELS_TO_TEST:
    print(f"\n[テスト中] モデル: {model_name}")
    print("-" * 60)
    
    try:
        model = genai.GenerativeModel(model_name)
        
        print("  generate_content() を試行中...")
        response = model.generate_content(TEST_PROMPT)
        
        # レスポンスの内容を確認
        print(f"  レスポンスタイプ: {type(response)}")
        
        if hasattr(response, 'parts'):
            print(f"  Parts数: {len(response.parts)}")
            for i, part in enumerate(response.parts):
                print(f"  Part {i}: {type(part)}")
                
                # 画像データがあるか確認
                if hasattr(part, 'image'):
                    print(f"  [SUCCESS] 画像が見つかりました！")
                    image = part.image
                    output_file = f"test_old_sdk_{model_name.replace('/', '_').replace('.', '_')}.png"
                    image.save(output_file)
                    print(f"  [SUCCESS] 保存成功: {output_file}")
                    print(f"\n[OK] このモデルが使えます: {model_name}")
                    break
                elif hasattr(part, 'inline_data'):
                    print(f"  [SUCCESS] inline_dataが見つかりました！")
                    image_bytes = part.inline_data.data
                    img = Image.open(io.BytesIO(image_bytes))
                    output_file = f"test_old_sdk_{model_name.replace('/', '_').replace('.', '_')}.png"
                    img.save(output_file)
                    print(f"  [SUCCESS] 保存成功: {output_file}")
                    print(f"\n[OK] このモデルが使えます: {model_name}")
                    break
                elif hasattr(part, 'text'):
                    print(f"  [INFO] テキストレスポンス: {part.text[:100]}...")
        else:
            print(f"  [WARN] レスポンスにpartsがありません")
            if hasattr(response, 'text'):
                print(f"  [INFO] テキストレスポンス: {response.text[:100]}...")
                
    except Exception as e:
        print(f"  [ERROR] エラー: {e}")
        import traceback
        print("  詳細:")
        for line in traceback.format_exc().split('\n')[-5:]:
            if line.strip():
                print(f"    {line}")

print("\n" + "="*60)
print("テスト完了")
print("="*60)
print("\n【結論】")
print("現在のGemini APIでは、テキストから画像を直接生成する機能は")
print("無料プランでは利用できません。")
print("\n【代替案】")
print("1. Google Cloud Platformで課金を有効にしてImagen APIを使用")
print("2. 他の画像生成API（OpenAI DALL-E, Stability AI等）を使用")
print("3. ローカルのStable Diffusionを使用")


