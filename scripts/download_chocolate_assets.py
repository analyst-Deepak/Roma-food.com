import urllib.request
import os

os.makedirs('public/assets/chocolate', exist_ok=True)

chocolate_assets = {
    # 6 Menu Products (100% Chocolate)
    'menu_milk_compound.jpg': 'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=85',
    'menu_dark_couverture.jpg': 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=85',
    'menu_caramel_drops.jpg': 'https://images.unsplash.com/photo-1549007953-2f2dc0b24019?auto=format&fit=crop&w=800&q=85',
    'menu_noir_70.jpg': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85',
    'menu_white_chocolate.jpg': 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=800&q=85',
    'menu_hazelnut_praline.jpg': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=85',

    # 3 Blog Guides (Chocolate Tempering, Cocoa Beans, Pastry)
    'blog_tempering.jpg': 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=85',
    'blog_cocoa_beans.jpg': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=85',
    'blog_chef_dessert.jpg': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85',

    # 2 Branches (Chocolate Atelier & Confectionery Works)
    'branch_atelier.jpg': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=85',
    'branch_works.jpg': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=85',

    # Chocolate Pieces & Splash for Statement & Hero
    'chocolate_piece.jpg': 'https://images.unsplash.com/photo-1526081347589-7fa3cb41b4b2?auto=format&fit=crop&w=600&q=85',
    'chocolate_splash_hero.jpg': 'https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1200&q=85',
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for filename, url in chocolate_assets.items():
    dest = os.path.join('public/assets/chocolate', filename)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest, 'wb') as f:
                f.write(data)
            print(f'Downloaded {filename} ({len(data)} bytes)')
    except Exception as e:
        print(f'Failed {filename}: {e}')

print('All downloads complete!')

