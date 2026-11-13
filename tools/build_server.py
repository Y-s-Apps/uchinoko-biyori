#!/usr/bin/env python3
"""サーバー（Supabase Edge Function `api`）で使うゲームの確かめを、src/ のJSから組み立てる。

  python3 tools/build_server.py              … supabase/functions/api/game.js を作り直す
  python3 tools/build_server.py --check      … game.js が src/ と同じか、deno.json が指すコミットの game.js とも同じかを確かめる
  python3 tools/build_server.py --pin <SHA>  … deno.json の "uchinoko-game" を、push したコミット <SHA> の game.js にする

デプロイの流れ：game.js を作り直す → main に push → --pin <そのコミット> → index.ts と deno.json をデプロイ
（Edge Function は deno.json の URL から game.js を読みこむので、デプロイで game.js を送らなくてよい）。

画面と同じ ensureState()・carryExtras()・引っこしコードの読みとりと、おせわのルール（js_rules.js の Rules）を、
サーバーでもそのまま使うため。データのファイル（js_data*.js と js_pet.js）と js_rules.js は丸ごと、
js_app.js と js_features.js からは下の名前の関数・定数だけを取り出す（DOM にさわるところは入れない）。
js_onboard.js からは、AIの読みとりの頼み方（buildPrompt）と返事の確かめ（parseAI）を取り出す（Claude版と同じもの）。
ルールの時計（Clock）は、サーバーでは日付を日本時間（Asia/Tokyo、UTC+9・夏時間なし）にし、偶然は crypto で決める。
"""
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
OUT = os.path.join(ROOT, 'supabase', 'functions', 'api', 'game.js')

WHOLE = ['js_data.js', 'js_data2.js', 'js_data3.js', 'js_pet.js', 'js_rules.js']
PICK = {
    'js_app.js': ['PHOTO_RE', 'safePhoto', 'MOVE_PREFIX', 'MOVE_MAX', 'readMoveCode', 'decodeMovePayload'],
    'js_features.js': ['cleanText', 'ensureState', 'carryExtras'],
    'js_onboard.js': ['buildPrompt', 'parseAI'],
}
EXPORTS = ['cleanText', 'ensureState', 'carryExtras', 'readMoveCode', 'safePhoto', 'levelInfo', 'normalizeLook', 'dayKey', 'MOVE_MAX',
           'Rules', 'Clock', 'newState', 'wearFrom', 'buildPrompt', 'parseAI']

DAYKEY_JST = '''/* サーバーの時計：日付は日本時間（UTC+9。夏時間はない）、偶然は crypto */
Clock.dayKey = function(t){
  const ms = t == null ? this.now() : (t instanceof Date ? t.getTime() : Number(t));
  const d = new Date(ms + 9 * 3600e3);
  return d.getUTCFullYear() + '-' + String(d.getUTCMonth() + 1).padStart(2, '0') + '-' + String(d.getUTCDate()).padStart(2, '0');
};
Clock.rand = () => crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
'''


def pick(text, name, fname):
    """`const NAME = ...;`（1行）か、`function NAME(` から行頭の `}` までを取り出す"""
    m = re.search(r'^const ' + re.escape(name) + r' = .*$', text, re.M)
    if m:
        return m.group(0)
    m = re.search(r'^function ' + re.escape(name) + r'\(.*?^\}$', text, re.M | re.S)
    if m:
        return m.group(0)
    sys.exit(f'build_server: {fname} に {name} が見つかりません')


def build():
    parts = ['/* うちのこ日和：サーバーで使うゲームの確かめ。tools/build_server.py が src/ から作る（手で直さない） */',
             '/* eslint-disable */']
    for f in WHOLE:
        with open(os.path.join(SRC, f), encoding='utf-8') as fh:
            parts.append(f'/* ---- src/{f} ---- */\n' + fh.read().strip())
    for f, names in PICK.items():
        with open(os.path.join(SRC, f), encoding='utf-8') as fh:
            text = fh.read()
        parts.append(f'/* ---- src/{f}（{", ".join(names)}） ---- */\n' + '\n'.join(pick(text, n, f) for n in names))
    parts.append(DAYKEY_JST)
    parts.append('export { ' + ', '.join(EXPORTS) + ' };')
    return '\n\n'.join(parts) + '\n'


