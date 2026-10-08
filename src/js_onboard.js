/* ===== onboarding: photo → breed & colours → name ===== */
const CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.3l1.4-2h5.6l1.4 2h1.3A2.5 2.5 0 0 1 20 8.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12.5" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const PAW = '<svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="16" rx="5" ry="4.2" fill="var(--mint)"/><circle cx="6" cy="10" r="2.2" fill="var(--mint)"/><circle cx="10" cy="6.5" r="2.2" fill="var(--mint)"/><circle cx="14" cy="6.5" r="2.2" fill="var(--mint)"/><circle cx="18" cy="10" r="2.2" fill="var(--mint)"/></svg>';
const SAMPLE_A = { species:'dog', breedId:'pomeranian', ear:'small', coat:'fluffy', muzzle:'short', tail:'plume', face:'muzzle', colors:{ main:'#FBF8F4' } };
const SAMPLE_B = { species:'cat', breedId:'hachiware' };

let samplerP = null;
function getImageSampler(){
  if (!samplerP) samplerP = (async () => {
    const s = await useCap('sample');
    if (!s) return null;
    try { const lim = await s.limits(); return lim && lim.images ? s : null; } catch(e){ return null; }
  })();
  return samplerP;
}

/* photos are dimmer and greyer than the illustrations: lift and warm up real fur colours */
function cutify(hex){
  let [r, g, b] = hexToRgb(hex).map(v => v / 255);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, dd = mx - mn;
  let h = 0, sat = 0;
  if (dd){
    sat = dd / (1 - Math.abs(2 * l - 1));
    h = mx === r ? ((g - b) / dd) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4;
    h *= 60; if (h < 0) h += 360;
  }
  const L2 = Math.min(.95, l + (1 - l) * .25);
  const S2 = sat > .12 ? Math.min(.85, sat * 1.45) : sat;
  const C = (1 - Math.abs(2 * L2 - 1)) * S2, X = C * (1 - Math.abs((h / 60) % 2 - 1)), m0 = L2 - C / 2;
  const [r1, g1, b1] = h < 60 ? [C, X, 0] : h < 120 ? [X, C, 0] : h < 180 ? [0, C, X] : h < 240 ? [0, X, C] : h < 300 ? [X, 0, C] : [C, 0, X];
  return rgbToHex((r1 + m0) * 255, (g1 + m0) * 255, (b1 + m0) * 255);
}
function dominantColors(cv){
  // centre-weighted colour histogram: the animal is usually in the middle, the floor at the edges
  const n = 48, t = document.createElement('canvas');
  t.width = n; t.height = n;
  const w = cv.width, h = cv.height, side = Math.min(w, h) * .8;
  const ctx = t.getContext('2d');
  ctx.drawImage(cv, (w - side) / 2, (h - side) / 2, side, side, 0, 0, n, n);
  const d = ctx.getImageData(0, 0, n, n).data, buckets = {}, sig = n * .22;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++){
    const i = (y * n + x) * 4, r = d[i], g = d[i + 1], bl = d[i + 2];
    const L = .2126 * r + .7152 * g + .0722 * bl;
    if (L < 28) continue;                                  // eyes, nose, shadows
    const dx = x - n / 2 + .5, dy = y - n * .46;
    const mx = Math.max(r, g, bl), mn = Math.min(r, g, bl);
    const wt = Math.exp(-(dx * dx + dy * dy) / (2 * sig * sig)) * (.35 + Math.min(1, (mx - mn) / Math.max(mx, 1) * 3));
    const k = (r >> 5) + ',' + (g >> 5) + ',' + (bl >> 5);
    const b = buckets[k] || (buckets[k] = { n:0, r:0, g:0, b:0 });
    b.n += wt; b.r += r * wt; b.g += g * wt; b.b += bl * wt;
  }
  const list = Object.values(buckets).sort((a, b) => b.n - a.n).map(b => rgbToHex(b.r / b.n, b.g / b.n, b.b / b.n));
  const main = list[0] || '#C9A27A';
  const dist = (a, b) => { const A = hexToRgb(a), B2 = hexToRgb(b); return Math.hypot(A[0] - B2[0], A[1] - B2[1], A[2] - B2[2]); };
  const sub = list.slice(1, 6).find(c => dist(c, main) > 70) || null;
  return { main:cutify(main), sub:sub && cutify(sub) };
}
function sampleAt(img, fx, fy){
  const c = document.createElement('canvas'), S2 = 120;
  c.width = S2; c.height = S2;
  const g = c.getContext('2d');
  g.drawImage(img, 0, 0, S2, S2);
  const x = Math.round(clamp(fx, 0, 1) * (S2 - 1)), y = Math.round(clamp(fy, 0, 1) * (S2 - 1));
  const x0 = clamp(x - 2, 0, S2 - 5), y0 = clamp(y - 2, 0, S2 - 5);
  const d = g.getImageData(x0, y0, 5, 5).data;
  let r = 0, gg = 0, b = 0;
  for (let i = 0; i < d.length; i += 4){ r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
  const k = d.length / 4;
  return cutify(rgbToHex(r / k, gg / k, b / k));
}
async function prepImage(file){
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
    const sc = Math.min(1, 1024 / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * sc)), h = Math.max(1, Math.round(img.naturalHeight * sc));
    const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
    cv.getContext('2d').drawImage(img, 0, 0, w, h);
    const blob = await new Promise((res, rej) => cv.toBlob(b => b ? res(b) : rej(new Error('blob')), 'image/jpeg', .86));
    const crop = (size, q) => {
      const c2 = document.createElement('canvas'); c2.width = size; c2.height = size;
      const side = Math.min(w, h);
      c2.getContext('2d').drawImage(cv, (w - side) / 2, (h - side) / 2, side, side, 0, 0, size, size);
      return c2.toDataURL('image/jpeg', q);
    };
    return { blob, thumb:crop(160, .74), preview:crop(440, .8), colors:dominantColors(cv) };
  } finally { URL.revokeObjectURL(url); }
}

