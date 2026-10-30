import urllib.request
import os

os.makedirs('public/assets/framer', exist_ok=True)

img_map = {
    'cup_left.png': 'https://framerusercontent.com/images/IEnoyXEaQ6w7gZbjbMYLM1wT84.png',
    'cup_center.png': 'https://framerusercontent.com/images/uCqOWnGftI0FwRKKyylQYZ88IWE.png',
    'cup_right.png': 'https://framerusercontent.com/images/81GcZ31uL6YM93RWsYoH2q38QfA.png',
    'bean_pill.png': 'https://framerusercontent.com/images/FIy6DILE3hqXh7F3J78FDgsDM.png',
    'bean_single.png': 'https://framerusercontent.com/images/GnLKBoSTpwY8gRNBfh1A6Y5a9A.png',
    'about_img.png': 'https://framerusercontent.com/images/uForFNm9WLkMDZ4730kcQdmfU.png',
    'menu_1.png': 'https://framerusercontent.com/images/OO0uOB5ldSgcJoLVjfkMOMqLe4.png',
    'menu_2.png': 'https://framerusercontent.com/images/1mF8cHutN5A6iMQHTFRtwsari4.png',
    'menu_3.png': 'https://framerusercontent.com/images/Yi0XOIxWjal4wkdInaKHLwmJKw.png',
    'menu_4.png': 'https://framerusercontent.com/images/hOACWxwMdzK5KwIYcEITWuXdiQ.png',
    'menu_5.png': 'https://framerusercontent.com/images/Au6DX0mFS7DO2lF1yle8YEW73nA.png',
    'menu_6.png': 'https://framerusercontent.com/images/4nlf0WGUxxaIonf5ZNxHWGtJF8Q.png',
    'branch_1.png': 'https://framerusercontent.com/images/leXIxQtAsEMfAGEgtqV4Ah2gI.png',
    'branch_2.png': 'https://framerusercontent.com/images/r0aDJ74eIGALTKbNsubOYjXg.png',
    'blog_1.png': 'https://framerusercontent.com/images/w2e1PXndiDf3qcFLUr6BEk3ifQ.png',
    'blog_2.png': 'https://framerusercontent.com/images/ExUGIDrffSOp7PHNjreUPHCpkSk.png',
    'blog_3.png': 'https://framerusercontent.com/images/vqktpqhbUjjbT2p7J3NrXzVvX2Y.png',
}

for name, url in img_map.items():
    dest = os.path.join('public/assets/framer', name)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded: {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")

