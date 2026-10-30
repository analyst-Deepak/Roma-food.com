import urllib.request
import re
import json

url = 'https://coffee-gr8r.framer.website/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

imgs = list(set(re.findall(r'https://framerusercontent\.com/images/[a-zA-Z0-9_-]+\.(?:png|jpg|jpeg|webp|svg)', html)))

print(f"Total: {len(imgs)}")
for i, u in enumerate(imgs):
    print(f"{i+1}: {u}")

