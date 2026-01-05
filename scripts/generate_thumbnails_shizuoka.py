import os
import time
import io
import sys
import frontmatter
from pathlib import Path
from PIL import Image
from google import genai
from google.genai import types
from dotenv import load_dotenv
import yaml

load_dotenv()

API_KEY = os.environ.get("GOOGLE_API_KEY")
PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT")
LOCATION = "asia-northeast1"

CONTENT_DIR = Path("content")
TARGET_DIR = CONTENT_DIR / "shizuoka"
IMAGE_FILENAME = "cover.jpg"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

TEST_TARGET_DIR = "kaijo-tsuribori-maruya"

print(f"Initializing Client (Project: {PROJECT_ID})...")
try:
    if PROJECT_ID:
        client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
    else:
        print("No Project ID, using AI Studio fallback...")
        client = genai.Client(api_key=API_KEY, http_options={'api_version': 'v1beta'})
except Exception as e:
    print(f"Failed to init client: {e}")
    sys.exit(1)

def load_prompt_template():
    if not PROMPT_FILE.exists():
        return "Thumbnail for fishing article: '{title}'."
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        return data.get('thumbnail_prompt', "")

def resize_and_save_image(image_bytes, output_path):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        if img.width > MAX_WIDTH:
            ratio = MAX_WIDTH / float(img.width)
            new_height = int(float(img.height) * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
        target_ratio = 16 / 9
        current_ratio = img.width / img.height
        
        if abs(current_ratio - target_ratio) > 0.1:
            print(f"  > Cropping to 16:9 (Current: {current_ratio:.2f})")
            target_height = int(img.width / target_ratio)
            if target_height > img.height:
                target_width = int(img.height * target_ratio)
                left = (img.width - target_width) / 2
                top = 0
                right = (img.width + target_width) / 2
                bottom = img.height
            else:
                left = 0
                top = (img.height - target_height) / 2
                right = img.width
                bottom = (img.height + target_height) / 2
            img = img.crop((left, top, right, bottom))

        img.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"  > Saved: {output_path} ({img.size})")
        return True
    except Exception as e:
        print(f"Error saving: {e}")
        return False

MODELS_TO_TRY = ["imagen-3.0-generate-001", "imagegeneration@006", "gemini-2.0-flash-exp"]

def generate_thumbnail(title, output_path):
    prompt_template = load_prompt_template()
    prompt = prompt_template.format(title=title) + " Aspect Ratio 16:9. Wide cinematic shot."
    
    for model_name in MODELS_TO_TRY:
        print(f"  > Trying model: {model_name}...")
        try:
            if "imagen" in model_name:
                config = types.GenerateContentConfig(
                    image_config=types.ImageConfig(aspect_ratio="16:9")
                )
            else:
                config = types.GenerateContentConfig(
                    response_modalities=["IMAGE"],
                    image_config=types.ImageConfig(aspect_ratio="16:9"),
                    safety_settings=[types.SafetySetting(category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF")] # Simplified safety
                )

            contents = [types.Content(role="user", parts=[types.Part.from_text(text=prompt)])]
            
            response = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=config,
            )

            if response.parts and response.parts[0].inline_data:
                return resize_and_save_image(response.parts[0].inline_data.data, output_path)
            else:
                print(f"    [Warn] No image in response from {model_name}.")

        except Exception as e:
            print(f"    [Error] {model_name} failed: {e}")
            if "403" in str(e) or "404" in str(e):
                continue 
            
    return False

def process_articles():
    files = list(TARGET_DIR.rglob("index.md"))
    files = [f for f in files if f.parent.name == TEST_TARGET_DIR]
    
    if not files:
        print(f"Target '{TEST_TARGET_DIR}' not found.")
        return

    print(f"Found {len(files)} target articles.")

    for file_path in files:
        print(f"Checking: {file_path.parent.name}")
        post = frontmatter.load(file_path)
        title = post.get('title', file_path.parent.name)
        image_path = file_path.parent / IMAGE_FILENAME
        
        if image_path.exists():
            print("  > Overwriting existing file.")

        if generate_thumbnail(title, image_path):
            if post.get('featureimage') != IMAGE_FILENAME:
                post['featureimage'] = IMAGE_FILENAME
                with open(file_path, 'wb') as f:
                    frontmatter.dump(post, f)
                print("  > Updated frontmatter.")
            print("  > Success.")
        else:
            print("  > Failed to generate.")

if __name__ == "__main__":
    process_articles()
