import os
from PIL import Image
import numpy as np

src_path = r"public/assets/romas-logo.jpg"
out_dir = r"public/assets"

img = Image.open(src_path).convert("RGBA")
width, height = img.size

arr = np.array(img)
r, g, b, a = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2], arr[:, :, 3]

# Yellow background is roughly (245-255, 215-235, 115-145)
# Dark brown text is roughly (50-70, 15-25, 0-10)
luminance = 0.299 * r + 0.587 * g + 0.114 * b
text_mask = luminance < 140

y_indices, x_indices = np.where(text_mask)
if len(y_indices) > 0:
    min_x = max(0, int(np.min(x_indices)) - 28)
    max_x = min(width, int(np.max(x_indices)) + 28)
    min_y = max(0, int(np.min(y_indices)) - 24)
    max_y = min(height, int(np.max(y_indices)) + 24)
else:
    min_x, min_y, max_x, max_y = 0, 0, width, height

cropped_orig = img.crop((min_x, min_y, max_x, max_y))
cropped_orig.convert("RGB").save(os.path.join(out_dir, "romas-logo-badge.jpg"), quality=95)
print(f"Saved romas-logo-badge.jpg: {cropped_orig.size}")

# Transparent cut-out calculation
c_arr = np.array(cropped_orig)
# Background color sampled from outer corner
bg_r = float(np.mean(c_arr[0:6, 0:6, 0]))
bg_g = float(np.mean(c_arr[0:6, 0:6, 1]))
bg_b = float(np.mean(c_arr[0:6, 0:6, 2]))
print(f"Detected background color: RGB({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")

dr = c_arr[:, :, 0].astype(float) - bg_r
dg = c_arr[:, :, 1].astype(float) - bg_g
db = c_arr[:, :, 2].astype(float) - bg_b
dist = np.sqrt(dr*dr + dg*dg + db*db)

# Smooth alpha transition
# Dist < 25 => completely transparent (background)
# Dist > 85 => completely opaque (letters)
# In-between => smooth anti-aliased edge
alpha = np.clip((dist - 25.0) / 60.0 * 255.0, 0, 255).astype(np.uint8)

# 1. Transparent Dark Brown Logo
trans_brown = np.zeros_like(c_arr)
# Dark chocolate brown: #3A1405 -> (58, 20, 5)
# In anti-aliased edges, blend cleanly to prevent yellow fringe
edge_factor = alpha.astype(float) / 255.0
trans_brown[:, :, 0] = np.clip(c_arr[:, :, 0] * edge_factor + 50 * (1 - edge_factor), 0, 255).astype(np.uint8)
trans_brown[:, :, 1] = np.clip(c_arr[:, :, 1] * edge_factor + 16 * (1 - edge_factor), 0, 255).astype(np.uint8)
trans_brown[:, :, 2] = np.clip(c_arr[:, :, 2] * edge_factor + 4 * (1 - edge_factor), 0, 255).astype(np.uint8)
# Where text is solid, use deep rich cocoa brown
solid_mask = alpha > 220
trans_brown[solid_mask, 0] = 58
trans_brown[solid_mask, 1] = 20
trans_brown[solid_mask, 2] = 5
trans_brown[:, :, 3] = alpha

Image.fromarray(trans_brown, "RGBA").save(os.path.join(out_dir, "romas-logo-brown.png"), "PNG")
print("Saved romas-logo-brown.png")

# 2. Transparent White Logo (for dark chocolate background / footer)
trans_white = np.zeros_like(c_arr)
trans_white[:, :, 0] = 255
trans_white[:, :, 1] = 255
trans_white[:, :, 2] = 255
trans_white[:, :, 3] = alpha
Image.fromarray(trans_white, "RGBA").save(os.path.join(out_dir, "romas-logo-white.png"), "PNG")
print("Saved romas-logo-white.png")

# 3. Transparent Gold/Warm Yellow Logo (#FDD663)
trans_gold = np.zeros_like(c_arr)
trans_gold[:, :, 0] = 253
trans_gold[:, :, 1] = 214
trans_gold[:, :, 2] = 99
trans_gold[:, :, 3] = alpha
Image.fromarray(trans_gold, "RGBA").save(os.path.join(out_dir, "romas-logo-gold.png"), "PNG")
print("Saved romas-logo-gold.png")