def selftest(path):
    """node で読みこんで、見本のセーブと引っこしコードが通るか確かめる"""
    test = r'''
const g = await import(process.argv[1]);
const t0 = Date.now();
const pet = { name:'ためし', species:'dog', breedId:'pom', look:{ species:'dog', breedId:'pom' }, photo:'data:image/jpeg;base64,AAAA', colorName:'クリーム', wear:{ head:null, face:null, neck:null } };
const st = g.ensureState({ v:1, pet, stats:{ full:'50', mood:200, love:30 }, counts:{ meals:3 }, last:t0, created:t0, updated:t0 });
if (st.stats.full !== 50 || st.stats.mood !== 100 || !st.room || !Array.isArray(st.stamps)) throw new Error('ensureState');
const b64 = Buffer.from(JSON.stringify(st)).toString('base64');
const r = g.readMoveCode('UCHINOKO2:' + b64.length + ':' + b64);
if (!r.st || r.st.pet.name !== 'ためし' || r.st.daily !== null && r.st.daily !== undefined && r.st.daily.list) throw new Error('readMoveCode ' + JSON.stringify(r).slice(0, 200));
if (g.readMoveCode('xyz').reason !== 'noprefix') throw new Error('noprefix');
if (!/^\d{4}-\d{2}-\d{2}$/.test(g.dayKey())) throw new Error('dayKey');
if (g.dayKey(Date.UTC(2026, 0, 1, 15, 0)) !== '2026-01-02') throw new Error('dayKey JST');
const r1 = g.Clock.rand(); if (!(r1 >= 0 && r1 < 1)) throw new Error('rand');
const st2 = g.ensureState(JSON.parse(JSON.stringify(st)));
const fed = g.Rules.act(st2, 'feed', {}, {});
if (!fed.ok || st2.counts.meals !== 4 || !Array.isArray(fed.ev)) throw new Error('Rules.feed ' + JSON.stringify(fed));
const ai = g.parseAI({ species:'dog', candidates:[{ id:'pomeranian', confidence:0.9 }, { id:'nope', confidence:1 }, { id:'kuro', confidence:1 }], colorName:'<b>クリーム</b>のながいなまえのいろのなまえ', comment:'x'.repeat(99), look:{ ear:'evil', colors:{ main:'javascript:alert(1)' } } });
if (!ai || ai.cands.length !== 1 || ai.cands[0].id !== 'pomeranian' || ai.colorName.length > 14 || ai.comment.length > 60 || ai.look.ear !== 'small' || !/^#[0-9a-f]{6}$/i.test(ai.look.colors.main)) throw new Error('parseAI ' + JSON.stringify(ai).slice(0, 300));
if (g.parseAI({ species:'other' }).species !== 'other' || g.parseAI(null) !== null || g.parseAI([]) !== null) throw new Error('parseAI other');
if (!/pomeranian\(ポメラニアン\)/.test(g.buildPrompt())) throw new Error('buildPrompt');
if (g.cleanText('\u0000ab\ud83dc' + '😀'.repeat(12), 10) !== 'abc' + '😀'.repeat(7)) throw new Error('cleanText');
const half = g.ensureState({ v:1, pet:{ ...pet, name:'あいうえおかきくけ😀'.slice(0, 10), colorName:'くり\u0000ーむ' }, stats:{}, counts:{} });
if (half.pet.name !== 'あいうえおかきくけ' || half.pet.colorName !== 'くりーむ') throw new Error('ensureState name ' + JSON.stringify(half.pet.name));
console.log('game.js ok');
'''
    r = subprocess.run(['node', '--input-type=module', '-e', test, path], capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit('build_server: game.js の確かめに失敗しました\n' + r.stderr[-2000:])
    print(r.stdout.strip())


DENO_JSON = os.path.join(ROOT, 'supabase', 'functions', 'api', 'deno.json')
RAW = 'https://raw.githubusercontent.com/Y-s-Apps/uchinoko-biyori/{sha}/supabase/functions/api/game.js'


def pinned_url():
    import json
    with open(DENO_JSON, encoding='utf-8') as fh:
        return json.load(fh)['imports']['uchinoko-game']


def main():
    out = build()
    if '--pin' in sys.argv:
        import json
        sha = sys.argv[sys.argv.index('--pin') + 1]
        if not re.fullmatch(r'[0-9a-f]{40}', sha):
            sys.exit('build_server: --pin にはコミットの40文字のSHAをわたしてください')
        with open(DENO_JSON, 'w', encoding='utf-8') as fh:
            json.dump({'imports': {'uchinoko-game': RAW.format(sha=sha)}}, fh, indent=2)
            fh.write('\n')
        print('deno.json →', RAW.format(sha=sha))
        return
    if '--check' in sys.argv:
        cur = open(OUT, encoding='utf-8').read() if os.path.exists(OUT) else ''
        if cur != out:
            sys.exit('build_server: supabase/functions/api/game.js が src/ と合っていません。python3 tools/build_server.py で作り直して、デプロイしてください')
        print('game.js は src/ と同じです')
        url = pinned_url()
        try:
            import urllib.request
            with urllib.request.urlopen(url, timeout=20) as r:
                remote = r.read().decode('utf-8')
        except Exception as e:  # GitHub に届かない環境では、ここは確かめられない
            print('（deno.json が指す game.js は読めませんでした：', e, '）')
            return
        if remote != out:
            sys.exit('build_server: deno.json が指すコミットの game.js が、いまの src/ と合っていません。push → --pin → デプロイをしてください')
        print('deno.json が指す game.js も同じです')
        return
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, 'w', encoding='utf-8') as fh:
        fh.write(out)
    print(f'wrote {os.path.relpath(OUT, ROOT)} ({len(out.encode())} bytes)')
    selftest(OUT)


if __name__ == '__main__':
    main()
