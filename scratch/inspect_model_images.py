import urllib.request
import urllib.parse
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

models = [
    "Lamborghini Revuelto",
    "Lamborghini Huracan Tecnica",
    "Lamborghini Huracan STO",
    "Lamborghini Urus S",
    "Lamborghini Countach LPI 800-4"
]

def search_wikimedia_images(query):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&gsrlimit=20"
        req = urllib.request.Request(url, headers={'User-Agent': 'LamborghiniLineupApp/1.0 (apata@lambo.in)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        img_urls = []
        if 'query' in data and 'pages' in data['query']:
            for page_id, page_data in data['query']['pages'].items():
                if 'imageinfo' in page_data and len(page_data['imageinfo']) > 0:
                    img_urls.append(page_data['imageinfo'][0]['url'])
        return img_urls
    except Exception as e:
        return [f"Error: {e}"]

for model in models:
    print(f"\n=== {model} ===")
    urls = search_wikimedia_images(model)
    for u in urls[:8]:
        print("-", u)
