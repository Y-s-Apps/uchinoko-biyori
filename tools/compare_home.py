#!/usr/bin/env python3
"""ホーム画面版の動きが変わっていないかを、前の版と比べて確かめる。

  python3 tools/compare_home.py            # いまの index.html と、HEAD の index.html を比べる
  python3 tools/compare_home.py <コミット>  # そのコミットの index.html と比べる

両方の版を、同じ時計（Playwright の clock）と同じ乱数（Math.random を固定の列にする）で開き、
同じ順に おせわをして（記念日・季節のイベント・おみやげ・おたすけのピンチが出る日、ごはん・おやつ・あそぶ・げい・なでる・
もようがえ・きせかえ、つぎの日に開き直す）、最後のセーブ（S）をくらべる。
時刻（last・updated・アルバムの t・おやつの時刻）は、動きのタイミングでずれてよいので、くらべない。
"""
import asyncio, calendar, datetime, functools, http.server, json, os, socketserver, subprocess, sys, tempfile, threading, time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DAY = 864e5
# 2026-12-05 13:00 日本時間（クリスマスの期間・昼）
T0 = calendar.timegm(time.strptime('2026-12-05 04:00:00', '%Y-%m-%d %H:%M:%S')) * 1000

SEEDED = '''(() => { let a = 20261106; Math.random = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();'''


def day_key(ms):
    return time.strftime('%Y-%m-%d', time.gmtime(ms / 1000 + 9 * 3600))


def save():
    created = T0 - 365 * DAY            # 1年まえの きょう：記念日、7〜300日のアルバム
    return {
        'v': 1,
        'pet': {'name': 'くらべ', 'species': 'dog', 'breedId': 'pomeranian', 'colorName': 'クリーム',
                'look': {'species': 'dog', 'breedId': 'pomeranian'}, 'photo': None,
                'wear': {'head': None, 'face': None, 'neck': 'scarf_tri'}},
        'stats': {'full': 50, 'mood': 70, 'love': 1515},
        'counts': {'meals': 10, 'treats': 5, 'pets': 20, 'plays': 4},
        'recentTreats': [], 'last': T0 - 5 * 3600e3, 'created': created, 'updated': T0 - 5 * 3600e3,
        'tricks': {'sit': {'p': 3, 'ok': True}, 'paw': {'p': 5, 'ok': True}},
        # きょうのおねがい（ごはん1つ・おやつ・なでなで9/10）、おとといまで5日れんぞく → きょうは おたすけ
        'daily': {'day': day_key(T0), 'list': [{'type': 'meal', 'n': 2, 'got': 1, 'done': False},
                                               {'type': 'treat', 'n': 1, 'got': 0, 'done': False},
                                               {'type': 'pet', 'n': 10, 'got': 9, 'done': False}], 'all': False},
        'stamps': [day_key(T0 - k * DAY) for k in range(2, 7)],
        'streak': {'last': day_key(T0 - 2 * DAY), 'n': 5, 'best': 5}, 'rescued': [],
        'souv': {'have': {'stone': 2}, 'day': day_key(T0), 'n': 3},
        'events': {'got': [], 'seen': {}}, 'album': [], 'milestones': {}, 'trickDay': {'day': None, 'love': 0},
    }


def serve(root):
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=root)
    handler.log_message = lambda *a, **k: None
    httpd = socketserver.TCPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, httpd.server_address[1]


