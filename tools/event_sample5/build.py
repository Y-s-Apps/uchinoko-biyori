#!/usr/bin/env python3
"""あたらしい 季節イベントの 見本 5（docs/PROJECT.md 9章・2026-11-27）を 1まいの HTML に する。

  python3 tools/event_sample5/build.py      # → smoke-out/event-sample5/index.html（アーティファクト「うちのこ 季節イベント 見本」に そのまま 出せる）

うちのこの 絵と CSS は src/ の いまの コード（js_data*.js・js_pet.js・js_wear.js と head.html の うちのこの CSS。#petArt は .art に）。
あたらしい イベントの データ・きせかえ・おやつ・かざりは 下書きの events.js（入れる ときは js_data3.js・js_wear.js・js_data2.js・js_features.js へ）、main.js は こよみ・ミニの おへや・ポップアップ。
"""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
src = lambda n: open(os.path.join(ROOT, 'src', n), encoding='utf-8').read()
own = lambda n: open(os.path.join(HERE, n), encoding='utf-8').read()

def pet_css():
    h = src('head.html')
    css = h[h.index('.pet .pet-svg{'):h.index('.bubble{')]
    return css.replace('#petArt', '.art')

SPLIT_JS = r'''
const LOOKS = {
  daizu:{ species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'lower', colors:{ main:'#F3DDB3', face:'#FBF1DD', chest:'#FBF1DD' } },
};
function breedLook(id){ const b = BREED_BY_ID[id]; return Object.assign({ species:b.sp, breedId:b.id }, b.look); }
'''
esc = lambda s: s.replace('</script', '<\\/script')
pet_js = '\n'.join(src(f) for f in ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_wear.js']) + '\n' + own('events.js')
t = own('template.html')
t = t.replace('/*PET_CSS*/', pet_css())
t = t.replace('/*PET_JS*/', esc(pet_js)).replace('/*SPLIT_JS*/', SPLIT_JS).replace('/*MAIN_JS*/', esc(own('main.js')))
out = os.path.join(ROOT, 'smoke-out', 'event-sample5')
os.makedirs(out, exist_ok=True)
open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(t)
print(os.path.join(out, 'index.html'), len(t.encode()), 'bytes')
