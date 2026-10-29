"""Crops the dialog pictures of figures.json to the dialog box (the viewport was photographed, scale 1.5) and drops the crop key."""
import json
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
F = os.path.join(ROOT, "_figures")
m = json.load(open(os.path.join(F, "figures.json"), encoding="utf-8"))
n = 0
for d, items in m.items():
    for f in items:
        if f.get("crop"):
            x, y, w, h = [v * 1.5 for v in f.pop("crop")]
            im = Image.open(os.path.join(F, f["file"]))
            im.crop((int(x), int(y), int(min(x + w, im.width)), int(min(y + h, im.height)))).save(os.path.join(F, f["file"]))
            n += 1
json.dump(m, open(os.path.join(F, "figures.json"), "w", encoding="utf-8"), indent=1)
print("cropped", n)