async def run(browser, root, label):
    httpd, port = serve(root)
    ctx = await browser.new_context(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True,
                                    timezone_id='Asia/Tokyo', locale='ja-JP')
    page = await ctx.new_page()
    errs = []
    page.on('pageerror', lambda e: errs.append(str(e)))
    at = lambda ms: datetime.datetime.fromtimestamp(ms / 1000, datetime.timezone.utc)
    await page.clock.install(time=at(T0))
    await page.clock.pause_at(at(T0))
    await page.add_init_script(SEEDED)
    await page.add_init_script("if(location.protocol==='http:'&&!sessionStorage.getItem('cmp')){localStorage.setItem('uchinoko-biyori:v1', %s);sessionStorage.setItem('cmp','1')}"
                               % json.dumps(json.dumps(save(), ensure_ascii=False)))
    log = []

    async def tick(ms):
        await page.clock.run_for(ms)
        await page.wait_for_timeout(30)

    async def popups():
        for _ in range(12):
            await tick(1500)
            card = await page.query_selector('.levelup .card')
            if not card:
                return
            log.append(await card.get_attribute('aria-label'))
            btn = await page.query_selector('.levelup .btn.primary')
            await btn.click()
            await tick(400)
            if await page.query_selector('#sheetWrap.open'):
                await page.click('#sheet [data-close]')

    def step(name):
        print(f'  [{label}] {name}', flush=True)

    async def act(sel, wait=9000):
        await page.click(sel)
        await tick(wait)
        await popups()

    await page.route('https://fonts.googleapis.com/**', lambda r: r.abort())
    await page.route('https://fonts.gstatic.com/**', lambda r: r.abort())
    step('open')
    await page.goto(f'http://127.0.0.1:{port}/', wait_until='domcontentloaded')
    await tick(2000)
    await popups()                                   # 記念日・クリスマス（つけてみる）・おみやげ・おたすけのピンチ
    step('feed'); await act('#actFeed')
    step('treat')
    await page.click('#actTreat'); await tick(500)
    await page.click('#sheet [data-t]:not([aria-disabled="true"]) >> nth=1'); await tick(9000); await popups()
    step('play')
    for _ in range(3):
        await act('#actPlay')
    for _ in range(3):
        await page.click('#actTrick'); await tick(500)
        await page.click('#sheet [data-tk="paw"]'); await tick(7000); await popups()
    step('stroke')
    for _ in range(14):                              # なでる（キーボードの Enter はなでる1回）
        await page.focus('#pet'); await page.keyboard.press('Enter'); await tick(120)
    await tick(1500); await popups()
    await page.click('#actDress'); await tick(400)
    await page.click('[data-slot="room"]'); await tick(300)
    await page.click('#sheet [data-rd="pink_heart"]'); await tick(800)
    await page.click('#sheet [data-rc="rug"]'); await tick(300)
    await page.click('#sheet [data-rd="tricolore"]'); await tick(800)
    await page.click('#sheet [data-season="0"]'); await tick(300)
    await page.click('[data-slot="neck"]'); await tick(300)
    await page.click('#sheet [data-w="bandana_red"]'); await tick(800)
    await page.click('#sheet [data-close]'); await tick(500); await popups()
    # つぎの日に、5時間あけて開き直す（おみやげ、新しいおねがい、れんぞく）
    end = await page.evaluate('() => Date.now()')
    await page.goto('about:blank')
    await page.clock.pause_at(at(end + DAY + 2 * 3600e3))
    step('next day')
    await page.goto(f'http://127.0.0.1:{port}/', wait_until='domcontentloaded'); await tick(2000); await popups()
    await act('#actFeed')
    st = await page.evaluate('() => JSON.parse(JSON.stringify(S))')
    await ctx.close(); httpd.shutdown()
    return st, log, errs


def norm(st):
    o = json.loads(json.dumps(st))
    for k in ('last', 'updated'):
        o.pop(k, None)
    o['stats'] = {k: round(v, 1) for k, v in o['stats'].items()}
    o['recentTreats'] = len(o.get('recentTreats') or [])
    o['album'] = sorted((a['k'], a['ti'], a['su'], a['ic']) for a in o.get('album') or [])
    o['events']['seen'] = sorted(o['events']['seen'])
    return o


def diff(a, b, path=''):
    out = []
    if isinstance(a, dict) and isinstance(b, dict):
        for k in sorted(set(a) | set(b)):
            out += diff(a.get(k, '(なし)'), b.get(k, '(なし)'), f'{path}.{k}')
    elif isinstance(a, list) and isinstance(b, list) and len(a) == len(b):
        for i, (x, y) in enumerate(zip(a, b)):
            out += diff(x, y, f'{path}[{i}]')
    elif isinstance(a, float) or isinstance(b, float):
        if not (isinstance(a, (int, float)) and isinstance(b, (int, float)) and abs(a - b) <= .15):
            out.append(f'{path}: {a!r} → {b!r}')
    elif a != b:
        out.append(f'{path}: {json.dumps(a, ensure_ascii=False)[:160]} → {json.dumps(b, ensure_ascii=False)[:160]}')
    return out


async def main():
    from playwright.async_api import async_playwright
    ref = sys.argv[1] if len(sys.argv) > 1 else 'HEAD'
    old = tempfile.mkdtemp()
    html = subprocess.run(['git', '-C', ROOT, 'show', f'{ref}:index.html'], capture_output=True, check=True).stdout
    with open(os.path.join(old, 'index.html'), 'wb') as fh:
        fh.write(html)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        a, la, ea = await run(browser, old, 'old')
        b, lb, eb = await run(browser, ROOT, 'new')
        await browser.close()
    print('まえの版のポップアップ：', la)
    print('いまの版のポップアップ：', lb)
    d = diff(norm(a), norm(b))
    errs = ea + eb
    for e in errs:
        print('page error:', e)
    print(f'なかよし {a["stats"]["love"]} / {b["stats"]["love"]}、スタンプ {len(a["stamps"])} / {len(b["stamps"])}、'
          f'れんぞく {a["streak"]} / {b["streak"]}、おみやげ {a["souv"]["have"]} / {b["souv"]["have"]}')
    print(f'きせかえ {b["pet"]["wear"]}、おへや {b["room"]}、おねがい {[(r["type"], r["got"], r["n"]) for r in b["daily"]["list"]]}、'
          f'アルバム {len(b["album"])}件、げい {b["tricks"]}、回数 {b["counts"]}')
    if la != lb:
        d.append(f'ポップアップの順：{la} → {lb}')
    for line in d:
        print('  ちがい ' + line)
    print('おなじ' if not d and not errs else 'ちがいあり')
    return 1 if d or errs else 0


if __name__ == '__main__':
    sys.exit(asyncio.run(main()))
