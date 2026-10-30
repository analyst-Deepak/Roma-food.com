from PIL import Image, ImageDraw
import numpy as np

# Create a crisp 3D chocolate piece for the pill capsule
w, h = 240, 160
img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Draw rich chocolate bonbon / bar segment
# Outer chocolate block
chocolate_dark = (56, 26, 14, 255)
chocolate_mid = (85, 38, 18, 255)
chocolate_highlight = (130, 65, 30, 255)
gold = (249, 189, 3, 255)

# Rounded chocolate tablet
draw.rounded_rectangle([20, 20, 220, 140], radius=28, fill=chocolate_mid)
draw.rounded_rectangle([28, 28, 212, 132], radius=24, fill=chocolate_dark)

# Inner bevel relief
draw.rounded_rectangle([44, 40, 196, 120], radius=16, fill=chocolate_highlight)
draw.rounded_rectangle([48, 44, 192, 116], radius=14, fill=chocolate_dark)

# ROMAS 'R' embossed in gold
draw.ellipse([100, 60, 140, 100], fill=None, outline=gold, width=4)

img.save('public/assets/chocolate/chocolate_pill.png', 'PNG')
print('Created chocolate_pill.png')