function buildPrompt(){
  const ids = sp => BREEDS.filter(b => b.sp === sp).map(b => `${b.id}(${b.ja})`).join(', ');
  return `You read photos for a cozy pet-raising game. The attached photo was uploaded by the player so the game can draw a cute chibi cartoon of their own dog or cat.
Look at the main animal and reply with ONLY one JSON object, no other text:
{"species":"dog"|"cat"|"other",
 "candidates":[{"id":"<breed id from the list>","confidence":0.0}],
 "colorName":"<short Japanese coat colour or pattern, e.g. 白, クリーム, 黒白, 茶トラ>",
 "comment":"<one warm Japanese sentence, at most 30 characters, about how this animal looks>",
 "look":{"ear":"pointy|big|small|floppy|long|semi|fold","coat":"smooth|fluffy|curly|long","muzzle":"short|medium|long","tail":"curl|plume|straight|stub|long|fluffy","legs":"normal|short","face":"muzzle|lower|mask|hachiware|blaze",
  "colors":{"main":"#hex","body":"#hex","ear":"#hex","tail":"#hex","face":"#hex","chest":"#hex","paws":"#hex","eye":"#hex","nose":"#hex","tailTip":"#hex or null"},
  "marks":{"stripes":"#hex or null","spots":"#hex or null","patchL":"#hex or null","patchR":"#hex or null","bodyPatch":false,"brows":"#hex or null","mask":"#hex or null","saddle":"#hex or null"}}}
Breed ids. Dogs: ${ids('dog')}. Cats: ${ids('cat')}.
Rules:
- candidates: 1 to 3 ids from the list, most likely first. For cats without a pedigree look, use the coat-pattern ids (kijitora, chatora, sabatora, mike, kuro, shiro, hachiware). Use mix_dog or mix_cat when nothing fits.
- main = fur colour of the head; body = torso; face = lower face and muzzle; chest and paws likewise. Use the same hex when areas share a colour.
- face: "muzzle" = only the snout differs; "lower" = lower half of the face is lighter; "mask" = husky-style white face with a dark cap; "hachiware" = white inverted V between the eyes; "blaze" = narrow white stripe down the forehead into a white muzzle.
- tail: dogs use curl, plume, straight or stub; cats use long or fluffy. ear "fold" is for folded cat ears. legs "short" for dachshund, corgi, munchkin.
- marks: stripes for tabby, spots for spotted coats, patchL/patchR for colour patches over the left/right eye and ear (calico, papillon, cavalier), bodyPatch true if the torso has such patches, brows for light eyebrow dots, mask for dark shading around the muzzle (pug, siamese), saddle for a dark back (beagle). Use null when absent.
- Colours should match the photo, slightly clean and bright like a cute illustration. Pure white fur is about #FBF8F4, black fur about #2B2729. Dog eyes are usually dark brown #2B1E1A.
- If no dog or cat is visible, reply {"species":"other"}.`;
}

