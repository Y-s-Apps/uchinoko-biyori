#!/usr/bin/env python3
"""LINE版の本人確認とセーブの通し確認（サーバー＋画面）。

  cd tools/server && npm install && cd ../..   # はじめの1回（Deno と PGlite）
  sh src/build.sh && python3 tools/line_e2e.py

0. おせわのルール（src/js_rules.js）を、時計を動かして確かめる（tools/rules_test.mjs）。
1. サーバーの関数（supabase/functions/api/index.ts）を Deno で動かし、tools/server/api_test.ts で
   本人確認・おせわ（/act）・名前とみためのセーブ・新しい子・取りこみ・セッションを確かめる（DB は PGlite、LINE の検証はまね）。
2. LINE版の画面（src/out/line/）をスマホ幅のブラウザで開き、LIFF をまねて、同じサーバーにつないで
   ・はじめての子（サーバーが まっさらの子を作る） ・LINEにまだ子がいないときの この端末の子（つれてくる＝1回）
   ・ほかの端末の新しいセーブ ・この端末にいた子をつれてくる（1回だけ） ・引っこしコード（1回だけ）
   ・おせわはサーバーで（ほかの端末の変化も返事でとどく） ・端末の時計をずらしても得をしない
   ・サーバーに届かないとき（ゲストの子は遊べる／LINEの子は まってもらう） ・外部ブラウザ
   ・AIの読みとり（送る前に きく、小さくした JPEG、サーバーでの回数、AIを使わない えらび方、読みとれないとき）
   ・やめる（2回 たしかめる、サーバーの データを すぐに消す、LINE の許可の取り消し、この端末の子は ゲストに、また ひらくと つれてくる）
   ・LINEに子がいるときの「新しい子をむかえる」と 引っこしシートでの受け取り（前の子に もどらない）
   ・内部チャネルごとの画面（/・/review/・/dev/ で それぞれの LIFF ID、同じ会員の子、ポリシーと favicon は いちばん上）
   ・写真立て（写真の控えがない子は イラスト）
   ・うちのこカード（見本 → POST /card〈Storage のまね〉→ シェアターゲットピッカーのまね、同じ絵は数えない、1日3まい、けすと消える）を確かめる。
   ページのエラーと CSP の違反が0件であることも見る。スクリーンショットは smoke-out/line-e2e/。

サーバーの URL（LINE_CFG.api）への通信は、ブラウザの中でこのローカルのサーバーへつなぎかえる。本物の Supabase にはさわらない。
"""
import base64, functools, http.server, json, os, socket, socketserver, subprocess, sys, threading, time, asyncio, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TOOLS = os.path.join(ROOT, 'tools', 'server')
BIN = os.path.join(TOOLS, 'node_modules', '.bin')
FN = os.path.join(ROOT, 'supabase', 'functions', 'api', 'index.ts')
CFG = os.path.join(ROOT, 'supabase', 'functions', 'api', 'deno.local.json')
MIGDIR = os.path.join(ROOT, 'supabase', 'migrations')
# 表のマイグレーション（pg_net は本物の Supabase の確認用なので、PGlite には入れない）。カンマでつないで渡す
MIG = ','.join(os.path.join(MIGDIR, f) for f in sorted(os.listdir(MIGDIR)) if f.endswith('.sql') and 'pg_net' not in f)
API = 'https://ftakgswltcavwixqxpzi.supabase.co/functions/v1/api'
PAGE_PORT = 8765
OUT = os.path.join(ROOT, 'smoke-out', 'line-e2e')


def free_port():
    s = socket.socket(); s.bind(('127.0.0.1', 0)); p = s.getsockname()[1]; s.close(); return p


def env(db_port):
    e = dict(os.environ)
    e['SUPABASE_DB_URL'] = f'postgres://postgres:postgres@127.0.0.1:{db_port}/postgres'
    e['ALLOWED_ORIGINS'] = f'https://uchinoko-biyori.pages.dev,http://127.0.0.1:{PAGE_PORT}'
    if os.path.exists('/root/.ccr/ca-bundle.crt'):
        e.setdefault('DENO_CERT', '/root/.ccr/ca-bundle.crt')
    return e


def start_db():
    port = free_port()
    p = subprocess.Popen([os.path.join(BIN, 'pglite-server'), '-p', str(port), '-m', '4'], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    for line in p.stdout:
        if 'listening' in line:
            return p, port
    raise SystemExit('PGlite が起動しませんでした')


def deno(*args, **kw):
    return [os.path.join(BIN, 'deno'), 'run', '-A', '--no-lock', '--config', CFG, *args]


def run_api_test():
    db, port = start_db()
    try:
        r = subprocess.run(deno(os.path.join(TOOLS, 'api_test.ts'), FN, MIG), env=env(port), capture_output=True, text=True, timeout=300)
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-2000:])
        if r.returncode:
            print(r.stdout[-4000:], r.stderr[-2000:])
        return r.returncode == 0
    finally:
        db.terminate()


def token(sub, sig='test'):
    """ためしの IDトークン（sig：test＝とおる・expired＝切れている・ほか＝たしかめられない）"""
    b = lambda o: base64.urlsafe_b64encode(json.dumps(o).encode()).decode().rstrip('=')
    return b({'alg': 'none'}) + '.' + b({'aud': '2012410263', 'sub': sub}) + '.' + sig


def sample(name, created_days=10, photo=False, updated_ms=None):
    t = int(time.time() * 1000)
    return {
        'v': 1,
        'pet': {'name': name, 'species': 'dog', 'breedId': 'pomeranian', 'colorName': 'クリーム',
                'look': {'species': 'dog', 'breedId': 'pomeranian'},
                'photo': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==' if photo else None,
                'wear': {'head': None, 'face': None, 'neck': 'scarf_tri'}},
        'stats': {'full': 60, 'mood': 80, 'love': 300},
        'counts': {'meals': 10, 'treats': 5, 'pets': 20, 'plays': 4},
        'recentTreats': [], 'last': t - 3600e3, 'created': t - created_days * 864e5 - (hash(name) % 1000), 'updated': updated_ms or t - 60e3,
    }


def photo_jpeg(w=1600, h=1200):
    """ためしの写真（クリームいろの まるい子）"""
    import io
    from PIL import Image, ImageDraw
    im = Image.new('RGB', (w, h), (150, 190, 220))
    ImageDraw.Draw(im).ellipse((w * .3, h * .2, w * .7, h * .85), fill=(240, 220, 180))
    b = io.BytesIO(); im.save(b, 'JPEG', quality=90)
    return {'name': 'pom.jpg', 'mimeType': 'image/jpeg', 'buffer': b.getvalue()}


