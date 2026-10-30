import urllib.request
import os

url = "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/45567745-d826-44a2-a5ce-7ef670944e60.mp4"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

with urllib.request.urlopen(req, timeout=15) as resp:
    data = resp.read()

with open('public/assets/video/cast_and_render.mp4', 'wb') as f:
    f.write(data)

print(f"Downloaded video: {len(data)} bytes")

