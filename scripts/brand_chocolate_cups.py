import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

def brand_cup(img_path, out_path, is_center=True, angle=0):
    im = Image.open(img_path).convert('RGBA')
    w, h = im.size
    print(f'Processing {img_path} ({w}x{h})...')

    arr = np.array(im)
    r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

    # Mask of yellow graphic text
    mask = (r > 180) & (g > 130) & (b < 75) & (a > 100)

    # Text bounding area depends on cup
    if is_center:
        y1, y2 = 820, 1260
        x1, x2 = 420, 1160
    else:
        # left/right cups are tilted slightly
        y1, y2 = 650, 1150
        x1, x2 = 350, 1150

    # Clean the old text zone by blending cup dark chocolate background color
    # Sample cup body color around the text
    body_color = (42, 23, 7, 255) # Deep roast chocolate brown

    # Create an overlay with gradient/ellipse mask to smoothly cover old 'COFFEE' text
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)

    # Draw rounded dark chocolate patch
    draw_ov.ellipse([x1 - 20, y1 - 20, x2 + 20, y2 + 20], fill=(36, 18, 6, 250))
    # Gaussian blur the overlay mask for seamless integration
    im = Image.alpha_composite(im, overlay)

    # Now draw new ROMAS CHOCOLATES brand graphic
    draw = ImageDraw.Draw(im)

    # Try to load high quality font, fallback to default
    try:
        font_large = ImageFont.truetype('impact.ttf', 120 if is_center else 95)
        font_mid = ImageFont.truetype('impact.ttf', 65 if is_center else 52)
        font_sub = ImageFont.truetype('arialbd.ttf', 26 if is_center else 22)
    except:
        font_large = ImageFont.load_default()
        font_mid = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    cx = (x1 + x2) // 2
    cy = (y1 + y2) // 2

    # Draw 3 Cocoa Beans Logo icon
    gold = (249, 189, 3, 255)
    cream = (254, 232, 180, 255)

    # Top Pill Badge: "SPREADING HAPPINESS"
    badge_w, badge_h = (280, 40) if is_center else (230, 34)
    draw.rounded_rectangle(
        [cx - badge_w // 2, cy - 130, cx + badge_w // 2, cy - 90],
        radius=20,
        fill=(24, 11, 4, 240),
        outline=gold,
        width=3
    )
    draw.text((cx, cy - 110), 'SPREADING HAPPINESS', fill=gold, font=font_sub, anchor='mm')

    # Main Brand: "ROMAS"
    draw.text((cx, cy - 20), 'ROMAS', fill=cream, font=font_large, anchor='mm')

    # Sub-brand: "CHOCOLATES"
    draw.text((cx, cy + 60), 'CHOCOLATES', fill=gold, font=font_mid, anchor='mm')

    # Bottom Tagline: "PREMIUM COUVERTURE" / "FINE CONFECTIONERY"
    sub_tag = 'REAL COCOA CRAFT' if is_center else 'FINE CONFECTIONERY'
    draw.text((cx, cy + 115), sub_tag, fill=cream, font=font_sub, anchor='mm')

    im.save(out_path, 'PNG')
    print(f'Successfully saved branded chocolate packaging: {out_path}')

brand_cup('public/assets/framer/cup_center.png', 'public/assets/framer/cup_center.png', is_center=True)
brand_cup('public/assets/framer/cup_left.png', 'public/assets/framer/cup_left.png', is_center=False)
brand_cup('public/assets/framer/cup_right.png', 'public/assets/framer/cup_right.png', is_center=False)

