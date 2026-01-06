
import os
import sys
from pathlib import Path
import frontmatter
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv
import time
from PIL import Image
import io

# Windows stdout encoding fix
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")
MODEL_NAME = "imagen-4.0-fast-generate-001"
IMAGE_FILENAME = "cover.jpg"
MAX_WIDTH = 1199

if not API_KEY:
    print("Error: GOOGLE_API_KEY not found")
    exit(1)

client = genai.Client(api_key=API_KEY)

TARGET_DIRS = [
    Path("content/shizuoka/araibenten-sea-fishing-park"),
    Path("content/shizuoka/atami-port-sea-fishing-facility"),
    Path("content/shizuoka/fishing-park-toi")
]

def resize_and_save_image(image_bytes, output_path):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        
        if img.width >= 1200:
            ratio = MAX_WIDTH / float(img.width)
            new_height = int(float(img.height) * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
        img.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"  ✓ Saved: {output_path} (Size: {img.size})")
        return True
    except Exception as e:
        print(f"  [Error] Save failed: {e}")
        return False

def generate_thumbnail(title, output_path):
    print(f"  > Generating with {MODEL_NAME} for '{title}' (NO TEXT RULE)...")
    
    # Updated Prompt Enforcing NO TEXT
    prompt = f"""
    You are an expert YouTube Thumbnail designer and SEO specialist for a fishing blog.
    Your goal is to generate a high-CTR (Click Through Rate) thumbnail image.
    
    Article Title: "{title}"
    
    Visual Design Rules:
    1. **Subject**: Visualize the core subject of the title (e.g., specific fish, fishing gear, scenery, or action). Make it look exciting and dynamic.
    2. **Style**: Photorealistic, vibrant colors, high contrast, suitable for a "Sea Fishing" (Kaijyo Fishing) theme.
    3. **Composition**: Rule of thirds, strong focal point.
    4. **Text Rule**: DO NOT include any text in the image. The image should be purely visual.
    5. **Vibe**: Professional yet accessible. Makes the user want to click immediately.
    
    Generate the image based on these rules.
    """
    
    try:
        response = client.models.generate_images(
            model=MODEL_NAME,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                safety_filter_level="block_low_and_above",
                person_generation="allow_adult"
            )
        )
        
        if response.generated_images:
            gen_img = response.generated_images[0]
            if hasattr(gen_img, 'image'):
                img_obj = gen_img.image
                if hasattr(img_obj, 'data'):
                     return resize_and_save_image(img_obj.data, output_path)
                elif hasattr(img_obj, 'image_bytes'):
                     return resize_and_save_image(img_obj.image_bytes, output_path)
                elif hasattr(img_obj, 'bytes'):
                     return resize_and_save_image(img_obj.bytes, output_path)
        
        return False
            
    except Exception as e:
        print(f"  [Error] API call failed: {e}")
        return False

def main():
    print("=== Regenerating Thumbnails (Targeted 3) ===")
    
    for dir_path in TARGET_DIRS:
        if not dir_path.exists():
            print(f"Directory not found: {dir_path}")
            continue
            
        index_path = dir_path / "index.md"
        if not index_path.exists():
            print(f"index.md not found in {dir_path}")
            continue
            
        print(f"\nProcessing: {dir_path.name}")
        
        # Read title
        try:
             post = frontmatter.loads(index_path.read_text(encoding='utf-8-sig'))
             title = post.get('title')
        except Exception as e:
             print(f"  [Error] Failed to read title: {e}")
             continue

        print(f"  Title: {title}")
        
        image_path = dir_path / IMAGE_FILENAME
        
        # Always regenerate
        generate_thumbnail(title, image_path)
             
        # Rate limit mitigation
        time.sleep(2)

    print("\n=== Regeneration Complete ===")

if __name__ == "__main__":
    main()
