from PIL import Image

for name in ["Compounds.jpg", "Chocolate.jpg", "Cocoa_powder.jpg", "Coated.jpg", "Decorations_Inclusions.jpg", "Fillings.jpeg"]:
    p = f"public/assets/categories/{name}"
    im = Image.open(p)
    print(name, im.size)