def code_of(st):
    b = base64.b64encode(json.dumps(st, ensure_ascii=False).encode()).decode()
    return f'UCHINOKO2:{len(b)}:{b}'


async def browser_tests(srv_port):
    from playwright.async_api import async_playwright
    os.makedirs(OUT, exist_ok=True)
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a):
            pass
    handler = functools.partial(Quiet, directory=os.path.join(ROOT, 'src', 'out', 'line'))
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(('127.0.0.1', PAGE_PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{srv_port}'
    dbg = lambda path, body=None: json.loads(urllib.request.urlopen(urllib.request.Request(
        base + path, data=None if body is None else json.dumps(body).encode(), method='GET' if body is None else 'POST',
        headers={'content-type': 'application/json'}), timeout=10).read())
    state = lambda sub: next((r for r in dbg('/__debug/state') if r['sub'] == sub), None)
    fails, n = [], [0]

    def ok(cond, label, info=None):
        print(('  ok   ' if cond else '  FAIL ') + label + ('' if cond or info is None else '  ' + json.dumps(info, ensure_ascii=False, default=str)[:300]))
        if not cond:
            fails.append(label)

    async with async_playwright() as p:
        browser = await p.chromium.launch()

        async def open_page(sub, local=None, external=False, server_down=False, owner=None, skew_ms=0, keys=None, path='/', id_token=None, fail=None):
            """id_token：getIDToken() が返す JS の式（既定は sub の とおるトークン）。
            fail：{'/import': 2} のように、その口への通信を はじめの N 回 とどかなくする（あとから 0 に できる）"""
            ctx = await browser.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True,
                                            has_touch=True, timezone_id='Asia/Tokyo', locale='ja-JP')
            page = await ctx.new_page()
            errs, calls = [], []
            page.on('pageerror', lambda e: errs.append(str(e)))
            page.on('console', lambda m: errs.append('CSP: ' + m.text) if m.type == 'error' and 'Content Security Policy' in m.text else None)
            # シェアターゲットピッカーのまね：送ったメッセージは window.__shared に。__noStp で「使えない」、__stpCancel で「えらばずに とじた」
            # liff.logout のまね：けした回数を localStorage の e2e-logout に
            liff = ("window.liff={init:o=>{window.__liffId=o&&o.liffId;return Promise.resolve()},isInClient:()=>%s,getOS:()=>'ios',getIDToken:()=>(%s),getAccessToken:()=>'e2e-access-token',"
                    "logout:()=>{localStorage.setItem('e2e-logout',String(1+Number(localStorage.getItem('e2e-logout')||0)))},"
                    "isApiAvailable:n=>n==='shareTargetPicker'&&!window.__noStp,"
                    "shareTargetPicker:(m,o)=>{(window.__shared=window.__shared||[]).push({m:m,o:o});return Promise.resolve(window.__stpCancel?undefined:{status:'success'})}};"
                    % ('false' if external else 'true', id_token or json.dumps(token(sub))))
            await page.route('https://static.line-scdn.net/**', lambda r: r.fulfill(status=200, content_type='application/javascript', body=liff))

            async def reopen(route):
                # LIFF URL から ひらきなおす：LINE が 新しいトークンを わたして エンドポイントに もどすまね（?fresh=1）
                calls.append('REOPEN ' + route.request.url)
                await route.fulfill(status=200, content_type='text/html',
                                    body="<script>location.replace('http://127.0.0.1:%d%s?fresh=1')</script>" % (PAGE_PORT, path))
            await page.route('https://miniapp.line.me/**', reopen)

            async def api(route):
                where = route.request.url.replace(API, '')
                calls.append(route.request.method + ' ' + where)
                if server_down:
                    return await route.abort()
                if fail and fail.get(where, 0) > 0:
                    fail[where] -= 1
                    return await route.abort()
                resp = await route.fetch(url=route.request.url.replace(API, base + '/api'))
                await route.fulfill(response=resp)
            await page.route(API + '/**', api)
            init = []
            if skew_ms:   # 端末の時計をずらす（サーバーの時計は そのまま）
                init_skew = "(()=>{const N=Date.now.bind(Date),k=%d;Date.now=()=>N()+k;})();" % skew_ms
                await page.add_init_script(init_skew)
            if local is not None:
                init.append("localStorage.setItem('uchinoko-biyori:v1', %s);" % json.dumps(json.dumps(local, ensure_ascii=False)))
            if owner:
                init.append("localStorage.setItem('uchinoko-biyori:line-owner', %s);" % json.dumps(owner))
            for k, v in (keys or {}).items():
                if v is not None:
                    init.append("localStorage.setItem(%s, %s);" % (json.dumps(k), json.dumps(v)))
            if init:
                await page.add_init_script("if(!sessionStorage.getItem('e2e')){%s sessionStorage.setItem('e2e','1')}" % ''.join(init))
            await page.goto(f'http://127.0.0.1:{PAGE_PORT}{path}')
            await page.wait_for_timeout(2200)
            return ctx, page, errs, calls

        async def snap(page, name):
            n[0] += 1
            await page.screenshot(path=os.path.join(OUT, f'{n[0]:02d}_{name}.png'))

        async def info(page):
            return await page.evaluate('''() => ({ name: S && S.pet && S.pet.name, photo: !!(S && S.pet && S.pet.photo),
                meals: S && S.counts && S.counts.meals, love: S && S.stats && S.stats.love, day: S && S.daily && S.daily.day,
                souv: S && S.souv && S.souv.n,
                server: document.documentElement.dataset.lineServer || null, mode: Persist.mode,
                owner: localStorage.getItem('uchinoko-biyori:line-owner'), guest: !!localStorage.getItem('uchinoko-biyori:line-guest'),
                left: localStorage.getItem('uchinoko-biyori:line-left'),
                onboard: !document.getElementById('onboard').hidden })''')

        async def close_popups(page):
            for _ in range(6):
                await page.wait_for_timeout(500)
                btn = await page.query_selector('.levelup .btn.primary')
                if not btn:
                    return
                await btn.click()

        async def find_modal(page, sel):
            """ほかのお知らせが先に出ていたら、とじてから"""
            for _ in range(10):
                m = await page.query_selector(sel)
                if m:
                    return m
                btn = await page.query_selector('.levelup .btn.primary')
                if btn:
                    await btn.click()
                await page.wait_for_timeout(500)
            return None

        all_errs = []

        print('1. はじめての子（サーバーは空）')
        ctx, page, errs, calls = await open_page('Uone')
        i = await info(page)
        ok(i['onboard'] and i['server'] == 'on', 'はじめての画面のまま、サーバーにつながる', i)
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="shiba"]'); await page.fill('#edName', 'いちばん')
        await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        s = state('Uone')
        ok(s and s['name'] == 'いちばん' and s['rev'] >= 1 and s['photo'] is None and s['love'] == 0, 'むかえた子をサーバーが作る（まっさら・写真なし）', s)
        ok(any('/act' in c for c in calls) and not any(c == 'POST /save' for c in calls), '新しい子は adopt で（セーブ丸ごとは送らない）', calls)
        i = await info(page)
        ok(i['owner'] == s['id'] and i['mode'] == 'cloud', 'この端末のセーブの持ち主が記録される', i)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(document.querySelector('#sheet .line-status')||{}).textContent||''")
        ok(st == 'LINEと つながっています', 'プロフィールの1行', st)
        await snap(page, 'profile_on')
        all_errs += errs; await ctx.close()

        print('2. LINEにまだ子がいない：この端末で遊んだ子は「つれてくる」で（取りこみの1回）')
        ctx, page, errs, calls = await open_page('Utwo', local=sample('ゲスト', photo=True))
        m = await find_modal(page, '.levelup [data-close="take"]')
        ok(m is not None and not any('/act' in c and 'adopt' in c for c in calls), 'つれてくるかを聞く（だまって入れない）', calls)
        if m:
            await snap(page, 'offer_local')
            await m.click(); await page.wait_for_timeout(1800)
        s = state('Utwo')
        ok(s and s['name'] == 'ゲスト' and s['photo'] is None and s['imported'], 'この端末の子が取りこみ口から入る（写真は送らない）', s)
        i = await info(page)
        ok(i['photo'] and i['name'] == 'ゲスト', 'この端末には写真がのこる', i)
        all_errs += errs; await ctx.close()

        print('2b. やめておくと、あたらしい子をむかえる（この端末の子は とっておく）')
        ctx, page, errs, calls = await open_page('Utwob', local=sample('のこす子'))
        m = await find_modal(page, '.levelup [data-close="no"]')
        if m:
            await m.click(); await page.wait_for_timeout(800)
        i = await info(page)
        ok(i['onboard'] and i['guest'] and state('Utwob')['rev'] is None, 'はじめての画面になり、サーバーには まだ子がいない', {'info': i, 'state': state('Utwob')})
        all_errs += errs; await ctx.close()

        print('3. ほかの端末の新しいセーブ（同じ子）')
        dbg('/__debug/bump', {'sub': 'Utwo', 'name': 'ゲストあたらしい'})
        two = state('Utwo')
        local = sample('ゲスト', photo=True); local['created'] = two['created']
        ctx, page, errs, calls = await open_page('Utwo', local=local, owner=two['id'])
        i = await info(page)
        ok(i['name'] == 'ゲストあたらしい' and i['photo'], 'サーバーの子に会える（写真の控えはのこる）', i)
        all_errs += errs; await ctx.close()

        print('4. この端末にいた子（ちがう子）とLINEの子')
        ctx, page, errs, calls = await open_page('Uone', local=sample('この端末の子', created_days=3, photo=True))
        i = await info(page)
        ok(i['name'] == 'いちばん' and i['guest'], 'LINEの子に会い、この端末の子はとっておく', i)
        modal = await find_modal(page, '.levelup [data-close="take"]')
        ok(modal is not None, 'つれてくるかを聞く')
        if modal:
            await snap(page, 'offer_guest')
            await modal.click(); await page.wait_for_timeout(1800)
        s = state('Uone')
        ok(s['name'] == 'この端末の子' and s['imported'], 'つれてきた子がサーバーに入る（取りこみ済み）', s)
        i = await info(page)
        ok(i['name'] == 'この端末の子' and i['photo'], '画面もその子になる（写真の控えものこる）', i)

        print('5. 引っこしコードは1回だけ')
        await close_popups(page)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        await page.click('#mMove'); await page.wait_for_timeout(400)
        note = await page.evaluate("(document.querySelector('#sheet .line-move')||{}).textContent||''")
        ok('受け取りずみ' in note, '受け取りずみの1行', note)
        await page.fill('#mvIn', code_of(sample('コードの子', created_days=50)))
        await page.click('#mvTake'); await page.wait_for_timeout(400)
        err = await page.evaluate("(document.querySelector('#sheet .mverr')||{}).textContent||''")
        ok('1回だけ' in err, '2回目は受け取らない', err)
        await snap(page, 'code_once')
        all_errs += errs; await ctx.close()

        print('6. 引っこしコードで受け取る（はじめて）')
        ctx, page, errs, calls = await open_page('Uthree', local=sample('さんばん'))
        m = await find_modal(page, '.levelup [data-close="no"]')
        if m:
            await m.click(); await page.wait_for_timeout(600)
        await page.click('#obImport'); await page.wait_for_timeout(400)
        note = await page.evaluate("(document.querySelector('#ob .line-move')||{}).textContent||''")
        ok('1回だけ' in note, '1回だけの1行', note)
        await page.fill('#imCode', code_of(sample('コードの子', created_days=50)))
        await page.click('#imGo'); await page.wait_for_timeout(2600)
        s = state('Uthree')
        ok(s['name'] == 'コードの子' and s['imported'], 'コードの子が取りこみ口から入る', s)
        ok(any('/import' in c for c in calls), '/import を使う', calls)

        print('7. おせわはサーバーで（ほかの端末の変化も返事でとどく）')
        await close_popups(page)
        dbg('/__debug/bump', {'sub': 'Uthree', 'name': 'ほかの端末'})
        dbg('/__debug/patch', {'sub': 'Uthree', 'full': 40})
        before = state('Uthree')
        bar = "document.getElementById('bFull').style.width"
        w0 = await page.evaluate(bar)
        await page.click('#actFeed'); await page.wait_for_timeout(1500)
        w1, mid = await page.evaluate(bar), await info(page)
        await page.wait_for_timeout(5500)
        w2 = await page.evaluate(bar)
        ok(mid['meals'] == before['meals'] + 1 and w1 == w0 and w2 != w0,
           'メーターは ごはんの動きが おわってから動く（返事は先に とどいても）', {'w0': w0, 'w1': w1, 'w2': w2, 'meals': mid['meals']})
        await close_popups(page)
        s = state('Uthree')
        i = await info(page)
        ok(s['meals'] == before['meals'] + 1 and i['meals'] == s['meals'], 'ごはんはサーバーが数える（画面も同じ数）', {'before': before, 'after': s, 'info': i})
        ok(i['name'] == 'ほかの端末', 'ほかの端末の名前も返事でとどく', i)
        ok(any(c == 'POST /act' for c in calls[-4:]) and not any(c == 'POST /save' for c in calls[-4:]), '/act だけ（数字は送らない）', calls[-6:])
        await page.focus('#pet')
        for _ in range(6):
            await page.keyboard.press('Enter'); await page.wait_for_timeout(80)
        await page.wait_for_timeout(2500)
        s2 = state('Uthree')
        ok(s2['pets'] == s['pets'] + 1, 'なでなでも手がとまったら サーバーで数える', {'before': s['pets'], 'after': s2['pets']})
        all_errs += errs; await ctx.close()

        print('7b. 端末の時計をずらしても得をしない')
        three = state('Uthree')
        ctx, page, errs, calls = await open_page('Uthree', owner=three['id'], skew_ms=int(3 * 864e5))
        await close_popups(page)
        i = await info(page)
        today = time.strftime('%Y-%m-%d', time.gmtime(time.time() + 9 * 3600))
        ok(i['day'] == today, 'きょうのおねがいは サーバーの日付（日本時間）', {'day': i['day'], 'today': today})
        ok(i['souv'] == 0, 'おみやげは出ない（あけた時間はサーバーの時計で）', i)
        all_errs += errs; await ctx.close()

        print('8. サーバーに届かないとき（ゲストの子）')
        ctx, page, errs, calls = await open_page('Ufour', local=sample('とどかない'), server_down=True)
        i = await info(page)
        ok(i['server'] == 'failed' and i['mode'] == 'local' and i['name'] == 'とどかない', 'この端末に保存して遊べる', i)
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        i2 = await info(page)
        ok(i2['meals'] == i['meals'] + 1, 'ゲストの子は おせわできる', i2)
        await close_popups(page)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(document.querySelector('#sheet .line-status')||{}).textContent||''")
        ok('この端末に ほぞん' in st, 'プロフィールの1行', st)
        await snap(page, 'server_down')
        all_errs += errs; await ctx.close()

        print('8b. サーバーに届かないとき（LINEの子は まってもらう）')
        three = state('Uthree')
        mirror = sample('ほかの端末'); mirror['created'] = three['created']
        ctx, page, errs, calls = await open_page('Uthree', local=mirror, owner=three['id'], server_down=True)
        i = await info(page)
        await page.click('#actFeed'); await page.wait_for_timeout(900)
        wait = await page.query_selector('.levelup [data-close="retry"]')
        ok(wait is not None, '「つながっていません」と もういちど つなぐ', i)
        await snap(page, 'wait_offline')
        if wait:
            await page.click('.levelup [data-close]'); await page.wait_for_timeout(400)
        await page.wait_for_timeout(5000)
        i2 = await info(page)
        ok(i2['meals'] == i['meals'], 'ごはんは あげられない（数字はかわらない）', i2)
        await page.focus('#pet'); await page.keyboard.press('Enter'); await page.wait_for_timeout(1500)
        i3 = await info(page)
        ok(i3['love'] == i['love'], 'なでても なかよしはかわらない', i3)
        all_errs += errs; await ctx.close()

        print('9. 外部ブラウザ')
        ctx, page, errs, calls = await open_page('Ufive', local=sample('そと'), external=True)
        ok(not calls, 'サーバーには何も送らない', calls)
        all_errs += errs; await ctx.close()
        ctx, page, errs, calls = await open_page('Ufive', local=sample('そと'), external=True, owner='someone')
        await page.click('#actFeed'); await page.wait_for_timeout(900)
        ok(await page.query_selector('.levelup .card[aria-label="つながるまで まってね"]') is not None and not calls, 'LINEの子は「LINEの中で ひらいてね」', calls)
        all_errs += errs; await ctx.close()

        print('10. AIの読みとり（LINEの中で、サーバーに つながっているとき）')
        ctx, page, errs, calls = await open_page('Usix')
        note = await page.evaluate("(document.querySelector('#ob .ob-step > p.note:last-child')||{}).textContent||''")
        ok('AIで 読みとるか' in note, 'はじめての画面の ことわりが AI用になる', note)
        await page.set_input_files('#obFile', files=[photo_jpeg()]); await page.wait_for_timeout(1500)
        left = await page.evaluate("(document.querySelector('#aiLeft')||{}).textContent||''")
        ok(await page.query_selector('.aiask #aiGo') is not None and 'あと3回' in left and dbg('/__debug/ai')['calls'] == 0, '送る前に「AIで 読みとる？」と きく（のこり3回）', left)
        await snap(page, 'ai_ask')
        await page.click('#aiGo'); await page.wait_for_timeout(3000)
        a = dbg('/__debug/ai')
        ok(a['calls'] == 1 and a['media'] == 'image/jpeg' and max(a['w'], a['h']) == 768 and a['bytes'] < 300000 and a['used'] == 1,
           '写真は この端末で 768px の JPEG にして送る（サーバーが1回と数える）', a)
        say = await page.evaluate("(document.querySelector('#ob .say p')||{}).textContent||''")
        ok('ポメラニアン' in say and await page.query_selector('#edCands [data-b="pomeranian"]') is not None, '読みとった種類が 候補に出る', say)
        await snap(page, 'ai_result')
        await page.fill('#edName', 'えーあい'); await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        s = state('Usix')
        ok(s and s['name'] == 'えーあい' and s['photo'] is None, 'むかえた子は サーバーに（写真は送らない）', s)
        ok(any(c == 'POST /read' for c in calls), '/read を使う', calls)
        all_errs += errs; await ctx.close()

        print('10b. AIを使わない えらび方・読みとれないとき')
        ctx, page, errs, calls = await open_page('Useven')
        await page.set_input_files('#obFile', files=[photo_jpeg(900, 1400)]); await page.wait_for_timeout(1500)
        await page.click('#aiSelf'); await page.wait_for_timeout(600)
        sub = await page.evaluate("(document.querySelector('#ob .say small')||{}).textContent||''")
        ok('毛の色を ひろいました' in sub and dbg('/__debug/ai')['calls'] == 1, 'AIを使わずに えらぶ（AIには送らない）', sub)
        await page.click('#edBack'); await page.wait_for_timeout(400)
        dbg('/__debug/ai', {'mode': 'down'})
        await page.set_input_files('#obFile', files=[photo_jpeg()]); await page.wait_for_timeout(1500)
        await page.click('#aiGo'); await page.wait_for_timeout(3000)
        sub = await page.evaluate("(document.querySelector('#ob .say small')||{}).textContent||''")
        a = dbg('/__debug/ai')
        ok('うまく 読みとれませんでした' in sub and a['used'] == 1, 'AIに届かないときは 色ひろいへ（回数は もどす）', {'sub': sub, 'ai': a})
        await snap(page, 'ai_fallback')
        dbg('/__debug/ai', {'mode': 'other'})
        await page.click('#edBack'); await page.wait_for_timeout(400)
        await page.set_input_files('#obFile', files=[photo_jpeg()]); await page.wait_for_timeout(1500)
        await page.click('#aiGo'); await page.wait_for_timeout(3000)
        err = await page.evaluate("(document.querySelector('#ob .oberr')||{}).textContent||''")
        ok('犬か猫' in err, '犬や猫が写っていないとき', err)
        dbg('/__debug/ai', {'mode': 'ok'})
        all_errs += errs; await ctx.close()

        print('10c. LINEの外では いままでどおり（AIには送らない）')
        ctx, page, errs, calls = await open_page('Ueight', external=True)
        await page.set_input_files('#obFile', files=[photo_jpeg()]); await page.wait_for_timeout(1500)
        ok(await page.query_selector('.aiask') is None and not calls, 'きかずに 色ひろいへ', calls)
        all_errs += errs; await ctx.close()

        print('11. やめる（LINEの データを けす）')
        ctx, page, errs, calls = await open_page('Unine')
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="shiba"]'); await page.fill('#edName', 'やめるこ')
        await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        await close_popups(page)
        nine = state('Unine')
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        lb = await page.query_selector('#sheet .line-leave')
        ok(lb is not None, 'プロフィールの いちばん下に「LINEの データを けす」')
        await snap(page, 'leave_link')
        if lb:
            await lb.click(); await page.wait_for_timeout(600)
        first = await page.query_selector('.levelup [data-close="next"]')
        ok(first is not None and state('Unine') is not None, '1回目の たしかめ（まだ消さない）')
        await page.click('#lvCopy'); await page.wait_for_timeout(400)
        msg = await page.evaluate("(document.querySelector('#lvMsg')||{}).textContent||''")
        code = await page.evaluate("(document.querySelector('#lvCode')||{}).value||''")
        ok('コピー' in msg and code.startswith('UCHINOKO2:'), 'さきに 引っこしコードを コピーできる', msg)
        await snap(page, 'leave_confirm')
        if first:
            await first.click(); await page.wait_for_timeout(600)
        second = await page.query_selector('.levelup [data-close="yes"]')
        ok(second is not None and state('Unine') is not None, '2回目の たしかめ（まだ消さない）')
        await snap(page, 'leave_confirm2')
        if second:
            await second.click(); await page.wait_for_timeout(2500)
        L = dbg('/__debug/line')
        ok(state('Unine') is None and L['deauth'] == 1 and L['token'] == 'e2e-access-token', 'サーバーの データが すぐに消え、LINE の許可も取り消す', L)
        i = await info(page)
        ok(i['server'] == 'left' and i['mode'] == 'local' and i['name'] == 'やめるこ' and i['owner'] == nine['id'] and i['left'] == nine['id'],
           'この端末の子は のこり、ゲストに（line-owner は消さない）', i)
        done = await page.query_selector('.levelup .card[aria-label="けしました"]')
        ok(done is not None, '「けしました」のお知らせ')
        await snap(page, 'leave_done')
        if done:
            await page.click('.levelup [data-close]'); await page.wait_for_timeout(500)
        n_calls = len(calls)
        await page.evaluate("S.stats.full = 40")   # さっき ごはんを あげたので、おなかを すかせておく
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        await close_popups(page)
        i2 = await info(page)
        ok(i2['meals'] == i['meals'] + 1 and len(calls) == n_calls, 'やめたあとは ゲストとして おせわできる（サーバーには送らない）', {'calls': calls[n_calls:], 'meals': [i['meals'], i2['meals']]})
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(document.querySelector('#sheet .line-status')||{}).textContent||''")
        ok('けしました' in st and await page.query_selector('#sheet .line-leave') is None, 'プロフィールの1行（けすボタンは もう出ない）', st)
        await snap(page, 'leave_profile')
        keep = await page.evaluate("() => { const o = {}; for (const k of ['uchinoko-biyori:v1','uchinoko-biyori:line-owner','uchinoko-biyori:line-left']) o[k] = localStorage.getItem(k); return o; }")
        all_errs += errs; await ctx.close()

        print('11b. また LINEで ひらくと、この端末の子を つれてくるか きく')
        ctx, page, errs, calls = await open_page('Unine', keys=keep)
        m = await find_modal(page, '.levelup [data-close="take"]')
        again = state('Unine')
        ok(m is not None and again is not None and again['id'] != nine['id'] and again['rev'] is None, 'あたらしい会員になり「つれてくる？」をきく', again)
        if m:
            await m.click(); await page.wait_for_timeout(1800)
        s = state('Unine')
        ok(s and s['name'] == 'やめるこ' and s['imported'], 'つれてくると、またLINEの子になる', s)
        i = await info(page)
        ok(i['owner'] == s['id'] and i['server'] == 'on', 'この端末のセーブは あたらしい会員のものに', i)
        all_errs += errs; await ctx.close()

        print('12. LINEに子がいるとき「新しい子をむかえる」')
        ctx, page, errs, calls = await open_page('Uten')
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="shiba"]'); await page.fill('#edName', 'もとのこ')
        await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        await page.click('#actFeed'); await page.wait_for_timeout(7000)
        await close_popups(page)
        old = state('Uten')
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        await page.click('#mNew'); await page.wait_for_timeout(300)
        await page.click('#mYes'); await page.wait_for_timeout(600)
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="pomeranian"]'); await page.fill('#edName', 'あたらしいこ')
        await page.click('#edGo'); await page.wait_for_timeout(3500)
        await close_popups(page)
        s, i = state('Uten'), await info(page)
        ok(old['meals'] == 1 and s['name'] == 'あたらしいこ' and s['meals'] == 0 and s['love'] == 0 and s['created'] > old['created'],
           'サーバーも まっさらの 新しい子になる（前の子の なかよしは のこらない）', {'old': old, 'new': s})
        ok(i['name'] == 'あたらしいこ' and i['meals'] == 0 and i['love'] == 0, '画面も 新しい子のまま（前の子に もどらない）', i)
        await page.reload(); await page.wait_for_timeout(2500)
        await close_popups(page)
        i = await info(page)
        ok(i['name'] == 'あたらしいこ' and i['meals'] == 0, 'ひらきなおしても 新しい子', i)

        print('12b. LINEに子がいるとき、引っこしシートで コードを受け取る（はじめての取りこみ）')
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        await page.click('#mMove'); await page.wait_for_timeout(400)
        await page.fill('#mvIn', code_of(sample('コードの子', created_days=40)))
        await page.click('#mvTake'); await page.wait_for_timeout(400)
        yes = await page.query_selector('#mvYes')
        if yes:
            await yes.click(); await page.wait_for_timeout(3500)
        await close_popups(page)
        s, i = state('Uten'), await info(page)
        ok(yes is not None and s['name'] == 'コードの子' and s['imported'] and i['name'] == 'コードの子', 'コードの子が サーバーに入り、画面も その子のまま', {'state': s, 'info': i})
        all_errs += errs; await ctx.close()

        print('13. 内部チャネルごとの画面（本番用＝/、審査用＝/review/、開発用＝/dev/）')
        want = {'/': ('prod', '2012410265-PutgsCLS'), '/review/': ('review', '2012410264-JD4WhzAb'), '/dev/': ('dev', '2012410263-cuCI7vQS')}
        for path, (ch, lid) in want.items():
            ctx, page, errs, calls = await open_page('Uten', path=path)
            await page.click('#menuBtn'); await page.wait_for_timeout(500)
            g = await page.evaluate('''() => ({ liff: window.__liffId, ch: document.documentElement.dataset.lineCh, server: document.documentElement.dataset.lineServer,
                status: (document.querySelector('#sheet .line-status') || {}).textContent || '', docs: LineDocs.url('privacy'),
                icon: document.querySelector('link[rel=icon]').href, name: S && S.pet && S.pet.name })''')
            label = (g['status'] or '').startswith('［開発用］') if ch == 'dev' else not (g['status'] or '').startswith('［')
            ok(g['liff'] == lid and g['ch'] == ch and g['server'] == 'on' and g['name'] == 'コードの子' and label
               and g['docs'] == f'http://127.0.0.1:{PAGE_PORT}/privacy.html' and g['icon'] == f'http://127.0.0.1:{PAGE_PORT}/favicon-32.png',
               f'{path} は {ch} の LIFF ID で ひらき、同じ会員の子・ポリシーは いちばん上', g)
            await snap(page, 'channel_' + ch)
            all_errs += errs; await ctx.close()

        print('14. 写真立て（写真の控えがない子は イラスト）')
        frame_js = '''() => { const f = document.getElementById('frame'), a = f.querySelector('.frame-art');
            return { shown: !f.hidden && getComputedStyle(f).display !== 'none', art: !!a && !a.hidden && f.classList.contains('art'),
                     img: getComputedStyle(document.getElementById('frameImg')).display !== 'none', svg: !!(a && a.querySelector('svg.pet-svg')),
                     wear: !!(a && a.querySelector('.pv-neck *')), k: a ? a.dataset.k : null }; }'''
        ctx, page, errs, calls = await open_page('Uten')   # この端末に写真の控えがない LINEの子
        f = await page.evaluate(frame_js)
        ok(f['shown'] and f['art'] and f['svg'] and not f['img'] and not f['wear'], 'LINEの子（写真の控えなし）は 写真立てに イラスト（きせかえなし）', f)
        await snap(page, 'frame_art')
        all_errs += errs; await ctx.close()
        ctx, page, errs, calls = await open_page('Uframe', local=sample('しゃしんの子', photo=True), external=True)
        f = await page.evaluate(frame_js)
        ok(f['shown'] and f['img'] and not f['art'], '写真の控えがある子は いままでどおり写真', f)
        all_errs += errs; await ctx.close()
        ctx, page, errs, calls = await open_page('Uframe', local=sample('しゃしんなし'), external=True)
        f = await page.evaluate(frame_js)
        await page.evaluate("() => { S.pet.look = { species:'dog', breedId:'shiba' }; Game.refresh(); }")
        g = await page.evaluate(frame_js)
        ok(f['shown'] and f['art'] and g['art'] and g['k'] != f['k'] and 'shiba' in (g['k'] or ''), 'ゲストの写真なしの子も イラスト。みためが かわると かきなおす', {'before': f, 'after': g})
        all_errs += errs; await ctx.close()

        print('15. うちのこカード（プロフィールから おくる）')
        cards = lambda body=None: dbg('/__debug/cards', body)
        ctx, page, errs, calls = await open_page('Ucard')
        await page.click('#obManual'); await page.wait_for_timeout(300)
        await page.click('[data-g="pomeranian"]'); await page.fill('#edName', 'カードのこ')
        await page.click('#edGo'); await page.wait_for_timeout(2600)
        await close_popups(page)
        me = state('Ucard')
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        pos = await page.evaluate("() => { const c = document.getElementById('mCard'); return c ? { next: c.nextElementSibling && c.nextElementSibling.id, text: c.textContent } : null; }")
        ok(pos is not None and pos['next'] == 'mMove' and pos['text'] == 'うちのこカードを おくる', 'プロフィールの「引っこし・バックアップ」の上に「うちのこカードを おくる」', pos)
        await snap(page, 'card_button')

        async def open_card():
            await page.click('#menuBtn'); await page.wait_for_timeout(400)
            await page.click('#mCard'); await page.wait_for_timeout(1500)
            return await page.query_selector('.levelup .cardprev')

        async def send_card(wait=2500):
            await page.click('.levelup [data-close="send"]'); await page.wait_for_timeout(wait)
            return await page.evaluate("() => ({ shared: (window.__shared || []).length, toast: document.getElementById('toast').textContent, left: LineServer.card && LineServer.card.left })")

        await page.click('#mCard'); await page.wait_for_timeout(1500)
        pv = await page.evaluate("""() => { const i = document.querySelector('.levelup .cardprev .cardimg img');
            return i ? { w: i.naturalWidth, h: i.naturalHeight, png: i.src.startsWith('data:image/png;base64,'), left: (document.getElementById('cdLeft') || {}).textContent || '' } : null; }""")
        ok(pv and pv['w'] == 768 and pv['h'] == 1024 and pv['png'] and 'あと3まい' in pv['left'], '見本：この端末で作った たて長の PNG と のこりの枚数（まだ送らない）', pv)
        ok(not cards()['rows'] and not any(x.startswith('POST /card') for x in calls), '見本のあいだは サーバーに 送らない', calls[-3:])
        await snap(page, 'card_preview')
        r = await send_card()
        shared = await page.evaluate('window.__shared')
        c = cards()
        m = shared[0]['m'][0] if shared else {}
        cont = m.get('contents', {})
        hero, body, foot = cont.get('hero', {}), cont.get('body', {}), cont.get('footer', {})
        texts = json.dumps(body, ensure_ascii=False)
        url = hero.get('url', '')
        ok(r['shared'] == 1 and m.get('type') == 'flex' and m.get('altText') == 'カードのこの うちのこカードが とどいたよ' and cont.get('type') == 'bubble',
           'おくる → シェアターゲットピッカーに Flex Message（バブル1つ・トークの一覧の文）', m.get('altText'))
        ok(url.startswith('https://ftakgswltcavwixqxpzi.supabase.co/storage/v1/object/public/cards/') and hero.get('aspectRatio') == '3:4' and hero.get('size') == 'full'
           and hero.get('aspectMode') == 'cover' and 'action' not in hero, 'ヒーローに カードの絵（Storage の公開URL、3:4、アクションなし）', hero)
        ok('カードのこ' in texts and 'ポメラニアン' in texts and 'なかよし' in texts and 'Lv 1・はじめまして' in texts and 'きてから' in texts and '"1日"' in texts,
           '本文：名前・種類・なかよし・（れんぞくが1日までは）きてから', texts[:300])
        btn = body.get('contents', [{}])[-1].get('contents', [{}])[0]
        ok(btn.get('style') == 'primary' and btn.get('action', {}).get('uri') == 'https://miniapp.line.me/2012410265-PutgsCLS' and btn['action'].get('label') == 'うちのこ日和で あそぶ',
           'ボタンは 本番用の LIFF URL（開発用から送っても）', btn)
        frow = (foot.get('contents') or [{}, {}])[1].get('contents', [])
        ok(len(frow) == 3 and frow[0].get('url') == 'https://uchinoko-biyori.pages.dev/line-icon.png' and frow[1].get('text') == 'うちのこ日和'
           and frow[2].get('url') == 'https://vos.line-scdn.net/service-notifier/footer_go_btn.png' and frow[2].get('action', {}).get('uri') == 'https://miniapp.line.me/2012410265-PutgsCLS',
           '下の行：アイコン・名前・矢印（本番用）', frow)
        obj = c['objects'][0] if c['objects'] else {}
        ok(len(c['rows']) == 1 and c['rows'][0]['member'] == me['id'] and len(c['objects']) == 1 and obj.get('w') == 768 and obj.get('h') == 1024 and not obj.get('text')
           and url.endswith('/' + obj.get('name', '-')) and c['key'] == 'sb_secret_e2e', 'サーバーが PNG を確かめて Storage に置く（768×1024、文字のチャンクなし）', c)
        ok(r['left'] == 2 and 'おくったよ' in r['toast'], 'おくったら「カードを おくったよ」・のこり2まい', r)
        await snap(page, 'card_sent')
        await open_card()
        r = await send_card()
        shared = await page.evaluate('window.__shared')
        c = cards()
        ok(r['shared'] == 2 and shared[1]['m'][0]['contents']['hero']['url'] == url and len(c['rows']) == 1 and c['puts'] == 1 and r['left'] == 2,
           '同じ絵は つくりなおさず、枚数にも 数えない（前の URL）', {'puts': c['puts'], 'left': r['left']})
        cards({'mode': 'down'})
        await page.evaluate("() => { S.room.rug = 'stripe'; }")
        await open_card()
        r = await send_card()
        cards({'mode': 'ok'})
        ok(r['shared'] == 2 and 'おくれませんでした' in r['toast'] and r['left'] == 2 and len(cards()['rows']) == 1,
           'Storage に 置けないときは「いまは カードを おくれませんでした」（送らない・枚数は もどる）', r)
        for rug in ('pink', 'mint'):
            await page.evaluate("rug => { S.room.rug = rug; }", rug)   # ちがう絵にする（この端末の S だけ）
            await open_card()
            r = await send_card()
        c = cards()
        ok(len(c['rows']) == 3 and r['left'] == 0 and r['shared'] == 4, 'ちがう絵は 1まいずつ 数える（1日3まい）', {'rows': len(c['rows']), 'left': r['left']})
        await page.evaluate("() => { S.room.rug = 'sun'; }")
        pv = await open_card()
        lt = await page.evaluate("(document.getElementById('cdLeft') || {}).textContent || ''")
        r = await send_card()
        ok(pv is not None and 'つかいきりました' in lt and r['shared'] == 4 and 'つかいきりました' in r['toast'] and len(cards()['rows']) == 3,
           '4まいめは「つかいきりました」（送らない）', {'left': lt, 'toast': r['toast']})
        await snap(page, 'card_limit')
        await page.evaluate("() => { S.room.rug = 'mint'; window.__stpCancel = true; }")   # 前に作った絵なら、上限のあとも送れる
        await open_card()
        r = await send_card()
        ok(r['shared'] == 5 and 'おくったよ' not in r['toast'] and len(cards()['rows']) == 3, '前に作った絵は 上限のあとも送れる／えらばずに とじたら なにも言わない', r)
        await open_card()
        await page.click('.levelup [data-close]'); await page.wait_for_timeout(600)
        r = await page.evaluate("(window.__shared || []).length")
        ok(r == 5, '「やめておく」なら 送らない', r)
        await page.evaluate("() => { window.__stpCancel = false; window.__noStp = true; }")
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        ok(await page.query_selector('#mCard') is None, 'この LINE で シェアが使えないときは ボタンを出さない')
        await page.click('#sheet [data-close]'); await page.wait_for_timeout(300)
        await page.evaluate("() => { window.__noStp = false; }")
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        await page.click('#sheet .line-leave'); await page.wait_for_timeout(600)
        await page.click('.levelup [data-close="next"]'); await page.wait_for_timeout(600)
        await page.click('.levelup [data-close="yes"]'); await page.wait_for_timeout(2500)
        c = cards()
        ok(state('Ucard') is None and not c['rows'] and not c['objects'], '「LINEの データを けす」と カードの画像も すぐ消える', c)
        await page.click('.levelup [data-close]'); await page.wait_for_timeout(500)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        ok(await page.query_selector('#mCard') is None, 'けしたあと（ゲスト）は ボタンを出さない')
        all_errs += errs; await ctx.close()
        ctx, page, errs, calls = await open_page('Ucard2', local=sample('そとのこ'), external=True)
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        ok(await page.query_selector('#mCard') is None, 'LINEの外では ボタンを出さない')
        all_errs += errs; await ctx.close()

        print('16. IDトークンが 切れたら、LIFF の とっておきを けして LIFF URL から 1回だけ ひらきなおす（3-1・4-3）')
        reopens = lambda calls: [c for c in calls if c.startswith('REOPEN')]
        good, stale = json.dumps(token('Uexp')), json.dumps(token('Uexp', 'expired'))
        ctx, page, errs, calls = await open_page('Uexp', id_token="(location.search.indexOf('fresh')>=0&&localStorage.getItem('e2e-logout'))?%s:%s" % (good, stale))
        await page.wait_for_timeout(2500)
        i = await info(page)
        logout = await page.evaluate("localStorage.getItem('e2e-logout')")
        ok(len(reopens(calls)) == 1 and reopens(calls)[0].endswith('miniapp.line.me/2012410265-PutgsCLS'), 'LIFF URL（この画面の LIFF ID）から 1回 ひらきなおす', calls)
        ok(logout == '1' and i['server'] == 'on', 'liff.logout で とっておきを けしてから ひらき、新しいトークンで つながる', {'logout': logout, 'info': i})
        all_errs += errs; await ctx.close()

        bad = json.dumps(token('Ubad', 'bad'))
        ctx, page, errs, calls = await open_page('Ubad', local=sample('たしかめ'), id_token=bad, path='/dev/')
        await page.wait_for_timeout(2500)
        i = await info(page)
        ok(len(reopens(calls)) == 1 and reopens(calls)[0].endswith('miniapp.line.me/2012410263-cuCI7vQS') and i['server'] == 'failed' and i['mode'] == 'local',
           'ひらきなおしても とおらないときは くりかえさない（開発用の LIFF ID・この端末で あそべる）', {'calls': calls, 'info': i})
        await page.click('#menuBtn'); await page.wait_for_timeout(400)
        st = await page.evaluate("(()=>{const p=document.querySelector('#sheet .line-status')||{};return [p.textContent||'', (p.dataset||{}).why||'']})()")
        ok('badtoken' not in st[0] and 'ひらきなおして' in st[0] and st[1] == 'badtoken', 'プロフィールの1行は やさしい ことば（合図は data-why に）', st)
        await snap(page, 'token_bad')
        all_errs += errs; await ctx.close()

        # ひらいたまま つぎの日：セッション（24時間）が切れ、IDトークン（1時間）も切れている
        one = state('Uone')
        good1, stale1 = json.dumps(token('Uone')), json.dumps(token('Uone', 'expired'))
        ctx, page, errs, calls = await open_page('Uone', owner=one['id'],
                                                 id_token="(localStorage.getItem('e2e-stale')&&location.search.indexOf('fresh')<0)?%s:%s" % (stale1, good1))
        await close_popups(page)
        i = await info(page)
        dbg('/__debug/drop-sessions', {})
        await page.evaluate("localStorage.setItem('e2e-stale','1')")
        await page.click('#actFeed'); await page.wait_for_timeout(4500)
        i2 = await info(page)
        ok(i['server'] == 'on' and len(reopens(calls)) == 1 and i2['server'] == 'on' and i2['name'] == one['name'],
           'ひらいたまま セッションが切れても、1回 ひらきなおして また つながる', {'before': i, 'after': i2, 'calls': calls[-6:]})
        all_errs += errs; await ctx.close()

        await browser.close()
    httpd.shutdown()
    print(f'page errors: {len(all_errs)}')
    for e in all_errs:
        print('  ' + e)
    return not fails and not all_errs


