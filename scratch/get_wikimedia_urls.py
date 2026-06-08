import urllib.request
import re
import urllib.parse

def get_wikimedia_images(category_name):
    # urlencode the category name properly
    encoded_category = urllib.parse.quote(category_name)
    url = f"https://commons.wikimedia.org/wiki/Category:{encoded_category}"
    headers = {
        'User-Agent': 'LamborghiniLineupMediaDownloader/1.0 (apata@lambo.in)'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        
        # Look for upload.wikimedia.org URLs in href or src
        # We want the actual high resolution file links, e.g.
        # https://upload.wikimedia.org/wikipedia/commons/a/ab/File_name.jpg
        # Typically Wikimedia thumbs are under /commons/thumb/, and high-res are under /commons/a/ab/File_name.jpg
        
        # Let's extract any URLs containing upload.wikimedia.org/wikipedia/commons
        matches = re.findall(r'https://upload\.wikimedia\.org/wikipedia/commons/[a-zA-Z0-9/\-_\.%]+', html)
        
        # Clean and get unique URLs
        unique_matches = []
        for m in set(matches):
            # Exclude thumbnail formats or small sizes if possible, but keep original
            if "/thumb/" in m:
                # Convert thumbnail URL to original URL
                # A thumb URL looks like: .../commons/thumb/a/ab/File.jpg/120px-File.jpg
                # We can reconstruct original by removing /thumb/ and the last part after the last slash
                parts = m.split('/')
                if len(parts) > 7:
                    original = "/".join(parts[:-1]).replace("/thumb/", "/")
                    unique_matches.append(original)
            else:
                unique_matches.append(m)
        
        unique_matches = list(set(unique_matches))
        
        # Filter for image extensions
        image_urls = [u for u in unique_matches if u.lower().endswith(('.jpg', '.jpeg', '.png'))]
        
        print(f"\n--- {category_name} ({len(image_urls)} images found) ---")
        for u in image_urls[:15]:
            print(u)
            
    except Exception as e:
        print(f"Error fetching category {category_name}: {e}")

get_wikimedia_images("Lamborghini_Temerario")
get_wikimedia_images("Lamborghini_Sián")
get_wikimedia_images("Lamborghini_Aventador_SVJ")
