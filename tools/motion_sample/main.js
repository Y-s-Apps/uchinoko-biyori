{
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const calm = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get(k, d){ try { const v = localStorage.getItem('motion-sample2:' + k); return v == null ? d : JSON.parse(v); } catch(e){ return d; } },
                  set(k, v){ try { localStorage.setItem('motion-sample2:' + k, JSON.stringify(v)); } catch(e){} } };

  /* 体勢：view＝どちらの 絵か（front 正面・side よこ） */
  const POSES = [
    { id:'sit', ja:'すわる', view:'front', use:'いまの 絵。ふだん' },
    { id:'stand', ja:'たつ', view:'side', use:'あるく 前後・まどの そと・くんくん' },
    { id:'walk', ja:'あるく', view:'side', use:'おへやの 中を 行き来（左へは むきを かえる）' },
    { id:'down', ja:'ふせる', view:'front', use:'くつろぐ・おなか いっぱい・ベッド' },
    { id:'sleep', ja:'ねる', view:'front', use:'ベッド・よる（あごを 前あしに のせる）' },
    { id:'side', ja:'ごろん', view:'?', use:'なでなでの あと（ねこは 多め）・ラグの まんなか' },
    { id:'beg', ja:'おねだり', view:'front', use:'ごはん・おやつの 前・ボールを まつ' },
  ];
  /* しぐさ（だんかい 1 の 表の 見本）：view・できる 体勢・いぬ／ねこ・ねていても よいか */
  const GESTURE = {
    ear:{ ja:'耳ぴく', ms:750, poses:['sit','stand','down','sleep','beg','side'], sp:'both', calm:true },
    look:{ ja:'きょろきょろ', ms:1800, poses:['sit','down'], sp:'both' },
    yawn:{ ja:'あくび', ms:1600, poses:['sit','down'], sp:'both' },
    stretch:{ ja:'のび', ms:1900, poses:['stand'], sp:'both' },
    shake:{ ja:'ぶるぶる', ms:800, poses:['sit'], sp:'dog' },
    scratch:{ ja:'かく', ms:1700, poses:['sit'], sp:'both' },
    groom:{ ja:'けづくろい', ms:2400, poses:['sit'], sp:'cat' },
    sniff:{ ja:'くんくん', ms:1600, poses:['stand'], sp:'both' },
    sway:{ ja:'しっぽ ゆらり', ms:2400, poses:['sit','stand','down','sleep','beg','side'], sp:'cat', calm:true },
    tailup:{ ja:'しっぽ ぴん', ms:1400, poses:['sit','stand'], sp:'both' },
    pant:{ ja:'はぁはぁ', ms:1600, poses:['sit','stand'], sp:'dog' },
    lick:{ ja:'ぺろり', ms:1000, poses:['sit'], sp:'both' },
  };
  const GHOW = { ear:'耳が ぴくっ', look:'頭と 目で まわりを 見る', yawn:'口を 大きく あけて 目を とじる', stretch:'前足を のばして おしりを 上げる（よこ）', shake:'からだごと ぶるぶる・耳が ゆれる', scratch:'うしろ足で 耳の うしろを かく', groom:'前足を なめて 顔を あらう', sniff:'鼻を 床に つけて におう（よこ）', sway:'しっぽを ゆっくり 大きく', tailup:'しっぽを ぴんと 立てる', pant:'口を あけて 舌を 出す', lick:'舌で 鼻を ぺろり' };
  const SPEED = {
    calm:{ ja:'おちつき', pose:[15000, 20000], gest:[6000, 9000] },
    normal:{ ja:'ふつう', pose:[8000, 12000], gest:[4000, 6000] },
    lively:{ ja:'げんき', pose:[4000, 6000], gest:[2500, 4000] },
  };
  const SIDE_JA = { a:'A おなか（さかさで おなかを 見せる）', b:'B ねそべる（のびて ぺたん）' };
  const BACK_JA = { later:'あとで', yes:'やる', no:'やらない' };
  const SP_JA = { both:'いぬ・ねこ', dog:'いぬだけ', cat:'ねこだけ' };

  const st = { kid: store.get('kid', 'dog'), speed: store.get('speed', 'calm'), side: store.get('side', 'b'), back: store.get('back', 'later'), keep: store.get('keep', {}) };
  if (!SIDE_JA[st.side]) st.side = 'b';
  const kept = id => st.keep[id] !== false;
  const look = () => st.kid === 'cat' ? breedLook('chatora') : LOOKS.daizu;
  const wear = () => st.kid === 'cat' ? { neck:'bell_red' } : { neck:'scarf_tri' };
  const artOf = (lk, w) => `<div class="art"><div class="vf">${petFront(lk, w)}</div><div class="vs">${renderPetSide(lk, w ? { wear:w } : {})}</div></div>`;
  const art = () => artOf(look(), wear());
  const sideView = () => st.side === 'b' ? 'side' : 'front';
  const viewOf = p => p === 'side' ? sideView() : (p === 'stand' || p === 'walk') ? 'side' : 'front';
  const POSE_CLS = ['pose-down','pose-sleep','pose-beg','pose-side','pose-belly','side-b','ex-sleep','walking','view-side'];
  /* 体勢を かえる。絵（正面／よこ）が かわる ときは くるっと まわる */
  const setPose = async (el, p, turn = true) => {
    const v = viewOf(p), was = el.classList.contains('view-side') ? 'side' : 'front';
    if (turn && v !== was && !calm()){
      el.classList.remove('turning'); void el.offsetWidth; el.classList.add('turning');
      await sleep(160);
    }
    el.classList.remove(...POSE_CLS);
    if (v === 'side') el.classList.add('view-side');
    if (p === 'down') el.classList.add('pose-down');
    if (p === 'sleep') el.classList.add('pose-sleep', 'ex-sleep');
    if (p === 'beg') el.classList.add('pose-beg');
    if (p === 'walk') el.classList.add('walking');
    if (p === 'side') el.classList.add(st.side === 'b' ? 'pose-side' : 'pose-belly', ...(st.side === 'b' ? ['side-b'] : []));
    el.dataset.pose = p;
    if (turn && v !== was && !calm()){ await sleep(170); el.classList.remove('turning'); }
  };
  const play = async (el, id) => {
    const g = GESTURE[id]; if (!g || el.dataset.g) return;
    el.dataset.g = id; el.classList.add('g-' + id);
    await sleep(g.ms + 40);
    el.classList.remove('g-' + id); delete el.dataset.g;
  };

  /* ===== 体勢の カード ===== */
  const poseBox = $('#poses');
  poseBox.innerHTML = POSES.map(p => `<div class="card" data-k="pose-${p.id}"><button class="stage" type="button" aria-label="${p.ja}を もういちど" style="border:0;background:none;padding:0;cursor:pointer"><div class="pp" data-pose="sit">${art()}</div></button><b>${p.ja}</b><small>${p.use}</small>${p.id === 'sit' ? '<span class="tag">いまの まま</span>' : `<button class="keep" type="button" data-keep="pose-${p.id}"></button>`}</div>`).join('');
  const poseLoop = async (card, p, delay) => {
    const el = card.querySelector('.pp');
    await sleep(delay);
    for (;;){
      if (p.id === 'sit'){ await sleep(2600); if (!calm()) await play(el, 'ear'); continue; }
      if (p.id === 'walk'){ await setPose(el, 'walk'); await sleep(4200); await setPose(el, 'stand', false); await sleep(1200); continue; }
      await setPose(el, p.id); await sleep(4200);
      await setPose(el, 'sit'); await sleep(1500);
    }
  };
  POSES.forEach((p, i) => {
    const card = poseBox.children[i];
    poseLoop(card, p, 300 + i * 420);
    card.querySelector('.stage').addEventListener('click', async () => {
      const el = card.querySelector('.pp'); if (p.id === 'sit'){ play(el, 'look'); return; }
      await setPose(el, 'sit'); await sleep(500); await setPose(el, p.id);
    });
  });

  /* ===== しぐさの カード ===== */
  const gestBox = $('#gests');
  const gIds = Object.keys(GESTURE);
  const posJa = x => (POSES.find(p => p.id === x) || {}).ja;
  gestBox.innerHTML = gIds.map(id => { const g = GESTURE[id]; return `<div class="card" data-k="g-${id}"><button class="stage" type="button" aria-label="${g.ja}を もういちど" style="border:0;background:none;padding:0;cursor:pointer"><div class="pp">${art()}</div></button><b>${g.ja}</b><span class="tag">${SP_JA[g.sp]}</span><small>${GHOW[id]}</small><button class="keep" type="button" data-keep="g-${id}"></button></div>`; }).join('');
  gIds.forEach((id, i) => {
    const card = gestBox.children[i], el = card.querySelector('.pp'), g = GESTURE[id];
    setPose(el, g.poses[0], false);
    (async () => { await sleep(500 + i * 380); for (;;){ if (!calm()) await play(el, id); await sleep(2400); } })();
    card.querySelector('.stage').addEventListener('click', () => play(el, id));
  });

  /* ===== ごろんの 2案 ===== */
  const sideBox = $('#sides');
  sideBox.innerHTML = ['a','b'].map(v => `<button class="card" type="button" data-side="${v}" aria-pressed="false"><span class="stage"><span class="pp" style="display:block">${art()}</span></span><b>${SIDE_JA[v].split('（')[0]}</b><small>${{ a:'正面の 絵を さかさに して、前あしを まげる。顔も さかさ', b:'よこむきで おなかを 床に つけ、前足は 前・うしろ足は うしろへ' }[v]}</small></button>`).join('');
  const drawSides = () => $$('#sides .card').forEach(b => {
    const el = b.querySelector('.pp');
    el.classList.remove(...POSE_CLS);
    if (b.dataset.side === 'b') el.classList.add('view-side', 'pose-side', 'side-b'); else el.classList.add('pose-belly');
  });
  $$('#sides .card').forEach(b => b.addEventListener('click', () => setOpt('side', b.dataset.side)));

  /* ===== よこむきの 絵（41しゅるい） ===== */
  const SHORT = { dachshund:'ダックス', schnauzer:'シュナウザー', yorkie:'ヨーキー', frenchie:'フレブル', golden:'ゴールデン', labrador:'ラブラドール', corgi:'コーギー', husky:'ハスキー', border_collie:'ボーダー', jack_russell:'ジャックラッセル', scottish:'スコティッシュ', american_sh:'アメショー', british:'ブリショー', norwegian:'ノルウェージャン', russian_blue:'ロシアンブルー' };
  const brBox = $('#breeds');
  brBox.innerHTML = BREEDS.map(b => `<button class="card" type="button" data-b="${b.id}"><span class="stage"><span class="pp view-side walking" style="display:block">${artOf(breedLook(b.id), null)}</span></span><b>${SHORT[b.id] || b.ja}</b></button>`).join('');
  $$('#breeds .card').forEach(b => b.addEventListener('click', () => b.querySelector('.pp').classList.toggle('walking')));

  /* ===== おへや：ひまな ときの 行動（だんかい 1・2 の 見本） ===== */
  const room = $('#room'), pet = $('#pet'), now = $('#now');
  const P = { x:50, y:80, pose:'sit', busy:false, last:[], acts:[], rubbed:0 };
  const SPOT = { bed:{ x:80, y:86 }, bowl:{ x:22, y:90 }, win:{ x:27, y:66 }, rug:{ x:50, y:84 } };
  const scaleAt = y => .84 + Math.max(0, Math.min(1, (y - 66) / 24)) * .22;
  const place = () => { pet.style.left = P.x + '%'; pet.style.top = P.y + '%'; pet.style.zIndex = String(10 + Math.round(P.y)); pet.style.setProperty('--s', scaleAt(P.y).toFixed(3)); };
  const say = (t, sub) => { now.innerHTML = ''; now.append(t); if (sub){ const i = document.createElement('i'); i.textContent = sub; now.append(i); } };
  const cat = () => st.kid === 'cat';
  const roomPose = async p => { P.pose = p; await setPose(pet, p); clearInterval(P.zz); if (p === 'sleep') P.zz = setInterval(() => fx('z', 'z'), 1800); };
  const fx = (k, html) => {
    if (calm()) return;
    const r = pet.getBoundingClientRect(), s = room.getBoundingClientRect(), e = document.createElement('div');
    e.className = 'fx ' + k; e.innerHTML = html;
    const hy = { sit:.38, stand:.36, walk:.36, down:.5, sleep:.55, side:.55, beg:.3 }[P.pose] || .38;
    const hx = (P.pose === 'stand' || P.pose === 'walk' || (P.pose === 'side' && st.side === 'b')) ? (pet.classList.contains('dir-l') ? .32 : .68) : .5;
    e.style.left = (r.left - s.left + r.width * (k === 'z' ? hx + .1 : hx) + (k === 'h' ? rnd(-22, 22) : 0)) + 'px';
    e.style.top = (r.top - s.top + r.height * hy) + 'px';
    e.style.setProperty('--dx', rnd(-20, 20).toFixed(0) + 'px');
    room.appendChild(e); setTimeout(() => e.remove(), 2500);
  };
  const HEART = '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.6 6.6 4.6c2.2 0 3.6 1.2 4.4 2.5.8-1.3 2.2-2.5 4.4-2.5 3.6 0 5.7 3.8 4.2 7.2C19.5 16.4 12 21 12 21z" fill="#F0728E" stroke="#fff" stroke-width="1.6"/></svg>';
  /* あるく：よこむきに なって、行く ほうを むく */
  const walkTo = async (x, y) => {
    const left = x < P.x;
    if (pet.classList.contains('dir-l') !== left && viewOf(P.pose) === 'side'){ pet.classList.add('turning'); await sleep(160); pet.classList.toggle('dir-l', left); await sleep(170); pet.classList.remove('turning'); }
    else pet.classList.toggle('dir-l', left);
    if (P.pose !== 'stand' && P.pose !== 'walk'){ P.pose = 'stand'; await setPose(pet, 'stand'); await sleep(250); }
    const d = Math.hypot(x - P.x, (y - P.y) * 1.6), ms = Math.max(500, d * 52);
    pet.style.transition = `left ${ms}ms linear, top ${ms}ms linear, transform ${ms}ms linear`;
    await setPose(pet, 'walk', false); P.pose = 'walk';
    P.x = x; P.y = y; place();
    await sleep(ms);
    await setPose(pet, 'stand', false); P.pose = 'stand';
  };
  const ACTS = [
    { id:'walk', w:() => 14, run:async () => { await walkTo(rnd(26, 74), rnd(74, 90)); await sleep(400); if (Math.random() < .5){ await roomPose('sit'); say('おさんぽして すわる'); } else say('おさんぽして たつ'); } },
    { id:'sit', w:() => P.pose === 'sit' ? 0 : 16, run:async () => { await roomPose('sit'); say('すわる'); } },
    { id:'stand', w:() => P.pose === 'stand' ? 0 : 8, run:async () => { await roomPose('stand'); say('たつ'); } },
    { id:'down', w:() => P.pose === 'down' ? 0 : 12, run:async () => { await walkTo(SPOT.bed.x, SPOT.bed.y - 1); await roomPose('down'); say('ベッドで ふせる'); } },
    { id:'sleep', w:() => P.pose === 'sleep' ? 0 : 7, run:async () => { await walkTo(SPOT.bed.x, SPOT.bed.y - 1); await roomPose('down'); await sleep(900); await roomPose('sleep'); say('ベッドで ねる', 'Zzz'); } },
    { id:'win', w:() => 8, run:async () => { await walkTo(SPOT.win.x, SPOT.win.y + 4); say('まどの したで そとを 見る'); await sleep(500); await play(pet, 'ear'); } },
    { id:'sniffa', w:() => 7, run:async () => { await walkTo(rnd(30, 70), rnd(76, 88)); say('ゆかの においを かぐ'); await sleep(300); await play(pet, 'sniff'); } },
    { id:'bowl', w:() => 8, run:async () => { await walkTo(SPOT.bowl.x + 14, SPOT.bowl.y - 2); await roomPose('sit'); say('ごはん皿の まえで まつ'); await sleep(500); await play(pet, 'lick'); } },
    { id:'side', w:() => P.pose === 'side' ? 0 : (cat() ? 12 : 7), run:async () => { await walkTo(SPOT.rug.x, SPOT.rug.y); await roomPose('side'); say('ラグで ごろん'); } },
    { id:'beg', w:() => P.pose === 'beg' ? 0 : 5, run:async () => { if (P.pose !== 'sit'){ await roomPose('sit'); await sleep(500); } await roomPose('beg'); say('おねだり', 'なにか ほしいな'); } },
  ];
  const choose = list => { const ws = list.map(a => Math.max(0, a.w())); let r = Math.random() * ws.reduce((a, b) => a + b, 0); for (let i = 0; i < list.length; i++){ if ((r -= ws[i]) < 0) return list[i]; } return list[0]; };
  const fits = id => { const g = GESTURE[id]; return g.poses.includes(P.pose) && (g.sp === 'both' || g.sp === (cat() ? 'cat' : 'dog')) && kept('g-' + id); };
  let poseT = null, gestT = null;
  const loopPose = async () => {
    clearTimeout(poseT);
    if (P.busy && !calm()){ poseT = setTimeout(loopPose, 700); return; }   /* しぐさの とちゅうなら すこし まつ */
    if (!calm()){
      P.busy = true;
      const list = ACTS.filter(a => { const need = { stand:1, down:1, sleep:1, side:1, beg:1 }[a.id]; return (!need || kept('pose-' + a.id)) && (a.id !== 'walk' && a.id !== 'win' && a.id !== 'sniffa' || kept('pose-walk')) && !P.acts.includes(a.id); });
      const a = choose(list); P.acts = [a.id, ...P.acts].slice(0, 3);
      await a.run();
      P.busy = false;
    }
    const s = SPEED[st.speed]; poseT = setTimeout(loopPose, rnd(s.pose[0], s.pose[1]));
  };
  const loopGest = async () => {
    clearTimeout(gestT);
    if (!P.busy && !calm()){
      const ids = Object.keys(GESTURE).filter(id => fits(id) && !P.last.includes(id));
      if (ids.length){ const id = pick(ids); P.last = [id, ...P.last].slice(0, 2); P.busy = true; say(({ sit:'すわって', stand:'たって', down:'ふせて', sleep:'ねたまま', side:'ごろんして', beg:'おねだりしながら' })[P.pose] + ' ' + GESTURE[id].ja); await play(pet, id); P.busy = false; }
    }
    const s = SPEED[st.speed]; gestT = setTimeout(loopGest, rnd(s.gest[0], s.gest[1]));
  };
  /* タップ：耳ぴく・しっぽ ぴん・おねだり を まぜる。こすって 8回で ねこは ごろん、いぬは ふせて しっぽ ぶんぶん */
  let tapLast = '', rubs = 0, rubX = null, rubT = null;
  const react = async () => {
    if (P.busy || Date.now() - P.rubbed < 700) return;
    P.busy = true;
    if (P.pose !== 'sit' && P.pose !== 'stand'){ await roomPose('sit'); say('おきた！'); await sleep(500); }
    const opts = (P.pose === 'sit' ? ['ear', 'tailup', 'beg'] : ['ear', 'tailup']).filter(x => x !== tapLast); const r = pick(opts); tapLast = r;
    fx('h', HEART);
    if (r === 'beg'){ await roomPose('beg'); say('タップ → おねだり'); await sleep(1600); await roomPose('sit'); }
    else { say('タップ → ' + GESTURE[r].ja); await play(pet, r); }
    P.busy = false;
  };
  pet.addEventListener('click', react);
  pet.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); react(); } });
  pet.addEventListener('pointermove', e => {
    if (e.pointerType === 'mouse' && !e.buttons) return;
    if (rubX != null && Math.abs(e.clientX - rubX) > 18){
      rubs++; P.rubbed = Date.now(); fx('h', HEART); clearTimeout(rubT); rubT = setTimeout(() => { rubs = 0; }, 1500);
      if (rubs >= 8 && !P.rub && !P.busy){
        rubs = 0; P.rub = true; P.busy = true;
        (async () => {
          if (cat() && kept('pose-side')){ await roomPose('side'); say('なでなで 8回 → ごろん'); }
          else { await roomPose('down'); pet.classList.add('wag-fast'); say('なでなで 8回 → ふせて しっぽ ぶんぶん'); }
          await sleep(3600); pet.classList.remove('wag-fast'); await roomPose('sit'); P.busy = false; P.rub = false;
        })();
      }
      rubX = e.clientX;
    } else if (rubX == null) rubX = e.clientX;
  });
  pet.addEventListener('pointerleave', () => { rubX = null; });

  /* ===== えらぶ・まとめ ===== */
  const renderAll = redraw => {
    if (redraw) $$('#room .pp, #poses .pp, #gests .pp, #sides .pp').forEach(el => { const a = el.querySelector('.art'); if (a) a.outerHTML = art(); });
    $$('#poses .card, #gests .card').forEach(c => {
      const k = c.dataset.k, on = k === 'pose-sit' || kept(k);
      c.classList.toggle('off', !on);
      const b = c.querySelector('.keep'); if (b){ b.textContent = on ? 'いれる ✓' : 'いらない'; b.setAttribute('aria-pressed', String(on)); }
    });
    $$('#sides .card').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.side === st.side)));
    drawSides();
    if (P.pose === 'side') setPose(pet, 'side', false);
    $$('#poses .pp').forEach(el => { if (el.dataset.pose === 'side') setPose(el, 'side', false); });
    $$('.opts').forEach(o => o.querySelectorAll('.opt').forEach(b => b.setAttribute('aria-pressed', String(st[o.dataset.g] === b.dataset.v))));
    const s = SPEED[st.speed];
    $('#speedNote').textContent = `${s.ja}：体勢が かわるのは ${s.pose[0] / 1000}〜${s.pose[1] / 1000}秒に 1回、小さな しぐさは ${s.gest[0] / 1000}〜${s.gest[1] / 1000}秒に 1回 くらい。` + (st.speed === 'calm' ? '（おすすめ）' : '');
    const inP = POSES.filter(p => p.id !== 'sit' && kept('pose-' + p.id)).map(p => p.ja), outP = POSES.filter(p => p.id !== 'sit' && !kept('pose-' + p.id)).map(p => p.ja);
    const inG = gIds.filter(id => kept('g-' + id)).map(id => GESTURE[id].ja), outG = gIds.filter(id => !kept('g-' + id)).map(id => GESTURE[id].ja);
    $('#sumText').value = [
      'うちのこの 体勢と しぐさ（見本 2 で えらんだ もの）',
      '体勢：' + (inP.length ? inP.join('・') : 'なし') + (outP.length ? `（いらない：${outP.join('・')}）` : '（ぜんぶ）'),
      'しぐさ：' + (outG.length ? inG.join('・') + `（いらない：${outG.join('・')}）` : 'ぜんぶ ' + inG.length + 'こ'),
      'ごろん：' + SIDE_JA[st.side],
      'うごく 多さ：' + SPEED[st.speed].ja,
      'うしろ向き（だんかい 4）：' + BACK_JA[st.back],
    ].join('\n');
  };
  const setOpt = (g, v) => { st[g] = v; store.set(g, v); renderAll(g === 'kid'); if (g === 'speed'){ loopPose(); loopGest(); } };
  $$('.opts').forEach(o => o.addEventListener('click', e => { const b = e.target.closest('.opt'); if (b) setOpt(o.dataset.g, b.dataset.v); }));
  document.addEventListener('click', e => {
    const b = e.target.closest('.keep'); if (!b) return;
    const k = b.dataset.keep; st.keep[k] = !kept(k); store.set('keep', st.keep); renderAll();
  });
  $('#copy').addEventListener('click', async () => {
    const t = $('#sumText').value, msg = $('#copied');
    try { await navigator.clipboard.writeText(t); msg.textContent = 'コピーしたよ'; }
    catch(e){ const a = $('#sumText'); a.focus(); a.select(); msg.textContent = 'えらんで コピーしてね'; }
    setTimeout(() => { msg.textContent = ''; }, 2600);
  });

  place(); renderAll(true); setPose(pet, 'sit', false); say('すわっている');
  setTimeout(loopGest, 2200); setTimeout(loopPose, 4200);
  if (calm()) say('すわっている', '（うごきを へらす 設定なので、うごきは とまっています）');
}
