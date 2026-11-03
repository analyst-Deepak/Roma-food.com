import os
from PIL import Image

def analyze_image_content(path, label):
    im = Image.open(path)
    w, h = im.size
    print(f"*** {label} ({w}x{h}) ***")
    # Let's sample colors in a 3x3 grid inside the center
    for y_pct in [0.3, 0.5, 0.7]:
        row = []
        for x_pct in [0.3, 0.5, 0.7]:
            p = im.getpixel((int(w * x_pct), int(h * y_pct)))
            row.append(p[:3])
        print(f"  y={y_pct:.1f}:", row)

analyze_image_content('Product/Compunds.jpeg', 'Compunds.jpeg')
analyze_image_content('Product/Cocoa.jpeg', 'Cocoa.jpeg')
analyze_image_content('Product/download.jpeg', 'download.jpeg')
analyze_image_content('Product/845b4ed5dc6eb031fe83709987bc0ef1.jpg', '845b4ed...')
for f in os.listdir('Product'):
    if '\u0418' in f:
        analyze_image_content(os.path.join('Product', f), 'Russian AI')

