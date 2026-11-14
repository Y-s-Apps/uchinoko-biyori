#!/usr/bin/env python3
"""うちのこ日和：改行の確認（ことばの まんなかで 切れていないか）。

ビルドずみの画面を スマホ幅（375・390px）で ひらき、シート・ポップアップ・トースト・はじめての画面を 1つずつ出して、
日本語の文が「カ／ード」のように ことばの まんなかで 切れているところを さがします。
スペース・句読点（、。！？」など）・<br>・<wbr> での改行は よい改行として数えません。

  python3 tools/linebreak.py              # ホーム画面版（ルートの index.html）
  python3 tools/linebreak.py --line       # LINE版（src/out/line/。LINEの中で サーバーに つながったときの画面も まねる）
  python3 tools/linebreak.py --claude     # Claude版（src/out/uchinoko-claude.html を アーティファクトの外で。ゲストの保存）
  python3 tools/linebreak.py --shots DIR  # 場面ごとの スクリーンショットも とる（見本づくり用）
  python3 tools/linebreak.py --width 375  # 幅を1つだけ

フォントは tools/fonts（`cd tools/fonts && npm install`）の Zen Maru Gothic・Mochiy Pop One を使います（iPhone と同じ改行に するため）。
ことばの まんなかの改行・横はみだし・ページエラーが 1件でもあれば 終了コード1で終わります。
"""
import argparse, asyncio, json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import webfonts  # noqa: E402
from smoke import sample_state, ROOT  # noqa: E402
import functools, http.server, socketserver, threading  # noqa: E402


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve(root):
    httpd = socketserver.TCPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=root))
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]

# ----- ページの中で使う：改行を さがす -----
AUDIT_JS = r"""
(sel) => {
  const WORD = /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー々〆ヶA-Za-z0-9０-９Ａ-Ｚａ-ｚ]/u;
  const AFTER = /[、。，．,.!！?？…」』）)］】〕〉》・：:;；%％\-‐〜~／\/♥]/;   // このあとで切れてよい
  const BEFORE = /[「『（(［【〔〈《♥]/;                                    // このまえで切れてよい
  const out = { breaks:[], overflow:[] };
  const roots = [...document.querySelectorAll(sel)].filter(r => r.getClientRects().length);
  const range = document.createRange();
  const path = e => { const a = []; for (let n = e; n && n.nodeType === 1 && a.length < 4; n = n.parentElement) a.unshift(n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (n.classList.length ? '.' + [...n.classList].join('.') : '')); return a.join(' > '); };
  for (const root of roots){
    const rootRect = root.getBoundingClientRect();
    const blockOf = n => {
      for (let e = n.parentElement; e; e = e.parentElement){
        const d = getComputedStyle(e).display;
        if (d !== 'inline' && d !== 'contents') return e;
        if (e === root) return e;
      }
      return root;
    };
    const blocks = new Map();
    const push = (b, item) => { if (!blocks.has(b)) blocks.set(b, []); blocks.get(b).push(item); };
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode(n){
      if (n.nodeType === 1){
        if (n.namespaceURI !== 'http://www.w3.org/1999/xhtml') return NodeFilter.FILTER_REJECT;
        if (/^(SCRIPT|STYLE|TEXTAREA|INPUT|SELECT|OPTION)$/.test(n.tagName)) return NodeFilter.FILTER_REJECT;
        const cs = getComputedStyle(n);
        if (cs.display === 'none' || cs.visibility === 'hidden') return NodeFilter.FILTER_REJECT;
        return n.tagName === 'BR' || n.tagName === 'WBR' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    }});
    for (let n; (n = w.nextNode());){
      const b = blockOf(n);
      if (n.nodeType === 1){ push(b, n.tagName === 'WBR' ? { sp:true } : { br:true }); continue; }   // <wbr> は 切ってよいところ
      const t = n.data;
      // 横に はみだしても 切りとられる（…で とめる など）ところは かぞえない
      let clip = null;
      for (let e = n.parentElement; e && e !== root; e = e.parentElement){
        const cs = getComputedStyle(e);
        if (cs.overflowX !== 'visible' || cs.textOverflow === 'ellipsis'){ clip = e; break; }
      }
      for (let i = 0; i < t.length;){
        const cp = t.codePointAt(i), len = cp > 0xffff ? 2 : 1, c = t.slice(i, i + len);
        if (/\s/.test(c)){ push(b, { sp:true }); i += len; continue; }
        range.setStart(n, i); range.setEnd(n, i + len);
        const r = range.getClientRects()[0];
        i += len;
        if (!r || (r.width === 0 && r.height === 0)) continue;
        push(b, { c, top:r.top, h:r.height, left:r.left, right:r.right });
        if (!clip && (r.right > rootRect.right + 1.5 || r.left < rootRect.left - 1.5))
          out.overflow.push({ ch:c, where:path(b), text:(b.textContent || '').trim().slice(0, 40) });
      }
    }
    for (const [b, seq] of blocks){
      const text = seq.map(x => x.br ? '⏎' : x.sp ? ' ' : x.c).join('');
      let prev = null, pi = -1, sp = false, br = false;
      seq.forEach((x, i) => {
        if (x.br){ br = true; return; }
        if (x.sp){ sp = true; return; }
        if (prev && x.top > prev.top + prev.h * 0.6){
          const kind = br ? 'br' : sp ? 'space' : (AFTER.test(prev.c) || BEFORE.test(x.c)) ? 'punct'
            : (WORD.test(prev.c) && WORD.test(x.c)) ? 'mid' : 'other';
          if (kind === 'mid' || kind === 'other'){
            const before = text.slice(Math.max(0, pi - 9), pi + 1), after = text.slice(i, i + 9);
            out.breaks.push({ kind, ctx:before + '／' + after, where:path(b) });
          }
        }
        prev = x; pi = i; sp = false; br = false;
      });
    }
  }
  const de = document.scrollingElement;
  if (de.scrollWidth > innerWidth + 1) out.overflow.push({ ch:'', where:'page', text:'横スクロール ' + de.scrollWidth + 'px' });
  return out;
}
"""

