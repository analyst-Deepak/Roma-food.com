import os
from PIL import Image, ImageFilter
import numpy as np

os.makedirs('public/assets/products_3d_png', exist_ok=True)

# 1. Process File 5 (Russian AI - pure white background)
def process_file_5():
    p = [os.path.join('Product', f) for f in os.listdir('Product') if '\u0418' in f][0]
    im = Image.open(p).convert('RGBA')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # White background threshold
    is_bg = (r > 248) & (g > 248) & (b > 248)
    # Create smooth alpha
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    # Anti-alias mask
    mask = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1))
    im.putalpha(mask)
    # Crop to bounding box
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save('public/assets/products_3d_png/product_5_cutout.png')
    print('Saved product_5_cutout.png:', im.size)

# 2. Process File 2 (Cocoa.jpeg - light grey/white background)
def process_file_2():
    p = os.path.join('Product', 'Cocoa.jpeg')
    im = Image.open(p).convert('RGBA')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Light background: near grey/white
    is_bg = (r > 225) & (g > 225) & (b > 225) & (np.abs(r.astype(int) - g.astype(int)) < 15) & (np.abs(g.astype(int) - b.astype(int)) < 15)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    mask = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1))
    im.putalpha(mask)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save('public/assets/products_3d_png/cocoa_cutout.png')
    print('Saved cocoa_cutout.png:', im.size)

# 3. Process File 4 (download.jpeg - purple background)
def process_file_4():
    p = os.path.join('Product', 'download.jpeg')
    im = Image.open(p).convert('RGBA')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Purple background: r~110-150, g~50-90, b~135-175, with b > r and b > g
    is_bg = (b > g + 40) & (b > 110) & (g < 110)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    mask = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.5))
    im.putalpha(mask)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save('public/assets/products_3d_png/download_cutout.png')
    print('Saved download_cutout.png:', im.size)

# 4. Process File 1 (845b4ed... - beige background)
def process_file_1():
    p = os.path.join('Product', '845b4ed5dc6eb031fe83709987bc0ef1.jpg')
    im = Image.open(p).convert('RGBA')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Beige background: r~220-245, g~205-230, b~180-210
    is_bg = (r > 215) & (g > 195) & (b > 170) & (r > b + 25)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    mask = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.5))
    im.putalpha(mask)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save('public/assets/products_3d_png/product_1_cutout.png')
    print('Saved product_1_cutout.png:', im.size)

# 5. Process File 3 (Compunds.jpeg - dark background)
def process_file_3():
    p = os.path.join('Product', 'Compunds.jpeg')
    im = Image.open(p).convert('RGBA')
    arr = np.array(im)
    r, g, b, a = arr[:,:,0], arr[:,:,1], arr[:,:,2], arr[:,:,3]
    # Dark background: r < 40, g < 20, b < 10
    is_bg = (r < 45) & (g < 25) & (b < 15)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    mask = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(1.5))
    im.putalpha(mask)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.save('public/assets/products_3d_png/compounds_cutout.png')
    print('Saved compounds_cutout.png:', im.size)

process_file_5()
process_file_2()
process_file_4()
process_file_1()
process_file_3()

