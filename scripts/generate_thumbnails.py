import os
import glob
import time
import textwrap
from pathlib import Path
import frontmatter
import google.generativeai as genai
import yaml
from PIL import Image
import io
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

# Configuration
API_KEY = os.getenv("GOOGLE_API_KEY")
# Nano Banana (Gemini 2.5 Flash Image) model name
# Note: Update this to the exact model name when available in your region/account
MODEL_NAME = "gemini-2.0-flash-exp" 
CONTENT_DIR = Path("content")
IMAGE_FILENAME = "cover.jpg"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

if not API_KEY:
    print("Error: GOOGLE_API_KEY not found in environment variables.")
    print("Please create a .env file or set the environment variable.")
    exit(1)

genai.configure(api_key=API_KEY)


def load_prompt_template():
    """Loads the prompt template from the YAML file."""
    if not PROMPT_FILE.exists():
        # Fallback prompt if file doesn't exist
        return "Create a high-quality, eye-catching thumbnail for a fishing article entitled: '{title}'. Vibrant, high contrast, exciting."
    
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        return data.get('thumbnail_prompt', "")

def resize_and_save_image(image_data, output_path):
    """
    Resizes image to be under MAX_WIDTH and saves as JPEG.
    """
    try:
        img = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if necessary (e.g. from RGBA) for JPEG
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # Resize if width is too large
        if img.width >= 1200:
            # Calculate new height to maintain aspect ratio
            ratio = MAX_WIDTH / float(img.width)
            new_height = int(float(img.height) * ratio)
            img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)
            
        img.save(output_path, "JPEG", quality=85, optimize=True)
        print(f"Saved: {output_path} (Size: {img.size})")
        return True
    except Exception as e:
        print(f"Error processing/saving image: {e}")
        return False


def generate_thumbnail(title, output_path):
    """
    Generates a thumbnail image using Nano Banana (Gemini) model based on the title.
    """
    try:
        model = genai.GenerativeModel(MODEL_NAME)
        
        prompt_template = load_prompt_template()
        prompt = prompt_template.format(title=title)
        
        # print((f"Generating image for: {title}...")) # Request log moves to caller
        
        response = model.generate_content(prompt)
        
        if response.parts and hasattr(response.parts[0], 'image'):
             generated_image = response.parts[0].image
             buf = io.BytesIO()
             generated_image.save(buf, format='PNG')
             image_bytes = buf.getvalue()
             return resize_and_save_image(image_bytes, output_path)
        else:
            print(f"  [Warning] No image returned for '{title}'.")
            return False

    except Exception as e:
        print(f"  [Error] Generation failed for '{title}': {e}")
        return False

def process_articles():
    """
    Iterates through content directories, finds index.md, checks for featureimage, and generates if missing.
    """
    # Find index.md files ONLY in shizuoka directory
    search_path = CONTENT_DIR / "shizuoka"
    files = list(search_path.rglob("index.md"))
    
    print(f"Found {len(files)} articles.")
    


    count_files = len(files)
    count_generated = 0
    count_skipped_exists = 0
    count_error = 0

    print(f"Found {count_files} articles. Checking for missing thumbnails...")

    for i, file_path in enumerate(files):
        try:
            # Simple progress indicator
            print(f"[{i+1}/{count_files}] Checking: {file_path.parent.name}", end="\r")
            
            post = frontmatter.load(file_path)
            
            if not post.get('title'):
                continue
                
            title = post['title']
            
            # Target image path is always 'cover.jpg' in the same folder
            image_path = file_path.parent / IMAGE_FILENAME
            
            # Logic: Generate ONLY if cover.jpg does not exist
            if not image_path.exists():
                print(f"\n  > Missing thumbnail for: {title}")
                print(f"  > Generating with {MODEL_NAME}...")
                
                success = generate_thumbnail(title, image_path)
                
                if success:
                    count_generated += 1
                    # Update Frontmatter if it doesn't match
                    if post.get('featureimage') != IMAGE_FILENAME:
                        post['featureimage'] = IMAGE_FILENAME
                        with open(file_path, 'wb') as f:
                            frontmatter.dump(post, f)
                        print("  > Updated frontmatter.")
                    
                    # Sleep to avoid rate limits
                    time.sleep(3) 
                else:
                    count_error += 1
            else:
                # File exists, skip
                count_skipped_exists += 1
                # Optional: Ensure frontmatter is correct even if image exists
                if post.get('featureimage') != IMAGE_FILENAME:
                     post['featureimage'] = IMAGE_FILENAME
                     with open(file_path, 'wb') as f:
                        frontmatter.dump(post, f)
                     # print(f"  > Fixed frontmatter for existing image.")
        
        except Exception as e:
            print(f"\n  [Error] Processing {file_path}: {e}")
            count_error += 1

    print("\n\n" + "="*30)
    print("SUMMARY")
    print(f"Total Articles: {count_files}")
    print(f"Generated New:  {count_generated}")
    print(f"Skipped (Exist):{count_skipped_exists}")
    print(f"Errors:         {count_error}")
    print("="*30)

if __name__ == "__main__":
    print(f"Starting Nano Banana Thumbnail Generator...")
    print(f"Target Model: {MODEL_NAME}")
    process_articles()
