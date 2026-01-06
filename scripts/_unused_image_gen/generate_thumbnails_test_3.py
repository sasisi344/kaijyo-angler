
import os
import sys
from pathlib import Path
import frontmatter
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
MODEL_NAME = "imagen-4.0-fast-generate-001" # Verified model
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
    print(f"  > Generating with {MODEL_NAME} for '{title}'...")
    prompt = f"High quality fishing blog thumbnail for: {title}. Photorealistic, vibrant, sunny ocean view."
    
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
            print(f"  Debug: Type of gen_img: {type(gen_img)}")
            print(f"  Debug: Dir of gen_img: {dir(gen_img)}")
            
            if hasattr(gen_img, 'image'):
                img_obj = gen_img.image
                print(f"  Debug: Type of img_obj: {type(img_obj)}")
                print(f"  Debug: Dir of img_obj: {dir(img_obj)}")
                
                # Try accessing different potential byte attributes
                if hasattr(img_obj, 'data'):
                    return resize_and_save_image(img_obj.data, output_path)
                elif hasattr(img_obj, 'image_bytes'):
                    return resize_and_save_image(img_obj.image_bytes, output_path)
                elif hasattr(img_obj, 'bytes'):
                    return resize_and_save_image(img_obj.bytes, output_path)
                else:
                    print("  [Error] Could not find image data in image object")
                    return False
            else:
                 print("  [Error] gen_img has no 'image' attribute")
                 return False
        else:
            print("  [Warn] No image generated")
            return False

            
    except Exception as e:
        print(f"  [Error] API call failed: {e}")
        return False

def main():
    print("=== Thumbnail Generation Test (3 articles) ===")
    
    for dir_path in TARGET_DIRS:
        if not dir_path.exists():
            print(f"Directory not found: {dir_path}")
            continue
            
        index_path = dir_path / "index.md"
        if not index_path.exists():
            print(f"index.md not found in {dir_path}")
            continue
            
        try:
            post = frontmatter.load(index_path)
            title = post.get('title')
            
            print(f"\nProcessing: {title} ({dir_path.name})")
            
            image_path = dir_path / IMAGE_FILENAME
            if image_path.exists():
                print("  > Skipped (Image exists)")
                continue
                
            if generate_thumbnail(title, image_path):
                if post.get('featureimage') != IMAGE_FILENAME:
                    post['featureimage'] = IMAGE_FILENAME
                    with open(index_path, 'wb') as f:
                        frontmatter.dump(post, f)
                    print("  ✓ Frontmatter updated")
            
            # Rate limit mitigation
            time.sleep(2)
            
        except Exception as e:
            print(f"  [Error] Processing failed: {e}")

    print("\n=== Test Complete ===")

if __name__ == "__main__":
    main()
