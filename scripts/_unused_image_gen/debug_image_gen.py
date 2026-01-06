from google import genai
from google.genai import types
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("NO API KEY FOUND")
    exit(1)

client = genai.Client(api_key=api_key)

models = [
    "imagen-3.0-generate-001",
    "imagen-4.0-fast-generate-001", 
    "gemini-2.5-flash-image-preview"
]


with open("debug_result.txt", "w", encoding="utf-8") as f:
    f.write("--- START DEBUG ---\n")
    for m in models:
        print(f"Testing model: {m}")
        f.write(f"Testing model: {m}\n")
        try:
            response = client.models.generate_images(
                model=m,
                prompt="A cute robot fish in the ocean",
                config=types.GenerateImagesConfig(number_of_images=1)
            )
            print(f"SUCCESS: {m}")
            f.write(f"SUCCESS: {m}\n")
            if response.generated_images:
                f.write("  Image data received.\n")
        except Exception as e:
            print(f"FAILED: {m}")
            f.write(f"FAILED: {m}\n")
            f.write(f"  Error: {str(e)}\n")
    f.write("--- END DEBUG ---\n")

