/* うちのこ日和: offline cache */
const CACHE = 'uchinoko-__VER__';
const PREFIX = 'uchinoko-';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'favicon-32.png', 'favicon-64.png'];
const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com'];
const SCOPE = self.registration.scope;                /* e.g. https://y-s-apps.github.io/uchinoko-biyori/ */
const APP_PAGES = [SCOPE, SCOPE + 'index.html'];      /* the only pages kept for offline use */

/* our own folder, same-origin, a real 200 answer that was not redirected */
const keepable = res => res && res.ok && res.type === 'basic' && !res.redirected;

self.addEventListener('install', e => {
  /* skip the browser's HTTP cache so a new version never stores an older copy */
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(CORE.map(u => new Request(u, { cache:'reload' }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  /* y-s-apps.github.io is shared by every Pages site of this account: only clear our own old caches */
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith(PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const url = new URL(r.url);

  if (r.mode === 'navigate'){
    /* other pages in this folder (README, docs, …) are left to the browser and never replace the app */
    if (!APP_PAGES.includes(url.origin + url.pathname)) return;
    e.respondWith(fetch(r).then(res => {
      const html = (res.headers.get('content-type') || '').startsWith('text/html');
      if (keepable(res) && html){ const cp = res.clone(); caches.open(CACHE).then(c => c.put('index.html', cp)); }
      /* the site is gone or broken (404 after the repository moves, 5xx): open the saved copy,
         so the pet and its move code stay reachable from the old home-screen app */
      if (res.status >= 400) return caches.match('index.html').then(hit => hit || res);
      return res;
    }).catch(() => caches.match('index.html').then(hit => hit || Response.error())));
    return;
  }

  const mine = url.href.startsWith(SCOPE);
  const font = FONT_HOSTS.includes(url.hostname);
  if (!mine && !font) return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => {
      /* the font stylesheet is loaded without CORS, so its answer is opaque: allowed for the font hosts only */
      if (mine ? keepable(res) : (res.ok || res.type === 'opaque')){ const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => hit || Response.error());
    return hit || net;
  }));
});
