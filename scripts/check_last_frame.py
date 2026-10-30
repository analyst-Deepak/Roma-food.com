import subprocess
from PIL import Image
import numpy as np

# Extract frame at 9.5s
subprocess.run([
    "ffmpeg", "-ss", "00:00:09.5", "-i", "public/assets/video/cast_and_render.mp4",
    "-vframes", "1", "-q:v", "2", "scripts/v_last_frame.jpg", "-y"
], check=True)

im = Image.open("scripts/v_last_frame.jpg")
arr = np.array(im)
print("Last frame size:", im.size)
print("Last frame bottom 100 rows mean:", arr[-100:, :, :3].mean(axis=(0,1)))
print("Last frame bottom 20 rows mean:", arr[-20:, :, :3].mean(axis=(0,1)))
print("Last frame bottom corners:", arr[-10, 10, :3], arr[-10, -10, :3])
print("Last frame bottom center (50x20):", arr[-20:, 960-25:960+25, :3].mean(axis=(0,1)))

