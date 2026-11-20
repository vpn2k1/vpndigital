#!/usr/bin/env python3
"""Recolor the four live editorial image families to VPN Digital blue/cyan.
Original images are archived under public/images/source/ before modification.
Run: python scripts/recolor_site_images.py  (Pillow required).
"""
from pathlib import Path
from PIL import Image, ImageEnhance
import colorsys
import shutil

ROOT=Path(__file__).resolve().parents[1]
IMAGES=ROOT/'public'/'images'
SOURCE=IMAGES/'source'
SOURCE.mkdir(exist_ok=True,parents=True)
NAMES=['hero','game','software','tools']
SUFFIXES=['.webp','-640.webp']

def recolor(source,dest):
    image=Image.open(source).convert('RGB')
    # Preserve geometry, texture, highlights and shadows of each original image.
    # Re-map warm red/gold/green hues to a coherent navy -> blue -> cyan spectrum.
    pixels=[]
    for r,g,b in image.getdata():
        h,s,v=colorsys.rgb_to_hsv(r/255,g/255,b/255)
        # Slightly lift neutral highlights but keep deep shadows deep navy.
        if s < .11:
            if v < .12:
                rr,gg,bb=(.035,.09,.17)
                rr,gg,bb=(rr*(.5+v*4),gg*(.5+v*4),bb*(.5+v*4))
            else:
                # neutral pixels stay neutral, subtly cool
                rr=min(1,v*.95);gg=min(1,v*.99);bb=min(1,v*1.04)
        else:
            # Dark blue, royal blue and cyan according to the original color variation.
            target_h=(.565 + .065*(.5+.5*__import__('math').sin(h*6.28318)))%1
            sat=max(.48,min(.92,s*.87+.18))
            val=max(.06,min(1,v*.96+.015))
            rr,gg,bb=colorsys.hsv_to_rgb(target_h,sat,val)
        pixels.append((int(max(0,min(255,rr*255))),int(max(0,min(255,gg*255))),int(max(0,min(255,bb*255)))))
    out=Image.new('RGB',image.size)
    out.putdata(pixels)
    out.save(dest,'WEBP',quality=88,method=6)

for name in NAMES:
    for suffix in SUFFIXES:
        path=IMAGES/(name+suffix)
        if not path.exists():
            raise SystemExit('Missing expected source image: '+str(path))
        original=SOURCE/path.name
        if not original.exists():
            shutil.copy2(path,original)
        recolor(original,path)
        print(f'{path.relative_to(ROOT)}: {Image.open(path).size}')
