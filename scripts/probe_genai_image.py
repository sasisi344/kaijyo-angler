from google import genai
from google.genai import types
import os
from dotenv import load_dotenv
import base64

load_dotenv()

def probe():
    client = genai.Client(
        api_key=os.environ.get("GOOGLE_CLOUD_API_KEY") or os.environ.get("GOOGLE_API_KEY"),

    )

    prompt = "A high quality thumbnail for a fishing blog article about Fishing in Shizuoka."
    
    model = "gemini-2.0-flash-exp"
    
    # Text-only input for image generation (standard for imagen/gemini image models)
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)]
        )
    ]

    config = types.GenerateContentConfig(
        response_modalities=["IMAGE"], # Force image only
        safety_settings=[types.SafetySetting(
            category="HARM_CATEGORY_HATE_SPEECH", threshold="OFF"
        )],
        image_config=types.ImageConfig(
            aspect_ratio="1:1",
            image_size="1K",

        ),
    )

    print("Sending request...")
    try:
        response = client.models.generate_content(
            model=model,
            contents=contents,
            config=config,
        )
        
        print(f"Response Type: {type(response)}")
        
        if response.parts:
            print(f"Number of parts: {len(response.parts)}")
            part = response.parts[0]
            # print(f"Part details: {part}")
            
            # Check for image data
            # In the new SDK, it might be inline_data or directly accessible
            # The structure often mimics the proto
            
            if hasattr(part, 'inline_data'):
                print("Found inline_data!")
                img_data = part.inline_data.data
                # inline_data.data is usually bytes or base64
                # If using google.genai, check if it decodes automatically
                print(f"Data type: {type(img_data)}")
                
                with open("probe_image.png", "wb") as f:
                    if isinstance(img_data, bytes):
                        f.write(img_data)
                    else:
                        f.write(base64.b64decode(img_data))
                print("Saved probe_image.png")
            else:
                print("No inline_data found in part.")
                print(dir(part))
        else:
            print("No parts in response.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    probe()
