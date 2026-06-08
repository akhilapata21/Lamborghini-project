import urllib.request
import re

try:
    req = urllib.request.Request('https://www.youtube.com/results?search_query=lamborghini+drifting', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    ids = list(set(re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)))
    print(ids[:5])
except Exception as e:
    print(e)
