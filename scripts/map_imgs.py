import urllib.request
import re

url = 'https://coffee-gr8r.framer.website/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp:
    html = resp.read().decode('utf-8', errors='ignore')

# Match each image URL with nearby text or alt
for m in re.finditer(r'https://framerusercontent\.com/images/([a-zA-Z0-9_-]+\.[a-z]{3,4})', html):
    img_name = m.group(1)
    start = max(0, m.start() - 150)
    end = min(len(html), m.end() + 150)
    context = html[start:end]
    # Extract alt or nearby text
    alt = re.findall(r'alt=[\"\']([^\"\']*)[\"\']', context)
    print(f"IMG: {img_name} -> alt: {alt}")

