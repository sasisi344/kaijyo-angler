
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("No API key found in .env")
    exit()

genai.configure(api_key=api_key)

print(f"Checking models with API Key: {api_key[:5]}...")

try:
    models = list(genai.list_models())
    found = False
    print("Available models supporting generation:")
    for m in models:
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
            if "gemini-2.5" in m.name or "banana" in m.name.lower():
                found = True
                print(f"  *** FOUND TARGET: {m.name} ***")
    
    if not found:
        print("\nWARNING: 'gemini-2.5-flash-image' or similar not found in list.")
        print("You might need to use 'gemini-1.5-flash' or another available model.")

except Exception as e:
    print(f"Error listing models: {e}")
