import urllib.request
import re

def scrape_unsplash(query):
    url = f"https://unsplash.com/s/photos/{query}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        # Find all Unsplash photo IDs. They usually look like: /photos/something-ID
        # Or image source URLs: https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format...
        photo_urls = re.findall(r'https://images\.unsplash\.com/(photo-[a-zA-Z0-9\-]+)', html)
        unique_urls = list(set(photo_urls))
        print(f"\n--- Results for {query} ({len(unique_urls)} found) ---")
        for p in unique_urls[:20]:
            print(f"https://images.unsplash.com/{p}?auto=format&fit=crop&w=1200&h=800&q=80")
    except Exception as e:
        print(f"Error scraping {query}: {e}")

scrape_unsplash("lamborghini")
scrape_unsplash("lamborghini-aventador")
scrape_unsplash("lamborghini-urus")
scrape_unsplash("lamborghini-huracan")
scrape_unsplash("lamborghini-sian")
