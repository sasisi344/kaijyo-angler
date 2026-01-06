
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

def fix_file_content(path):
    """
    fixes double frontmatter and BOM issues
    Returns parsed post object or None if failed
    """
    try:
        text = path.read_text(encoding='utf-8')
        
        # Check for double frontmatter
        # Pattern: Starts with ---, contains another ---, and then another --- or BOM+---
        # The corruption looks like:
        # ---
        # featureimage: cover.jpg
        # ---
        # <empty lines>
        # <BOM>---
        # title: ...
        
        # If we see double frontmatter markers at start
        if text.startswith('---\nfeatureimage: cover.jpg\n---'):
            print("  ! Detected double frontmatter corruption")
            
            # Split by ---
            parts = text.split('---')
            # parts[0] is empty (before first ---)
            # parts[1] is "featureimage: cover.jpg\n"
            # parts[2] contains CRLF/LF and then BOM?
            
            # Find the index of the second real frontmatter start
            # It likely starts after the first --- block
            
            # Search for the next ---
            # using regex is safer to find the next start of frontmatter
            # expecting \n\ufeff--- or \n---
            
            match = re.search(r'\n\ufeff?---\n', text[30:]) # skip first block
            if match:
                start_index = match.start() + 30 + 1 # +1 for \n
                if text[match.start()+30] == '\n':
                     # The match found \n---
                     # match.start() is index of \n relative to slice
                     pass
                
                real_content = text[match.start() + 30:].lstrip()
                # Remove BOM if present at start of real_content (though lstrip might handle whitespace, BOM is whitespace-ish?)
                # \ufeff is not always stripped by lstrip
                real_content = real_content.replace('\ufeff', '')
                if real_content.startswith('---'):
                    pass
                else:
                    # If lstrip removed ---? No, --- is not whitespace
                    pass
                
                # Let's try to just find the LAST instance of frontmatter pair? 
                # No, that's risky if content has ---
                
                # Better approach: Look for "title:"
                title_match = re.search(r'title: ["\'].+["\']', text)
                if title_match:
                     # Find the --- before this title
                     last_dash = text.rfind('---', 0, title_match.start())
                     if last_dash != -1:
                        # verifying this is the start of frontmatter
                        real_content = text[last_dash:]
                        # Remove BOM if it precedes
                        if last_dash > 0 and text[last_dash-1] == '\ufeff':
                            # This shouldn't happen if we slice from last_dash
                            pass
                        
                        # Parse this cleaned content
                        post = frontmatter.loads(real_content)
                        return post
        
        # If strictly no corruption detected, try standard load but careful of BOM
        if '\ufeff' in text:
            print("  ! Detected BOM in text")
            text = text.replace('\ufeff', '')
            post = frontmatter.loads(text)
            return post
            
        return frontmatter.load(path)
        
    except Exception as e:
        print(f"  [Error] parsing error: {e}")
        return None

def main():
    print("=== Fix and Regenerate Thumbnails (3 articles) ===")
    
    for dir_path in TARGET_DIRS:
        if not dir_path.exists():
            print(f"Directory not found: {dir_path}")
            continue
            
        index_path = dir_path / "index.md"
        if not index_path.exists():
            print(f"index.md not found in {dir_path}")
            continue
            
        print(f"\nProcessing: {dir_path.name}")
        
        # 1. Fix content
        post = fix_file_content(index_path)
        if not post:
            print("  [Error] Could not parse file")
            continue
            
        title = post.get('title')
        if not title:
            print("  [Error] Title not found in parsed content")
            continue
            
        print(f"  Title: {title}")
        
        # 2. Regenerate Image
        image_path = dir_path / IMAGE_FILENAME
        # Force generation because previous one was "None"
        if generate_thumbnail(title, image_path):
             post['featureimage'] = IMAGE_FILENAME
             
             # 3. Save fixed file
             # Ensure no BOM in content
             if post.content.startswith('\ufeff'):
                 post.content = post.content.replace('\ufeff', '')
                 
             with open(index_path, 'wb') as f:
                 frontmatter.dump(post, f)
             print("  ✓ File fixed and saved")
             
        # Rate limit mitigation
        time.sleep(2)

    print("\n=== Fix and Test Complete ===")

if __name__ == "__main__":
    main()
