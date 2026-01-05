import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.environ.get("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

print("Testing Text Generation with Gemini 1.5 Flash...")
try:
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Hello, are you working?")
    print(f"Success! Response: {response.text}")
except Exception as e:
    print(f"Text Generation Failed: {e}")

print("\nTesting Image Generation with Gemini 2.0 Flash Exp...")
try:
    model = genai.GenerativeModel("gemini-2.0-flash-exp")
    response = model.generate_content("A drawing of a fish.")
    if response.parts and hasattr(response.parts[0], 'image'):
        print("Success! Image generated.")
    else:
        print("Failed to generate image (or no image returned).")
        # print(response)
except Exception as e:
    print(f"Image Generation Failed: {e}")
