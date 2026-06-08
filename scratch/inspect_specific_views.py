import urllib.request
import urllib.parse
import json
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

models_views = {
    "revuelto": {
        "hero": "Lamborghini Revuelto front",
        "side": "Lamborghini Revuelto side",
        "rear": "Lamborghini Revuelto rear",
        "interior": "Lamborghini Revuelto interior"
    },
    "huracan-tecnica": {
        "hero": "Lamborghini Huracan Tecnica front",
        "side": "Lamborghini Huracan Tecnica side",
        "rear": "Lamborghini Huracan Tecnica rear",
        "interior": "Lamborghini Huracan Tecnica interior"
    },
    "huracan-sto": {
        "hero": "Lamborghini Huracan STO front",
        "side": "Lamborghini Huracan STO side",
        "rear": "Lamborghini Huracan STO rear",
        "interior": "Lamborghini Huracan STO interior"
    },
    "urus": {
        "hero": "Lamborghini Urus S front",
        "side": "Lamborghini Urus S side",
        "rear": "Lamborghini Urus S rear",
        "interior": "Lamborghini Urus S interior"
    },
    "countach": {
        "hero": "Countach LPI 800-4 front",
        "side": "Countach LPI 800-4 side",
        "rear": "Countach LPI 800-4 rear",
        "interior": "Countach LPI 800-4 interior"
    }
}

def search_wikimedia(query):
    try:
        url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&gsrlimit=5"
        req = urllib.request.Request(url, headers={'User-Agent': 'LamborghiniLineupApp/1.0 (apata@lambo.in)'})
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
        
        img_urls = []
        if 'query' in data and 'pages' in data['query']:
            for page_id, page_data in data['query']['pages'].items():
                if 'imageinfo' in page_data and len(page_data['imageinfo']) > 0:
                    img_urls.append(page_data['imageinfo'][0]['url'])
        return img_urls
    except Exception:
        return []

for model_slug, views in models_views.items():
    print(f"\n===== Model: {model_slug} =====")
    for view_name, query in views.items():
        urls = search_wikimedia(query)
        print(f"  {view_name} ({query}):")
        for u in urls[:3]:
            print("    -", u)
