"""
レスポンスの詳細を確認するスクリプト
"""

import google.generativeai as genai
import os
from dotenv import load_dotenv
import warnings
warnings.filterwarnings('ignore')

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("エラー: GOOGLE_API_KEY が見つかりません")
    exit(1)

genai.configure(api_key=API_KEY)

TEST_PROMPT = "美しい海釣り公園、晴れた日、高品質、鮮やかなスタイル、フォトリアリスティック"

print("="*60)
print("レスポンス詳細確認")
print("="*60)

try:
    model = genai.GenerativeModel("gemini-2.5-flash")
    
    print(f"\nプロンプト: {TEST_PROMPT}")
    print("\ngenerate_content() を実行中...")
    
    response = model.generate_content(TEST_PROMPT)
    
    print(f"\nレスポンスタイプ: {type(response)}")
    print(f"Parts数: {len(response.parts)}")
    
    for i, part in enumerate(response.parts):
        print(f"\n--- Part {i} ---")
        print(f"タイプ: {type(part)}")
        print(f"属性: {dir(part)}")
        
        if hasattr(part, 'text'):
            print(f"\nテキスト内容:")
            print(part.text[:500])
        
        if hasattr(part, 'inline_data'):
            print(f"\ninline_data が存在します")
            inline_data = part.inline_data
            print(f"inline_data タイプ: {type(inline_data)}")
            print(f"inline_data 属性: {dir(inline_data)}")
            
            if hasattr(inline_data, 'mime_type'):
                print(f"MIME Type: {inline_data.mime_type}")
            
            if hasattr(inline_data, 'data'):
                data = inline_data.data
                print(f"データタイプ: {type(data)}")
                print(f"データ長: {len(data) if data else 0}")
                
                # 最初の数バイトを確認
                if data:
                    print(f"最初の20バイト: {data[:20]}")
                    
                    # 画像かテキストか判定
                    if data.startswith(b'\x89PNG') or data.startswith(b'\xff\xd8\xff'):
                        print("[OK] これは画像データです！")
                    else:
                        print("[INFO] これは画像データではありません")
                        # テキストとして解釈してみる
                        try:
                            text_content = data.decode('utf-8')
                            print(f"テキスト内容: {text_content[:200]}")
                        except:
                            print("テキストとしてデコードできませんでした")
        
        if hasattr(part, 'image'):
            print(f"\nimage属性が存在します！")
            
except Exception as e:
    print(f"\n[ERROR] エラー: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "="*60)


