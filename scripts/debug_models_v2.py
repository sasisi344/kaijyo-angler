
from google import genai
import os
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=API_KEY)

print("Listing available models via google-genai SDK...")

try:
    # Note: methods to list models vary by SDK version. 
    # Attempting standard list_models approach.
    pager = client.models.list()
    
    print(f"{'Model Name':<50} | {'Capabilities'}")
    print("-" * 70)
    
    for model in pager:
        print(f"{model.name:<50}")
        # Logic to check if it's an image generation model
        # Usually they have 'imagen' or 'generate-images' capability
        
except Exception as e:
    print(f"Error listing models: {e}")
