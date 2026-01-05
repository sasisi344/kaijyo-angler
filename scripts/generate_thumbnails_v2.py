
from google import genai
from google.genai import types
import os
from PIL import Image
import io
import frontmatter
from pathlib import Path
from dotenv import load_dotenv
import time
import yaml

# Load environment variables
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")

if not API_KEY:
    print("Error: GOOGLE_API_KEY not found.")
    exit(1)

# Initialize Client
client = genai.Client(api_key=API_KEY)

# Using the user-provided model name
MODEL_NAME = "gemini-2.5-flash-image"
CONTENT_DIR = Path("content")
IMAGE_FILENAME = "cover.jpg"
PROMPT_FILE = Path("scripts/thumbnail_prompt.yaml")
MAX_WIDTH = 1199

# Retry configuration
MAX_RETRIES = 3
RETRY_DELAY = 15  # Seconds

def load_prompt_template():
    if not PROMPT_FILE.exists():
        return "High quality fishing blog thumbnail for: {title}"
    with open(PROMPT_FILE, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
        return data.get('thumbnail_prompt', "")

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
        return True
    except Exception as e:
        print(f"  [Error] Save failed: {e}")
        return False

def generate_thumbnail(title, output_path):
    try:
        prompt_template = load_prompt_template()
        prompt = prompt_template.format(title=title)
        
        # Call Generate Image API
        # Adapting to Gemini 2.5 which might be Text-to-Image enabled via generate_images or generate_content
        # If 'native' implies unified endpoint, we try generate_images first.
        
        try:
             # Logic provided by user: use generate_content for image generation model
             response = client.models.generate_content(
                model=MODEL_NAME,
                contents=[prompt],
            )
        except Exception as api_err:
             raise api_err
        
        if response.parts:
            for part in response.parts:
                if part.inline_data is not None:
                    # Assuming part.as_image() returns a PIL Image as per snippet
                    # modifying to ensure we get bytes or handled effectively
                    # The snippet says: image = part.as_image(); image.save(...)
                    # We want to use resize_and_save_image, so let's convert to bytes
                    try:
                        img = part.as_image()
                        buf = io.BytesIO()
                        img.save(buf, format='PNG')
                        image_bytes = buf.getvalue()
                        return resize_and_save_image(image_bytes, output_path)
                    except AttributeError:
                        # Fallback if as_image() is not available but inline_data is populated
                        # inline_data.data usually contains bytes
                        image_bytes = part.inline_data.data
                        return resize_and_save_image(image_bytes, output_path)

            print(f"  [Warning] Response parts received but no inline_data (image) found.")
            return False
        else:
             print(f"  [Warning] No response parts returned for '{title}'")
             return False

    except Exception as e:
        print(f"  [Error] GenAI API Error: {e}")
        return False

def process_shizuoka():
    # Target only shizuoka for testing
    search_path = CONTENT_DIR / "shizuoka"
    files = list(search_path.rglob("index.md"))
    
    print(f"Found {len(files)} articles in shizuoka.")
    
    for i, file_path in enumerate(files):
        try:
            post = frontmatter.load(file_path)
            title = post.get('title')
            
            if not title: continue
            
            print(f"[{i+1}/{len(files)}] Processing: {title}")
            
            image_path = file_path.parent / IMAGE_FILENAME
            
            # Force regeneration logic for testing
            # If cover.jpg exists, we skip unless we want to force
            # User wants to retry because previous attempts failed
            
            if not image_path.exists():
                print(f"  > Generating with {MODEL_NAME}...")
                
                success = False
                attempts = 0
                
                while not success and attempts < MAX_RETRIES:
                    attempts += 1
                    try:
                        success = generate_thumbnail(title, image_path)
                        if success:
                            break
                        else:
                            # If failed but not excepted (e.g. strict 404), maybe break or retry?
                            # For safety, let's treat strict failure as non-retryable unless rate limit
                            # But here we catch exceptions inside generate_thumbnail.
                            # We need the Function to return status codes to be smarter.
                            # For now, simple retry implies we hope it works next time.
                            time.sleep(2)
                    except Exception as e:
                        print(f"    Warning: Suggesting retry due to error")
                    
                    if not success and attempts < MAX_RETRIES:
                        print(f"    Retry {attempts}/{MAX_RETRIES} in {RETRY_DELAY}s...")
                        time.sleep(RETRY_DELAY)

                if success:
                    print("  > Success!")
                    if post.get('featureimage') != IMAGE_FILENAME:
                        post['featureimage'] = IMAGE_FILENAME
                        with open(file_path, 'wb') as f:
                            frontmatter.dump(post, f)
                else:
                    print("  > Failed after retries.")
            else:
                print("  > Skipped (Image exists)")
                
        except Exception as e:
            print(f"  [Error] Loop error: {e}")

if __name__ == "__main__":
    print(f"Starting Thumbnail Generator (New SDK: {MODEL_NAME})...")
    process_shizuoka()
