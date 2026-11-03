import os
from PIL import Image

def describe_fg(f, name):
    im = Image.open(f).convert('RGB')
    w, h = im.size
    # Check what colors exist in the non-background area
    print(f"=== {name} ===")
    # sample grid of 5x5
    for row in range(5):
        y = int(h * (row + 0.5) / 5)
        row_colors = [im.getpixel((int(w * (col + 0.5) / 5), y)) for col in range(5)]
        print(f"  row {row}:", row_colors)

files = sorted(os.listdir('Product'))
names = ['845b4ed... (File 1)', 'Cocoa.jpeg (File 2)', 'Compunds.jpeg (File 3)', 'download.jpeg (File 4)', 'Russian_AI (File 5)']
for f, name in zip(files, names):
    describe_fg(os.path.join('Product', f), name)
