# 公式のBanana in costume imageのスクリプトをテスト
# pip install google-genai

import base64
import mimetypes
import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

def save_binary_file(file_name, data):
    f = open(file_name, "wb")
    f.write(data)
    f.close()
    print(f"ファイル保存成功: {file_name}")


def generate():
    api_key = os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        print("エラー: GOOGLE_API_KEY が見つかりません")
        return
    
    client = genai.Client(api_key=api_key)

    model = "gemini-2.5-flash-image"
    
    # 釣りブログのサムネイル用プロンプト
    test_prompt = """
    美しい海釣り公園の高品質なサムネイル画像を生成してください。
    - 晴れた日の明るい雰囲気
    - 青い海と空
    - 釣り竿や釣り人のシルエット
    - フォトリアリスティックなスタイル
    - 鮮やかで目を引く色彩
    """
    
    contents = [
        types.Content(
            role="user",
            parts=[
                types.Part.from_text(text=test_prompt),
            ],
        ),
    ]
    
    generate_content_config = types.GenerateContentConfig(
        response_modalities=[
            "IMAGE",
            "TEXT",
        ],
    )

    print("="*60)
    print("公式メソッドでの画像生成テスト")
    print("="*60)
    print(f"モデル: {model}")
    print(f"プロンプト: {test_prompt[:50]}...")
    print("\n生成中...\n")

    file_index = 0
    try:
        for chunk in client.models.generate_content_stream(
            model=model,
            contents=contents,
            config=generate_content_config,
        ):
            if (
                chunk.candidates is None
                or chunk.candidates[0].content is None
                or chunk.candidates[0].content.parts is None
            ):
                continue
            
            if chunk.candidates[0].content.parts[0].inline_data and chunk.candidates[0].content.parts[0].inline_data.data:
                file_name = f"test_official_output_{file_index}"
                file_index += 1
                inline_data = chunk.candidates[0].content.parts[0].inline_data
                data_buffer = inline_data.data
                file_extension = mimetypes.guess_extension(inline_data.mime_type)
                save_binary_file(f"{file_name}{file_extension}", data_buffer)
                print(f"[SUCCESS] 画像が生成されました！")
            else:
                if hasattr(chunk, 'text') and chunk.text:
                    print(f"[テキストレスポンス] {chunk.text}")
        
        if file_index == 0:
            print("\n[警告] 画像は生成されませんでした")
        else:
            print(f"\n[成功] {file_index}枚の画像を生成しました")
            
    except Exception as e:
        print(f"\n[ERROR] エラーが発生しました: {e}")
        import traceback
        traceback.print_exc()
    
    print("\n" + "="*60)

if __name__ == "__main__":
    generate()


