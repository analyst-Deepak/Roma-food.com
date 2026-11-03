import os
from PIL import Image

files = sorted(os.listdir('Product'))

for idx, f in enumerate(files):
    p = os.path.join('Product', f)
    im = Image.open(p)
    w, h = im.size
    print(f"=== File {idx+1}: {ascii(f)} ({w}x{h}) ===")
    # Find bounding box of object if background is relatively uniform
    # Check 4 corners
    corners = [im.getpixel((0,0)), im.getpixel((w-1,0)), im.getpixel((0,h-1)), im.getpixel((w-1,h-1))]
    print("  Corners:", corners)