def main():
    if not os.path.exists(os.path.join(BIN, 'deno')):
        raise SystemExit('tools/server で npm install をしてください（Deno と PGlite）')
    if not os.path.exists(os.path.join(ROOT, 'src', 'out', 'line', 'index.html')):
        raise SystemExit('先に sh src/build.sh をしてください')
    with open(CFG, 'w') as fh:   # ためしでは game.js を手元のファイルから読む
        json.dump({'imports': {'uchinoko-game': './game.js'}}, fh)
    try:
        print('ルールの確認（rules_test.mjs）')
        r = subprocess.run(['node', os.path.join(ROOT, 'tools', 'rules_test.mjs')], capture_output=True, text=True, timeout=120)
        rules_ok = r.returncode == 0
        print(r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[-2000:])
        if not rules_ok:
            print(r.stdout[-4000:], r.stderr[-2000:])
        print('サーバーの確認（api_test.ts）')
        api_ok = run_api_test() and rules_ok
        print('LINE版の画面とサーバーの通し確認')
        db, db_port = start_db()
        srv_port = free_port()
        srv = subprocess.Popen(deno(os.path.join(TOOLS, 'e2e_server.ts'), FN, MIG, str(srv_port)), env=env(db_port),
                               stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
        try:
            for line in srv.stdout:
                if 'e2e server ready' in line:
                    break
            else:
                raise SystemExit('e2e のサーバーが起動しませんでした')
            threading.Thread(target=lambda: [print('  [server] ' + l.rstrip()) for l in srv.stdout if 'error' in l.lower()], daemon=True).start()
            e2e_ok = asyncio.run(browser_tests(srv_port))
        finally:
            srv.terminate(); db.terminate()
    finally:
        os.remove(CFG)
    print('\nall passed' if api_ok and e2e_ok else '\nFAILED')
    return 0 if api_ok and e2e_ok else 1


if __name__ == '__main__':
    sys.exit(main())