# ----- 場面 -----
def toast_texts():
    """src の toast(...) に出す文を あつめる（${…} は ためしの値に）"""
    texts = []
    for name in sorted(os.listdir(os.path.join(ROOT, 'src'))):
        if not name.endswith('.js'):
            continue
        src = open(os.path.join(ROOT, 'src', name), encoding='utf-8').read()
        src = re.sub(r"\$\{per \? `([^`]*)` : ''\}", lambda m: m.group(1).replace('${per}', '3'), src)   # 入れ子の `…`
        for m in re.finditer(r'(?:toast|this\.reload)\((.*?)\);', src, re.S):
            for s in re.findall(r"'([^'\n]*[ぁ-んァ-ン一-龥][^'\n]*)'|`([^`\n]*[ぁ-んァ-ン一-龥][^`\n]*)`", m.group(1)):
                texts.append(s[0] or s[1])
    sub = lambda t: re.sub(r'\$\{[^}]*\}', '30', re.sub(r'\$\{(?:S|g)\.pet\.name\}', 'だいず', t)).replace('\\n', '\n')   # \n は 改行（トーストは pre-line）
    out = []
    for t in texts:
        t = sub(t)
        if t not in out:
            out.append(t)
    return out


def scenes(line):
    """(名前, 出すための JS, しらべる場所, 待つms, いまの子が いるか)"""
    S = []
    add = lambda name, js, root, wait=450, pet=True: S.append((name, js, root, wait, pet))
    # はじめての画面（子がいないとき）
    add('ob_welcome', '', '#ob', 300, False)
    add('ob_import', 'Onboard.importView()', '#ob', 300, False)
    add('ob_import_err', "Onboard.importView(moveErrorText({reason:'short', need:52345, got:1200}))", '#ob', 300, False)
    for err in ['この写真は 読みこめませんでした。JPEGか PNGの 写真で ためしてね。',
                '犬か猫が 写っている 写真を えらんでね。顔が はっきり 写っている 写真が おすすめです。',
                'この写真は 読みとれませんでした。ちがう 写真で ためしてね。']:
        add('ob_welcome_err', 'Onboard.welcome(%s)' % json.dumps(err), '#ob', 300, False)
    add('ob_edit', "document.querySelector('#obManual').click(); await new Promise(r => setTimeout(r, 300)); document.querySelector('[data-g=\"shiba\"]').click()", '#ob', 400, False)
    if line:
        add('ob_aiask', "LineSync.state='on'; LineServer.ai={on:true,left:3,perDay:3}; LineServer.call=async()=>({ai:{on:true,left:3,perDay:3}}); LineAI.ask(Onboard,{preview:'data:image/gif;base64,R0lGODlhAQABAAAAACw='})", '#ob', 400, False)
        add('ob_aiask_none', "LineSync.state='on'; LineServer.ai={on:true,left:0,perDay:3}; LineServer.call=async()=>({ai:{on:true,left:0,perDay:3}}); LineAI.ask(Onboard,{preview:'data:image/gif;base64,R0lGODlhAQABAAAAACw='})", '#ob', 400, False)
        add('ob_welcome_ai', "LineSync.state='on'; LineServer.ai={on:true,left:3,perDay:3}; Onboard.welcome(); LineApp.paint()", '#ob', 300, False)
    # おへや・シート
    add('room', '', '.top, .stats, .dock, #hint', 300)
    for name, js in [('requests', 'openRequests()'), ('tricks', 'openTricks()'), ('treats', 'openTreats()'), ('dress', 'openDress()'),
                     ('room_tab', "openDress(); await new Promise(r => setTimeout(r, 300)); document.querySelector('[data-slot=\"room\"]').click()"),
                     ('album_diary', "openAlbum('diary')"), ('album_souv', "openAlbum('souv')"), ('album_stamp', "openAlbum('stamp')"),
                     ('profile', 'openMenu()'), ('profile_new', "openMenu(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mNew').click()"),
                     ('move', 'openMove()'),
                     ('move_err', "openMove(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mvIn').value='abc'; document.querySelector('#mvTake').click()"),
                     ('move_ok', "openMove(); await new Promise(r => setTimeout(r, 300)); document.querySelector('#mvIn').value=encodeMoveCode(); document.querySelector('#mvTake').click()")]:
        add(name, js, '#sheet')
    for slot in ['face', 'neck']:
        add('dress_' + slot, "dressSlot='%s'; openDress()" % slot, '#sheet')
    for cat in ['floor', 'rug', 'bed', 'view']:
        add('room_' + cat, "dressSlot='room'; roomCat='%s'; openDress()" % cat, '#sheet')
    add('album_souv_all', "SOUVENIRS.forEach(x => S.souv.have[x.id] = 2); openAlbum('souv')", '#sheet')
    add('requests_pinch',"S.daily.rescue={type:'treat',n:2,got:0,done:false}; S.streak={last:Clock.dayKey(now()-2*864e5),n:12,best:20}; openRequests()", '#sheet')
    if line:
        on = ("LineSync.state='on'; LineServer.member={id:'x'}; LineSync.created=1; LineServer.card={on:true,left:2,perDay:3}; LineServer.importable=true;"
              "LineApp.state='ready'; LineApp.inClient=true; window.liff=Object.assign(window.liff||{}, {isApiAvailable:()=>true});")
        add('profile_line', on + 'openMenu(); LineApp.paint()', '#sheet')
        add('move_line', on + 'openMove(); LineApp.paint()', '#sheet')
        # 引っこし・バックアップの「この端末に とっておいた子」（診断 3-2）。名前の ながい子と みじかい子
        kid = ("(n, c, love) => ({at:1, b:0, st:Object.assign(JSON.parse(JSON.stringify(S)), {created:c, pet:Object.assign({}, S.pet, {name:n, breedId:'shiba', look:{species:'dog', breedId:'shiba'}}),"
               " stats:{full:50, mood:50, love:love}})})")
        keep = "localStorage.setItem(LINE_GUEST_KEY, JSON.stringify({v:2, kids:[(%s)('ながいながいなまえの', 11, 900), (%s)('こむぎ', 12, 30)]}));" % (kid, kid)
        add('move_line_keep', on + keep + 'openMove(); LineApp.paint()', '#sheet')
        add('move_line_keep_used', on + keep + 'LineServer.importable=false; openMove(); LineApp.paint()', '#sheet')
        add('move_line_keep_guest', keep + 'openMove(); LineApp.paint()', '#sheet')
        for st in ['loading', 'failed']:
            add('profile_line_' + st, "LineApp.state='%s'; LineApp.error='timeout'; openMenu(); LineApp.paint()" % st, '#sheet')
        add('profile_line_outside', "LineApp.state='ready'; LineApp.inClient=false; openMenu(); LineApp.paint()", '#sheet')
        add('profile_line_srvfail', "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='failed'; LineSync.error='server'; openMenu(); LineApp.paint()", '#sheet')
        add('profile_line_left', "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='left'; openMenu(); LineApp.paint()", '#sheet')
        # つながれない理由（やさしい ことば。診断 4-3）。LINEの子（line-owner）と ゲストの 両方
        for own in ['', "localStorage.setItem(LINE_OWNER_KEY,'m1');"]:
            for err in ['sdk', 'INIT_FAILED']:
                add('profile_line_liff_' + err, own + "LineApp.state='failed'; LineApp.error='%s'; openMenu(); LineApp.paint()" % err, '#sheet')
            for err in ['unavailable', 'expired', 'badtoken', 'http404', 'later']:
                add('profile_line_srv_' + err, own + "LineApp.state='ready'; LineApp.inClient=true; LineSync.state='failed'; LineSync.error='%s'; openMenu(); LineApp.paint()" % err, '#sheet')
    # ポップアップ
    for lv in range(2, 101):
        add('levelup_%d' % lv, 'celebrate(%d, %d)' % (lv, lv - 1), '.levelup .card', 250)
    add('rescue', 'S.streak.n=13; rescueModal()', '.levelup .card', 1500)
    add('broke', 'brokeModal({next:Clock.dayKey(now()+5*864e5)})', '.levelup .card')
    add('pinch', "S.daily.rescue={type:'treat',n:2,got:0,done:false}; pinchModal({n:12})", '.levelup .card')
    add('alldone', 'S.streak.n=5; allDoneModal({})', '.levelup .card', 1500)
    add('alldone_first', 'S.streak.n=1; allDoneModal({})', '.levelup .card', 1500)
    add('alldone_bridged', 'S.streak.n=13; allDoneModal({bridged:true})', '.levelup .card', 1500)
    add('alldone_waiting', "S.daily.rescue={type:'pet',n:5,got:0,done:false}; S.streak.saved={n:12}; allDoneModal({waiting:true})", '.levelup .card', 1500)
    add('souvenirs', None, '.levelup .card', 0)        # 22こ（下で ひとつずつ）
    add('events', None, '.levelup .card', 0)           # 10こ
    add('anniv', 'annivModal({years:3})', '.levelup .card')
    add('trick_learned', "Modal.show({label:'げいをおぼえた', html:`${petCard()}<h3>げい「${esc('くるっとターン')}」を<br>おぼえた！</h3><p>これからは いつでも見せてくれます。<br>♥+5</p><button class=\"btn primary\" type=\"button\" data-close>すごいね！</button>`})", '.levelup .card')
    add('failnotice', 'Persist.failNoticed=false; Persist.failNotice()', '.levelup .card')
    add('restored', 'Persist.restored=now()-864e5; Persist.restoredNotice()', '.levelup .card')
    if line:
        on = ("LineSync.state='on'; LineServer.member={id:'x'}; LineSync.created=1; LineApp.state='ready'; LineApp.inClient=true;"
              "LineSync.queue=f=>f(); LineSync.left=()=>{};")
        add('line_wait_outside', "LineSync.waitOpen=false; LineSync.waitNotice('outside')", '.levelup .card')
        add('line_wait_server', "LineSync.waitOpen=false; LineSync.waitNotice('server')", '.levelup .card')
        guest = ("localStorage.setItem(LINE_GUEST_KEY, JSON.stringify(Object.assign(JSON.parse(JSON.stringify(S)), {pet:Object.assign({}, S.pet, {name:'こむぎ', breedId:'shiba', look:{species:'dog', breedId:'shiba'}}), stats:{full:50, mood:50, love:900}})));"
                 "LineServer.importable=true; LineSync.samePet=()=>false; LineSync.progressed=()=>true;")
        add('line_offer_guest', guest + 'LineSync.offerGuest()', '.levelup .card')
        add('line_offer_local', 'LineServer.importable=true; LineSync.stash=()=>{}; LineSync.offerLocal()', '.levelup .card')
        add('line_offer_local_used', 'LineServer.importable=false; LineSync.stash=()=>{}; LineSync.offerLocal()', '.levelup .card')
        # 「つれてくる」が 通信で しっぱいした（診断 3-2）
        add('line_bring_failed', "LineServer.importable=true; LineSync.stash=()=>{}; LineSync.bring=async()=>{const e=new Error('unavailable'); e.code='unavailable'; throw e;};"
            "LineSync.offerLocal(); await new Promise(r => setTimeout(r, 400)); document.querySelector('.levelup [data-close=\"take\"]').click()", '.levelup .card', 900)
        # とっておいた子を つれてくる前の たしかめ（3-2）と、とどかないまま とじた子（3-8）
        other = "Object.assign(JSON.parse(JSON.stringify(S)), {created:77, pet:Object.assign({}, S.pet, {name:'ながいながいなまえの', breedId:'shiba', look:{species:'dog', breedId:'shiba'}})})"
        add('line_keep_bring', on + "LineServer.importable=true; LineKeep.bring(%s)" % other, '.levelup .card')
        for k, imp in [('adopt', 'true'), ('import', 'true'), ('import', 'false')]:
            add('line_unsent_%s_%s' % (k, imp), on + "LineServer.importable=%s; LineSync.unsent=()=>({m:'x', c:77, k:'%s'}); LineSync.offerUnsent(%s)" % (imp, k, other), '.levelup .card')
        add('line_leave_1', on + 'LineLeave.busy=false; LineLeave.start()', '.levelup .card')
        add('line_leave_2', on + "LineLeave.busy=false; LineLeave.start(); await new Promise(r => setTimeout(r, 400)); document.querySelector('.levelup [data-close=\"next\"]').click()", '.levelup .card', 700)
        add('line_leave_done', on + "LineServer.call=async()=>({deauth:'none'}); LineLeave.busy=false; LineLeave.run(esc(S.pet.name))", '.levelup .card')
        card = (on + "LineServer.card={on:true,left:%d,perDay:3}; window.liff=Object.assign(window.liff||{}, {isApiAvailable:()=>true});"
                "LineServer.call=async()=>({card:{on:true,left:%d,perDay:3}}); LineCard.busy=false; LineCard.start()")
        add('line_card', card % (2, 2), '.levelup .card', 1500)
        add('line_card_none', card % (0, 0), '.levelup .card', 1500)
        # おしらせ（診断 5-6）：ポリシーを かえるとき・本サービスを終えるとき の 文の 見本
        for n in ["{id:'lb1', title:'プライバシーポリシーを かえます', when:'2027年1月15日から', text:'AIの 読みとりに つかう 会社を かえます。くわしくは プライバシーポリシーを 見てね。', link:'privacy'}",
                  "{id:'lb2', title:'うちのこ日和を おわります', when:'2027年3月31日まで', text:'それまでに「引っこし・バックアップ」の 引っこしコードで、ホーム画面の アプリなどへ つれていけます。', link:'terms'}",
                  "{id:'lb3', title:'利用規約を かえました'}"]:
            add('line_notice', "localStorage.removeItem(LINE_NOTICE_KEY); LineNotice.list=[%s]; LineNotice.shown=false; LineNotice.check()" % n, '.levelup .card')
    # トースト
    for t in toast_texts():
        add('toast', 'toast(%s)' % json.dumps(t), '#toast', 450)
    return S


