import urllib.request
import urllib.parse
import json
import sys

# Ensure sys.stdout can print UTF-8 on Windows terminal
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

def search_wikimedia_images(query):
    try:
        # Query Wikimedia Commons API for files matching the query
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
        print(f"Error querying Wikimedia: {e}")
        return []

if __name__ == '__main__':
    query = "Lamborghini Revuelto"
    urls = search_wikimedia_images(query)
    print(f"Found {len(urls)} images:")
    for u in urls[:10]:
        print("-", u)
