#!/usr/bin/env python3
"""Create original, composition-matched blue/cyan illustrations for both site themes.
Four scenes: orbiting digital globe, game controller, software workstation, tools.
Outputs dark and light WebP at 1600x1067 and 640x427. No old artwork recoloring.
Requires: pillow, cairosvg
"""
from pathlib import Path
from io import BytesIO
import math
import cairosvg
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public'/'images'
OUT.mkdir(exist_ok=True,parents=True)

def ellipse(cx,cy,rx,ry,stroke,width=2,opacity=1,transform=''):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{stroke}" stroke-width="{width}" opacity="{opacity}" transform="{transform}"/>'
def circle(cx,cy,r,fill,opacity=1,stroke='none',sw=0):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" opacity="{opacity}" stroke="{stroke}" stroke-width="{sw}"/>'
def path(d,fill='none',stroke='none',sw=1,opacity=1):
    return f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}" stroke-linejoin="round" stroke-linecap="round"/>'
def rect(x,y,w,h,fill,rx=0,stroke='none',sw=0,opacity=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" opacity="{opacity}"/>'
def defs(light):
    navy='#E9F6FF' if light else '#061B38'
    deep='#FFFFFF' if light else '#09264C'
    panel='#E5F2FC' if light else '#103E76'
    line='#187AC3' if light else '#22D3F2'
    return f'''<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{navy}"/><stop offset=".58" stop-color="{deep}"/><stop offset="1" stop-color="{panel}"/></linearGradient>
      <linearGradient id="blue" x1="0" y1="0" x2=".95" y2="1"><stop stop-color="#43D9F4"/><stop offset=".32" stop-color="#168BD9"/><stop offset=".8" stop-color="#0954AA"/><stop offset="1" stop-color="#07356E"/></linearGradient>
      <linearGradient id="cyan" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#C2F9FF"/><stop offset=".4" stop-color="#37DFF2"/><stop offset="1" stop-color="#0B89CB"/></linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="{('#FFFFFF' if light else '#2AA7E8')}" stop-opacity=".9"/><stop offset="1" stop-color="{('#C6E9FF' if light else '#073266')}" stop-opacity=".7"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="#19C9F5" stop-opacity="{('.25' if light else '.48')}"/><stop offset="1" stop-color="#19C9F5" stop-opacity="0"/></radialGradient>
      <filter id="shadow"><feGaussianBlur stdDeviation="16"/></filter>
      <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
    </defs>'''
def scene_globe(light):
    cyan='#0876B6' if light else '#36E3FC'
    grid='#7ABEE4' if light else '#1C6A9F'
    s=rect(0,0,1200,800,'url(#bg)')
    s+=ellipse(605,730,650,230,'url(#glow)',70,.8)
    for k in range(15):
        x=600+(k-7)*125
        s+=path(f'M 600 515 L {x} 800',stroke=grid,sw=1,opacity=.22)
    for k in range(7):
        y=520+k*k*7
        s+=path(f'M 0 {y} H 1200',stroke=grid,sw=1,opacity=.20)
    s+=circle(602,355,252,'url(#glow)')
    s+=circle(602,355,215,'url(#blue)',.93,cyan,3)
    for lat in [-145,-100,-50,0,50,100,145]:
        width=math.sqrt(max(0,215*215-lat*lat))
        s+=ellipse(602,355+lat,width,28,cyan,1,.25)
    for k in range(1,10):
        x=602+(k-5)*42
        s+=ellipse(x,355,30,212,cyan,1,.18)
    for k in range(140):
        a=k*2.39996
        radius=math.sqrt(k/140)*196
        x=602+radius*math.cos(a)
        y=355+radius*math.sin(a)
        s+=circle(round(x,1),round(y,1),1.8+(k%5==0)*1.2,cyan,.65)
    s+=ellipse(603,383,365,96,cyan,9,.95,'rotate(-17 603 383)')
    s+=ellipse(603,383,367,98,'#FFFFFF',2,.55,'rotate(-17 603 383)')
    for x,y,r in [(880,120,7),(960,240,3),(260,210,4),(390,80,3),(780,650,4)]:
        s+=circle(x,y,r,cyan)
        s+=path(f'M{x-19} {y}H{x+19} M{x} {y-19}V{y+19}',stroke=cyan,sw=1,opacity=.65)
    for x,y,w,h in [(45,230,140,90),(1030,230,115,115),(975,515,170,110)]:
        s+=rect(x,y,w,h,'url(#glass)',18,cyan,2,.40)
    return s
def scene_game(light):
    cyan='#1179BC' if light else '#2DE1F7'
    s=rect(0,0,1200,800,'url(#bg)')
    s+=ellipse(600,655,470,125,'url(#glow)',65)
    s+=ellipse(600,665,380,70,cyan,5,.7)
    s+=rect(300,575,600,70,'url(#blue)',35,cyan,3)
    s+=ellipse(600,570,300,58,'url(#glass)',3,.5)
    # gamepad silhouette with smooth grip geometry
    d='M 340 270 C 350 215 405 190 460 205 L 535 224 Q 600 238 665 224 L 740 205 C 795 190 850 215 860 270 L 918 500 C 928 565 865 593 825 552 L 735 460 Q 600 495 465 460 L 375 552 C 335 593 272 565 282 500 Z'
    s+=path(d,'url(#blue)',cyan,5)
    s+=path('M 360 286 C 410 246 465 270 535 290 Q 600 305 665 290 C 735 270 790 246 840 286',stroke='#B4F6FF',sw=8,opacity=.65)
    for x,y in [(482,380),(715,386)]:
        s+=circle(x,y,56,'#052954' if not light else '#D5EAF9',1,cyan,5)
        s+=circle(x,y,30,'url(#glass)',1,'#074B8A',3)
    s+=rect(374,315,28,103,'#052D60',8,cyan,2)
    s+=rect(337,351,103,28,'#052D60',8,cyan,2)
    for x,y in [(760,310),(806,348),(714,348),(760,390)]:
        s+=circle(x,y,20,'url(#cyan)',1,'#0C6BA8',3)
    s+=rect(550,293,100,23,'#062B59',10,cyan,2)
    for x,y in [(180,180),(1010,160),(980,485),(225,480)]:
        s+=rect(x,y,64,64,'url(#glass)',12,cyan,2,.6)
    for x,y in [(155,550),(1020,265),(265,140)]:
        s+=circle(x,y,5,cyan)
    return s
def scene_software(light):
    cyan='#0D78B7' if light else '#37DDF4'
    text='#1E649B' if light else '#9BEFFF'
    s=rect(0,0,1200,800,'url(#bg)')
    s+=ellipse(580,705,550,125,'url(#glow)',65)
    s+=path('M 355 175 L 870 175 Q 910 175 910 220 L 910 560 Q 910 600 865 600 L 355 600 Q 310 600 310 560 L 310 220 Q 310 175 355 175 Z','url(#blue)',cyan,5)
    s+=rect(342,205,538,355,'#08274E' if not light else '#F4FBFF',18,cyan,2)
    s+=rect(342,205,538,48,'#12518C' if not light else '#CDEBFB',18)
    for x in (367,390,413):s+=circle(x,228,7,'url(#cyan)')
    for i in range(5):
        s+=rect(368,281+i*49,118,10,text,5,opacity=.3+.1*(i%3))
        s+=rect(368,299+i*49,70,6,cyan,3,opacity=.5)
    for i in range(7):
        s+=rect(523,286+i*34,225-(i%3)*35,7,cyan if i%3==0 else text,4,opacity=.7)
        s+=rect(535,301+i*34,130+(i%2)*35,5,text,3,opacity=.3)
    s+=rect(588,602,48,74,'url(#blue)',4)
    s+=rect(475,673,275,21,'url(#blue)',10)
    # floating cards, charts, interface windows
    for x,y,w,h in [(95,380,250,195),(830,340,280,210),(130,175,165,110)]:
        s+=rect(x,y,w,h,'url(#glass)',18,cyan,3,.9)
        s+=rect(x+19,y+23,w*.55,10,text,5,opacity=.55)
        s+=rect(x+19,y+48,w*.38,7,text,4,opacity=.3)
    for i,ht in enumerate([34,65,90,52,110]):
        s+=rect(875+i*38,505-ht,22,ht,cyan,4,opacity=.5+i*.09)
    for x,y in [(165,475),(200,440),(235,495),(270,420)]:
        s+=circle(x,y,9,cyan,.8)
    s+=ellipse(590,625,540,170,cyan,3,.65,'rotate(-9 590 625)')
    return s
def scene_tools(light):
    cyan='#0C78B8' if light else '#3DE6F7'
    s=rect(0,0,1200,800,'url(#bg)')
    s+=ellipse(620,675,490,130,'url(#glow)',75)
    s+=ellipse(620,673,430,86,cyan,4,.7)
    # toolbox body and hinged lid
    s+=path('M 345 325 L 410 230 Q 432 208 463 212 L 800 212 Q 835 215 845 246 L 892 340 L 870 375 L 368 375 Z','url(#blue)',cyan,5)
    s+=rect(312,360,590,265,'url(#blue)',38,cyan,5)
    s+=path('M 312 400 Q 605 447 902 400',stroke='#6FE8FA',sw=7,opacity=.7)
    s+=rect(564,403,95,60,'url(#glass)',12,cyan,4)
    s+=rect(594,421,35,22,'#08599C',4)
    # giant gear
    points=[]
    for k in range(32):
        a=2*math.pi*k/32
        radius=135 if k%4 in (0,1) else 112
        points.append(f'{600+radius*math.cos(a):.1f},{310+radius*math.sin(a):.1f}')
    s+=f'<polygon points="{" ".join(points)}" fill="url(#cyan)" stroke="{cyan}" stroke-width="4"/>'
    s+=circle(600,310,62,'#0A3D78' if not light else '#E8F7FF',1,cyan,7)
    # wrench, screwdriver behind gear
    s+=path('M 438 360 L 328 200 L 300 175 L 282 190 L 305 235 L 410 388 Z','url(#glass)',cyan,4)
    s+=circle(288,182,35,'url(#glass)',1,cyan,6)
    s+=path('M 790 384 L 910 165 L 943 176 L 827 406 Z','url(#glass)',cyan,4)
    s+=path('M 897 175 L 925 121 L 954 140 L 937 191 Z','url(#cyan)',cyan,3)
    for x,y,w,h in [(150,235,150,105),(933,235,150,105),(140,490,100,78),(1010,485,92,92)]:
        s+=rect(x,y,w,h,'url(#glass)',16,cyan,2,.5)
    return s

SCENES={'hero':scene_globe,'game':scene_game,'software':scene_software,'tools':scene_tools}
for name,make in SCENES.items():
    for light in (False,True):
        theme='light' if light else 'dark'
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">{defs(light)}{make(light)}</svg>'
        # Preserve a copy of the exact vector source for future edits.
        (OUT/f'{name}-{theme}.svg').write_text(svg,encoding='utf-8')
        for width,height,suffix in [(1600,1067,''),(640,427,'-640')]:
            raster=cairosvg.svg2png(bytestring=svg.encode(),output_width=width,output_height=height)
            image=Image.open(BytesIO(raster)).convert('RGB')
            filename=f'{name}{"-light" if light else ""}{suffix}.webp'
            image.save(OUT/filename,'WEBP',quality=87,method=6)
            print(filename, image.size)