async def run(args, width):
    from playwright.async_api import async_playwright
    root = ROOT
    if args.line:
        root = os.path.join(ROOT, 'src', 'out', 'line')
    elif args.claude:
        import tempfile
        root = tempfile.mkdtemp(prefix='uchinoko-claude-')
        with open(os.path.join(ROOT, 'src', 'out', 'uchinoko-claude.html'), encoding='utf-8') as f, \
                open(os.path.join(root, 'index.html'), 'w', encoding='utf-8') as g:
            g.write('<meta charset="utf-8">\n' + f.read())   # アーティファクトは UTF-8 で出る
    httpd, port = serve(root)
    found, overflow, errors, n_scenes = [], [], [], 0
    shots = os.path.join(args.shots, str(width)) if args.shots else None
    if shots:
        os.makedirs(shots, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        ctx = await browser.new_context(viewport={'width': width, 'height': 844}, device_scale_factor=2, is_mobile=True,
                                        has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP', service_workers='block')
        fonts = await webfonts.install(ctx)
        if args.line:
            await ctx.route('https://static.line-scdn.net/**', lambda r: r.abort())
        page = await ctx.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        cur = {'pet': None}

        async def load(pet):
            if cur['pet'] is pet:
                return
            await page.goto(f'http://127.0.0.1:{port}/about:blank')
            await page.evaluate("Object.keys(localStorage).filter(k => k.startsWith('uchinoko-biyori:')).forEach(k => localStorage.removeItem(k)); sessionStorage.clear()")
            if pet:
                st = sample_state()
                st['pet']['name'] = 'だいず'
                st['stats']['love'] = 2600
                await page.evaluate('s => localStorage.setItem("uchinoko-biyori:v1", s)', json.dumps(st))
            await page.goto(f'http://127.0.0.1:{port}/')
            await page.wait_for_timeout(1400)
            await page.evaluate('document.fonts.ready')
            await clear()
            cur['pet'] = pet

        async def clear():
            await page.evaluate('''() => { document.querySelectorAll('.levelup').forEach(e => e.remove());
              if (typeof Modal !== 'undefined'){ Modal.q = []; Modal.busy = false; }
              try { closeSheet(); } catch(e){}
              const t = document.getElementById('toast'); if (t) t.classList.remove('show'); }''')
            await page.wait_for_timeout(380)

        async def check(name, js, root, wait):
            nonlocal n_scenes
            if js:
                await page.evaluate('async () => { %s }' % js)
            await page.wait_for_timeout(wait)
            res = await page.evaluate(AUDIT_JS, root)
            n_scenes += 1
            for b in res['breaks']:
                found.append((name, b['kind'], b['ctx'], b['where']))
            for o in res['overflow']:
                overflow.append((name, o['where'], o['text']))
            if shots:
                await page.screenshot(path=os.path.join(shots, f'{n_scenes:03d}_{name}.png'))
            await clear()

        for name, js, root, wait, pet in scenes(args.line):
            # 子がいない画面と いる画面で ページを ひらきなおす。LINE版の「つれてくる？」なども 状態を変えるので 毎回
            fresh = name.startswith('line_offer') or name.startswith('ob_') or name.startswith('profile_line') or name.startswith('move_line') or name.startswith('line_unsent') or name.startswith('line_keep')
            if fresh:
                cur['pet'] = None
            await load(pet)
            if name == 'souvenirs':
                ids = await page.evaluate('SOUVENIRS.map(x => x.id)')
                for sid in ids:
                    await page.evaluate("souvenirModal({id:%s, isNew:true, bonus:4, after:[]})" % json.dumps(sid))
                    await check('souvenir_' + sid, '', root, 450)
                continue
            if name == 'events':
                ids = await page.evaluate('EVENTS.map(x => x.id)')
                for eid in ids:
                    await check('event_' + eid, 'eventModal({id:%s, had:false})' % json.dumps(eid), root, 450)
                continue
            await check(name, js, root, wait)
            if fresh:
                cur['pet'] = None
        await browser.close()
    httpd.shutdown()
    return fonts, n_scenes, found, overflow, errors


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--line', action='store_true')
    ap.add_argument('--claude', action='store_true')
    ap.add_argument('--width', type=int, action='append')
    ap.add_argument('--shots')
    ap.add_argument('--json', help='見つけたものを JSON で書き出す')
    args = ap.parse_args()
    widths = args.width or [375, 390]
    bad, report = 0, {}
    for w in widths:
        fonts, n, found, overflow, errors = asyncio.run(run(args, w))
        print(f'== {"LINE版" if args.line else "Claude版" if args.claude else "ホーム画面版"} {w}px：{n}場面'
              + ('' if fonts else '（フォントなし：cd tools/fonts && npm install）'))
        for name, kind, ctx, where in found:
            print(f'  {kind:5} {name:22} {ctx}    [{where}]')
        for name, where, text in overflow:
            print(f'  はみだし {name:20} {text}    [{where}]')
        for e in errors:
            print('  エラー ' + e)
        print(f'  ことばの まんなか：{sum(1 for f in found if f[1] == "mid")}  そのほか：{sum(1 for f in found if f[1] != "mid")}'
              f'  はみだし：{len(overflow)}  エラー：{len(errors)}')
        bad += sum(1 for f in found if f[1] == 'mid') + len(overflow) + len(errors)
        report[w] = {'breaks': found, 'overflow': overflow, 'errors': errors}
    if args.json:
        with open(args.json, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=1)
    return 1 if bad else 0


if __name__ == '__main__':
    raise SystemExit(main())