function parseAI(r){
  if (!r || typeof r !== 'object' || Array.isArray(r)) return null;
  const species = r.species === 'cat' ? 'cat' : r.species === 'dog' ? 'dog' : 'other';
  if (species === 'other') return { species };
  const seen = new Set();
  let cands = (Array.isArray(r.candidates) ? r.candidates : [])
    .map(c => ({ id:String(c && c.id || ''), conf:clamp(Number(c && c.confidence) || 0, 0, 1) }))
    .filter(c => BREED_BY_ID[c.id] && BREED_BY_ID[c.id].sp === species && !seen.has(c.id) && seen.add(c.id))
    .slice(0, 3);
  if (!cands.length) cands = [{ id:species === 'cat' ? 'mix_cat' : 'mix_dog', conf:0 }];
  const lk = r.look && typeof r.look === 'object' ? r.look : {};
  const look = normalizeLook(Object.assign({}, lk, { species, breedId:cands[0].id }));
  return {
    species, cands, look,
    colorName:typeof r.colorName === 'string' ? r.colorName.trim().slice(0, 14) : '',
    comment:typeof r.comment === 'string' ? r.comment.trim().slice(0, 60) : '',
  };
}

function colorFamily(hex){
  const [r, g, b] = hexToRgb(hex), L = lum(hex), mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  if (L > .72) return 'white';
  if (L < .05) return 'black';
  if (mx - mn < 26) return 'gray';
  if (r >= g && g >= b){ if (L > .5) return 'cream'; if (L > .2) return 'orange'; return 'brown'; }
  return 'gray';
}
function nameIdea(look, not){
  const list = NAME_IDEAS[colorFamily(normalizeLook(look).colors.main)] || NAME_IDEAS.cream;
  const opts = list.filter(n => n !== not);
  return pick(opts.length ? opts : list);
}

const Onboard = {
  el:$('#onboard'), box:$('#ob'), busy:false, mode:'new', canCancel:false, draft:null, ctl:null, msgT:null, browseSp:null,
  show(){ this.el.hidden = false; this.el.scrollTop = 0; },
  close(){ this.el.hidden = true; this.busy = false; clearInterval(this.msgT); if (this.ctl) this.ctl.abort(); this.ctl = null; },
  openNew(canCancel){ this.mode = 'new'; this.canCancel = !!canCancel; this.welcome(); },
  openEdit(){
    if (!S) return;
    this.mode = 'edit'; this.canCancel = true;
    const look = normalizeLook(S.pet.look);
    this.draft = { look, name:S.pet.name, photo:S.pet.photo || null, colorName:S.pet.colorName || '', cands:null, comment:'', note:'', keepColors:true, photoMain:null };
    this.edit();
  },
  welcome(err){
    this.busy = false; clearInterval(this.msgT);
    this.show();
    this.box.innerHTML = `<div class="ob-step">
      <h1 class="brand">うちのこ<span>日和</span></h1>
      <p class="lead">${HOME
        ? '犬か猫の写真を1枚えらぶと、その子の毛の色でペットがお部屋にやってきます。種類と色を近づけたら、ごはんをあげて、なでて、いっしょにのんびり過ごしましょう。年をとったり、いなくなったりはしません。'
        : '犬か猫の写真を1枚えらぶと、その子そっくりのペットがお部屋にやってきます。ごはんをあげて、なでて、いっしょにのんびり過ごしましょう。年をとったり、いなくなったりはしません。'}</p>
      <div class="miniroom" aria-hidden="true"><div class="a" style="position:absolute;left:4%;bottom:4%;width:46%">${renderPet(SAMPLE_A, { acc:'ribbon' })}</div><div class="b" style="position:absolute;right:4%;bottom:4%;width:46%">${renderPet(SAMPLE_B, { acc:'bell' })}</div></div>
      ${err ? `<div class="oberr" role="alert">${esc(err)}</div>` : ''}
      <label class="upload">${CAMERA}写真からむかえる<input type="file" accept="image/*" id="obFile" aria-label="犬か猫の写真をえらぶ"></label>
      <button class="linkbtn" type="button" id="obManual">写真なしで、種類からえらぶ</button>
      <button class="linkbtn" type="button" id="obImport">引っこしコードで受け取る</button>
      ${this.canCancel ? '<button class="linkbtn" type="button" id="obBack">もどる</button>' : ''}
      <p class="note">${HOME
        ? '写真は毛の色をひろうためだけに、この端末の中で使います。どこにも送られません。お部屋には小さなサムネイルを飾ります。'
        : '写真は種類と毛の色を読みとるためにClaudeへ送られます。読みとりにはあなたのClaudeの利用枠を少し使います。お部屋には小さなサムネイルだけを飾ります。'}</p>
    </div>`;
    this.box.querySelectorAll('.miniroom .pet-svg').forEach(s => { s.style.width = '100%'; s.style.height = 'auto'; });
    $('#obFile').addEventListener('change', e => { const f = e.target.files && e.target.files[0]; if (f) this.analyze(f); });
    $('#obManual').addEventListener('click', () => this.manual());
    $('#obImport').addEventListener('click', () => this.importView());
    const back = $('#obBack'); if (back) back.addEventListener('click', () => this.close());
  },
  importView(err){
    this.busy = true;
    this.show();
    this.box.innerHTML = `<div class="ob-step">
      <h2 class="brand" style="font-size:24px">引っこしコードで受け取る</h2>
      <p class="lead">前の場所でコピーした引っこしコードを貼りつけるか、保存したファイル（${MOVE_FILE}）をえらんでください。なかよし度やきせかえも、そのまま引きつぎます。</p>
      ${err ? `<div class="oberr" role="alert">${esc(err)}</div>` : ''}
      <textarea class="codebox" id="imCode" rows="6" ${CODE_ATTRS} placeholder="UCHINOKO ではじまるコード" aria-label="引っこしコード"></textarea>
      <button class="btn primary" type="button" id="imGo">貼りつけたコードで受け取る</button>
      <label class="btn filebtn">ファイルからえらぶ<input type="file" id="imFile" accept=".txt,text/plain"></label>
      <button class="linkbtn" type="button" id="imBack">もどる</button>
    </div>`;
    const take = text => {
      const r = readMoveCode(text);
      if (!r.st) return this.importView(moveErrorText(r));
      S = r.st; this.busy = false;
      Persist.schedule();
      Game.start('ただいま！');
    };
    $('#imGo').addEventListener('click', () => take($('#imCode').value));
    $('#imFile').addEventListener('change', async e => {
      const f = e.target.files && e.target.files[0]; if (!f) return;
      try { take(await readTextFile(f)); } catch(er){ take(''); }
    });
    $('#imBack').addEventListener('click', () => this.welcome());
  },
  scan(preview){
    this.box.innerHTML = `<div class="scan">
      <div class="scanphoto"><img src="${preview}" alt="えらんだ写真"></div>
      <p class="scanmsg" id="scanMsg" aria-live="polite">どんな子かな…</p>
      <div class="paws">${PAW}${PAW}${PAW}${PAW}</div>
      <p class="note">はじめての読みとりでは、Claudeを使ってよいかの確認が出ます。読みとりには30秒ほどかかることがあります。</p>
      <button class="btn" type="button" id="scanCancel" style="max-width:220px">キャンセル</button>
    </div>`;
    const msgs = ['お耳の形を見ています…','毛の色をしらべています…','しっぽをチェック中…','お顔のもようを見ています…','かわいさを確認中…'];
    let i = 0;
    clearInterval(this.msgT);
    this.msgT = setInterval(() => { const el = $('#scanMsg'); if (el) el.textContent = msgs[i++ % msgs.length]; }, 2600);
    $('#scanCancel').addEventListener('click', () => { if (this.ctl) this.ctl.abort(); else this.welcome(); });
  },
  async analyze(file){
    this.busy = true;
    let img;
    try { img = await prepImage(file); }
    catch(e){ return this.welcome('この写真は読みこめませんでした。JPEGかPNGの写真でためしてね。'); }
    if (HOME) return this.fromPhotoOnly(img, '写真から毛の色をひろいました。犬か猫と種類をえらんで、色を近づけてね。');
    this.scan(img.preview);
    const sampler = await getImageSampler();
    if (!this.busy) return;
    if (!sampler) return this.fromPhotoOnly(img, 'ここでは写真の読みとりが使えないので、写真の色で仮の見た目をつくりました。種類をえらんでね。');
    this.ctl = new AbortController();
    try {
      const res = await sampler.json(buildPrompt(), { images:[img.blob], signal:this.ctl.signal });
      this.ctl = null;
      clearInterval(this.msgT);
      const out = parseAI(res);
      if (!out) return this.fromPhotoOnly(img, 'うまく読みとれませんでした。種類と色をえらんでね。');
      if (out.species === 'other') return this.welcome('犬か猫が写っている写真をえらんでね。顔がはっきり写っている写真がおすすめです。');
      this.draft = { look:out.look, name:'', photo:img.thumb, preview:img.preview, colorName:out.colorName, cands:out.cands, comment:out.comment, note:'', keepColors:true, photoMain:null };
      this.edit();
    } catch(e){
      this.ctl = null;
      clearInterval(this.msgT);
      const code = e && e.code;
      if (code === 'cancelled') return this.welcome();
      if (code === 'image_rejected' || code === 'refused') return this.welcome('この写真は読みとれませんでした。ちがう写真でためしてね。');
      const msg = {
        not_granted:'写真の読みとりが許可されなかったので、写真の色で仮の見た目をつくりました。種類をえらんでね。',
        rate_limited:'いまは読みとりが混みあっています。写真の色で仮の見た目をつくったので、種類をえらぶか、少しあとでためしてね。',
        session_expired:'もう一度サインインすると写真を読みとれます。いまは種類をえらんでね。',
      }[code] || 'うまく読みとれませんでした。写真の色で仮の見た目をつくったので、種類をえらんでね。';
      this.fromPhotoOnly(img, msg);
    }
  },
  fromPhotoOnly(img, note){
    clearInterval(this.msgT);
    const base = normalizeLook({ species:'dog', breedId:'mix_dog', colors:{ main:img.colors.main } });
    this.draft = { look:base, name:'', photo:img.thumb, preview:img.preview, colorName:'', cands:null, comment:'', note, keepColors:false, photoMain:img.colors.main };
    this.browseSp = 'dog';
    this.edit(true);
  },
  manual(){
    this.busy = true;
    this.draft = { look:normalizeLook({ species:'dog', breedId:'shiba' }), name:'', photo:null, colorName:'', cands:null, comment:'', note:'', keepColors:false, photoMain:null };
    this.browseSp = 'dog';
    this.edit(true);
  },
  applyBreed(id){
    const b = BREED_BY_ID[id], d = this.draft;
    if (!b) return;
    const shape = {};
    for (const k in ENUMS) shape[k] = b.look[k];
    if (d.keepColors){
      d.look = normalizeLook(Object.assign({}, shape, { species:b.sp, breedId:id, colors:d.look.colors, marks:d.look.marks }));
    } else {
      const L = normalizeLook({ species:b.sp, breedId:id });
      if (d.photoMain){
        const c = L.colors, old = c.main;
        ['main','body','ear','tail','face','chest','paws'].forEach(k => { if (c[k] === old) c[k] = d.photoMain; });
      }
      d.look = L;
    }
  },
  setMain(hex){
    const c = this.draft.look.colors, old = c.main;
    ['main','body','ear','tail','face','chest','paws'].forEach(k => { if (c[k] === old) c[k] = hex; });
    this.draft.colorName = '';
  },
  setSub(hex){
    const c = this.draft.look.colors, old = c.face;
    if (old === c.main){ c.face = hex; c.chest = hex; c.paws = hex; if (this.draft.look.face === 'muzzle') this.draft.look.face = 'lower'; }
    else ['face','chest','paws','tailTip'].forEach(k => { if (c[k] === old) c[k] = hex; });
    this.draft.colorName = '';
  },
  edit(openBrowse){
    this.busy = true;
    if (this.draft) this.draft.ideaFam = null;
    this.show();
    const d = this.draft, L = d.look;
    const label = breedLabel({ breedId:L.breedId, colorName:d.colorName });
    const head = this.mode === 'edit' ? `${esc(d.name)}の見た目を変えられます`
      : d.cands ? `この子は「${esc(label)}」かな？` : 'どんな子か教えてね';
    const sub = this.mode === 'edit' ? '種類・毛の色・名前を変えても、なかよし度はそのままです。' : (d.comment || d.note || '種類をえらんで、毛の色を近づけてね。');
    const swRow = (key, list, cur) => `<div class="swrow" role="group">${list.map(([n, h]) =>
      `<button class="sw" type="button" data-sw="${key}" data-hex="${h}" style="background:${h}" aria-label="${esc(n)}" aria-pressed="${normHex(h) === cur}"></button>`).join('')}
      <label class="swcustom" title="ほかの色"><input type="color" data-swc="${key}" value="${cur}" aria-label="ほかの色をえらぶ"></label></div>`;
    const sp = this.browseSp || L.species;
    this.box.innerHTML = `<div class="ob-step">
      <div class="miniroom" id="edPrev"></div>
      <div class="card say">${d.photo ? `<img src="${d.photo}" alt="えらんだ写真">` : ''}<p>${head}<small>${esc(sub)}</small></p></div>
      <div class="card"><h3>種類</h3>
        ${d.cands ? `<div class="chips" id="edCands">${d.cands.map(c => `<button class="chip" type="button" data-b="${c.id}" aria-pressed="${c.id === L.breedId}">${esc(BREED_BY_ID[c.id].ja)}${c.conf ? `<small>${Math.round(c.conf * 100)}%</small>` : ''}</button>`).join('')}</div>
          <button class="linkbtn" type="button" id="edMore" style="align-self:flex-start;padding-left:0">ほかの種類からえらぶ</button>` : ''}
        <div id="edBrowse" ${d.cands && !openBrowse ? 'hidden' : ''}>
          <div class="seg" role="group" aria-label="犬か猫"><button type="button" data-sp="dog" aria-pressed="${sp === 'dog'}">犬</button><button type="button" data-sp="cat" aria-pressed="${sp === 'cat'}">猫</button></div>
          <div class="breedgrid" id="edGrid"></div>
        </div>
      </div>
      <div class="card"><h3>毛の色</h3>
        ${(d.preview || d.photo) ? `<div class="picker">
          <div class="pickphoto" id="edPick"><img src="${d.preview || d.photo}" alt="えらんだ写真。毛のところをタップすると色をひろえます"><i id="pickDot" hidden></i></div>
          <div class="picktargets"><p class="swlabel" style="margin:0">写真からひろう</p>
            <div class="chips"><button class="chip" type="button" data-pt="main" aria-pressed="true">からだ</button><button class="chip" type="button" data-pt="sub" aria-pressed="false">口もと・おなか</button></div>
            <p class="note" style="margin:0">写真の毛のところをタップすると、その色になります。</p></div>
        </div>` : ''}
        <p class="swlabel">からだ</p>${swRow('main', COAT_SW, L.colors.main)}
        <p class="swlabel">口もと・おなか</p>${swRow('sub', COAT_SW, L.colors.face)}
        <p class="swlabel">目</p>${swRow('eye', EYE_SW, L.colors.eye)}
      </div>
      <div class="card"><h3><label for="edName">名前</label></h3>
        <div class="namebox"><input id="edName" maxlength="10" autocomplete="off" placeholder="" value="${esc(this.mode === 'edit' ? d.name : '')}"><button type="button" id="edIdea">おまかせ</button></div>
      </div>
      <div class="sticky-cta btnstack">
        <button class="btn primary" type="button" id="edGo">${this.mode === 'edit' ? 'これでOK' : 'この子とくらす'}</button>
        ${this.mode === 'edit' || this.canCancel || !d.cands ? '<button class="linkbtn" type="button" id="edBack">もどる</button>' : '<button class="linkbtn" type="button" id="edRetry">別の写真にする</button>'}
      </div>
    </div>`;
    this.refresh();
    this.renderGrid(sp);
    const box = this.box;
    box.querySelectorAll('[data-b]').forEach(b => b.addEventListener('click', () => {
      const c = d.cands && d.cands.find(x => x.id === b.dataset.b);
      if (c && d.cands){ d.look = normalizeLook(Object.assign({}, d.look, this.aiShape(c.id))); }
      this.refresh();
    }));
    const more = $('#edMore');
    if (more) more.addEventListener('click', () => { $('#edBrowse').hidden = false; more.hidden = true; });
    box.querySelectorAll('[data-sp]').forEach(b => b.addEventListener('click', () => {
      box.querySelectorAll('[data-sp]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      this.browseSp = b.dataset.sp; this.renderGrid(b.dataset.sp);
    }));
    box.querySelectorAll('[data-sw]').forEach(b => b.addEventListener('click', () => this.pickColor(b.dataset.sw, b.dataset.hex)));
    box.querySelectorAll('[data-swc]').forEach(inp => inp.addEventListener('input', () => this.pickColor(inp.dataset.swc, inp.value)));
    const pk = $('#edPick');
    if (pk){
      let target = 'main';
      box.querySelectorAll('[data-pt]').forEach(b => b.addEventListener('click', () => {
        target = b.dataset.pt;
        box.querySelectorAll('[data-pt]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
      }));
      const im = pk.querySelector('img'), dot = $('#pickDot');
      pk.addEventListener('click', e => {
        if (!im.complete || !im.naturalWidth) return;
        const r = im.getBoundingClientRect();
        const fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
        const hex = sampleAt(im, fx, fy);
        dot.style.left = (fx * 100) + '%'; dot.style.top = (fy * 100) + '%'; dot.style.background = hex; dot.hidden = false;
        if (target === 'main') this.draft.photoMain = hex;
        this.pickColor(target, hex);
      });
    }
    $('#edIdea').addEventListener('click', () => { const n = $('#edName'); n.value = nameIdea(d.look, n.value); });
    $('#edGo').addEventListener('click', () => this.commit());
    const back = $('#edBack'); if (back) back.addEventListener('click', () => { if (this.mode === 'edit') this.close(); else this.welcome(); });
    const retry = $('#edRetry'); if (retry) retry.addEventListener('click', () => this.welcome());
    this.el.scrollTop = 0;
  },
  aiShape(id){
    // switching between AI candidates keeps what the photo showed; only the breed name changes
    return { breedId:id };
  },
  pickColor(key, hex){
    if (!isHex(hex)) return;
    hex = normHex(hex);
    if (key === 'main') this.setMain(hex);
    else if (key === 'sub') this.setSub(hex);
    else this.draft.look.colors.eye = hex;
    this.refresh();
  },
  refresh(){
    const d = this.draft, L = d.look = normalizeLook(d.look);
    const prev = $('#edPrev');
    if (prev){
      prev.innerHTML = `<div class="single" style="position:absolute;left:50%;bottom:2%;width:58%;transform:translateX(-50%)">${renderPet(L, { wear:this.mode === 'edit' && S ? wearFrom(S.pet) : null })}</div>`;
      const s = prev.querySelector('.pet-svg'); s.style.width = '100%'; s.style.height = 'auto';
    }
    this.box.querySelectorAll('[data-b]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.b === L.breedId)));
    this.box.querySelectorAll('[data-g]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.g === L.breedId)));
    const cur = { main:L.colors.main, sub:L.colors.face, eye:L.colors.eye };
    this.box.querySelectorAll('[data-sw]').forEach(b => b.setAttribute('aria-pressed', String(normHex(b.dataset.hex) === cur[b.dataset.sw])));
    this.box.querySelectorAll('[data-swc]').forEach(i => { i.value = cur[i.dataset.swc]; });
    const say = this.box.querySelector('.say p');
    if (say && d.cands && this.mode !== 'edit'){
      const first = say.firstChild;
      if (first && first.nodeType === 3) first.textContent = `この子は「${breedLabel({ breedId:L.breedId, colorName:d.colorName })}」かな？`;
    }
    const n = $('#edName'), fam = colorFamily(L.colors.main);
    if (n && !n.value && fam !== d.ideaFam){ d.ideaFam = fam; n.placeholder = d.name || nameIdea(L); }
  },
  renderGrid(sp){
    const grid = $('#edGrid');
    if (!grid) return;
    const d = this.draft;
    grid.innerHTML = BREEDS.filter(b => b.sp === sp).map(b => {
      const look = d.keepColors
        ? Object.assign({}, b.look, { species:b.sp, breedId:b.id, colors:d.look.colors, marks:d.look.marks })
        : { species:b.sp, breedId:b.id };
      return `<button class="tile" type="button" data-g="${b.id}" aria-pressed="${b.id === d.look.breedId}">${renderPet(look)}<span>${esc(b.ja)}</span></button>`;
    }).join('');
    grid.querySelectorAll('[data-g]').forEach(b => b.addEventListener('click', () => { this.applyBreed(b.dataset.g); this.refresh(); }));
  },
  commit(){
    const d = this.draft, look = normalizeLook(d.look);
    const typed = ($('#edName').value || '').trim();
    const name = (typed || $('#edName').placeholder || 'うちのこ').slice(0, 10);
    const pet = { name, species:look.species, breedId:look.breedId, look, photo:d.photo || null, colorName:d.colorName || '', wear:{ head:null, face:null, neck:null } };
    let greet;
    if (this.mode === 'edit' && S){
      pet.wear = wearFrom(S.pet);
      S.pet = pet;
      greet = 'どうかな？';
    } else {
      S = newState(pet);
      greet = 'はじめまして！';
    }
    this.busy = false;
    Persist.schedule();
    Game.start(greet);
  },
};

/* ===== boot ===== */
(function boot(){
  updateClock();
  S = Persist.loadLocal();
  getImageSampler();
  if (S){
    const away = now() - (S.last || now());
    Game.start(away > 60 * 60e3 ? 'おかえり！' : null, away);
  } else {
    Onboard.openNew(false);
  }
  Persist.connect();
})();
