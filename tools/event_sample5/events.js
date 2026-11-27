/* ===== あたらしい 季節イベントの 下書き（見本 5。2026-11-27）=====
   入れる ときは：EV は src/js_data3.js の EVENTS、Wr は EVENT_WEAR、きせかえの 絵は src/js_wear.js の wearSvg（あたまの kind）、
   おやつの 絵は src/js_data2.js の treatIcon、かざりは src/js_features.js の SEASON_DECOR と garland（'leaf'）、天気は weatherOf と head.html の .weather.w-leaves へ。
   どれも 期間は いまの 10この イベントと かさならない */
const NEW_EVENTS = [
  EV('momiji','もみじがり',1101,1130,'ev_acorn',{ id:'ev_momijicookie', ja:'もみじクッキー', icon:['momijicookie'] },'momiji','もみじが まっかだね'),
  EV('toshikoshi','としこし',1226,1231,'ev_mikanhat',{ id:'ev_mikanjelly', ja:'みかんゼリー', icon:['mikanjelly'] },'toshikoshi','ことしも いっしょに いてくれて ありがとう'),
  EV('setsubun','せつぶん',201,203,'ev_oni',{ id:'ev_mamebolo', ja:'まめボーロ', icon:['balls','#EED19A','#B08A4E'] },'setsubun','おには そと！ ふくは うち！'),
  EV('hina','ひなまつり',301,303,'ev_hishiribbon',{ id:'ev_arare', ja:'ひなあられ', icon:['arare'] },'hina','ひなまつりだよ！ おひなさま、きれいだね'),
];
const NEW_WEAR = [
  Wr('ev_acorn','head','どんぐりぼうし',0,'acorn'),
  Wr('ev_mikanhat','head','みかんのぼうし',0,'mikanhat'),
  Wr('ev_oni','head','おにの つの',0,'oni'),
  Wr('ev_hishiribbon','head','ひしもちリボン',0,'hishi'),
];
NEW_WEAR.forEach(w => { w.ev = true; WEAR.push(w); WEAR_BY_ID[w.id] = w; });
/* まどの 天気：もみじがり＝おちば、としこし＝雪（せつぶんは 2月なので いまでも 雪） */
const NEW_WEATHER = { momiji:'leaves', toshikoshi:'snow', setsubun:'snow', hina:null };

/* あたらしい あたまの きせかえ（wearSvg の 中の あたまの kind と 同じ 書き方。HX 120・HY 100） */
function newHeadWear(kind, HY, SW){
  const ink = c => mix(c, '#2A1E2A', .42);
  if (kind === 'acorn'){
    /* どんぐりの ぼうし：ぼうしの ぶぶん（かさ）の うろこ もようと、上に ちょこんと じく。すこし かたむける */
    const y = HY - 34;
    const cap = `M82 ${y}C80 ${y - 28} 98 ${y - 38} 120 ${y - 38}C142 ${y - 38} 160 ${y - 28} 158 ${y}Q149 ${y + 6} 139 ${y + 1}Q129 ${y + 7} 120 ${y + 1}Q111 ${y + 7} 101 ${y + 1}Q91 ${y + 6} 82 ${y}Z`;
    let scales = '';
    [[y - 27, 100, 140], [y - 18, 92, 148], [y - 9, 88, 152]].forEach(([yy, a, b], r) => {
      for (let x = a + (r % 2 ? 5 : 0); x <= b - 8; x += 10) scales += `<path d="M${x} ${yy}q4 5 8 0" fill="none" stroke="#C99466" stroke-width="2" stroke-linecap="round"/>`;
    });
    return `<g transform="rotate(-8 120 ${y - 10})"><path d="${cap}" fill="#9A6A43" stroke="#5E3B22" stroke-width="${SW}" stroke-linejoin="round"/>${scales}` +
      `<path d="M120 ${y - 38}q1-8 6-12" fill="none" stroke="#5E3B22" stroke-width="${5 + SW}" stroke-linecap="round"/><path d="M120 ${y - 38}q1-8 6-12" fill="none" stroke="#8B5A3C" stroke-width="5" stroke-linecap="round"/></g>`;
  }
  if (kind === 'mikanhat'){
    /* みかんの ぼうし：まるい みかん色の ぼうし・ぶつぶつ・はっぱと へた */
    const y = HY - 32;
    const dots = [[100, y - 22], [114, y - 30], [132, y - 28], [146, y - 18], [108, y - 12], [126, y - 16], [140, y - 8], [94, y - 8]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.8" fill="#F7BE5E"/>`).join('');
    return `<path d="M80 ${y}C80 ${y - 46} 160 ${y - 46} 160 ${y}Q120 ${y + 10} 80 ${y}Z" fill="#F5A031" stroke="#B8691C" stroke-width="${SW}" stroke-linejoin="round"/>${dots}` +
      `<path d="M92 ${y - 18}q8-14 22-18" fill="none" stroke="#FFFFFF" stroke-opacity=".45" stroke-width="5" stroke-linecap="round"/>` +
      `<path d="M118 ${y - 36}c0-4 2-7 6-8" stroke="#5C7A2E" stroke-width="4" stroke-linecap="round" fill="none"/>` +
      `<path d="M124 ${y - 42}c8-7 18-6 21 0-7 6-15 6-21 0z" fill="#6DB35A" stroke="#3E7A30" stroke-width="2" stroke-linejoin="round"/><path d="M126 ${y - 42}q8-2 16 0" stroke="#3E7A30" stroke-width="1.4" fill="none"/>`;
  }
  if (kind === 'oni'){
    /* おにの つの：赤い カチューシャに きいろの つの 2本（しま もよう）。こわくない 大きさ */
    const band = `M76 ${HY - 22}Q120 ${HY - 66} 164 ${HY - 22}`;
    const horn = (bx, dir) => {
      const tip = bx + dir * -6, y0 = HY - 37;
      const d = `M${bx - 9} ${y0}Q${bx - 7} ${y0 - 24} ${tip} ${y0 - 36}Q${bx + 7} ${y0 - 22} ${bx + 9} ${y0}Q${bx} ${y0 + 4} ${bx - 9} ${y0}Z`;
      return `<path d="${d}" fill="#F5C843" stroke="#A8822A" stroke-width="2.2" stroke-linejoin="round"/>` +
        `<path d="M${bx - 7.5} ${y0 - 9}Q${bx} ${y0 - 6} ${bx + 7.5} ${y0 - 9}M${bx - 6} ${y0 - 19}Q${bx} ${y0 - 16.5} ${bx + 5.5} ${y0 - 19}" fill="none" stroke="#C98A2A" stroke-width="2.4" stroke-linecap="round"/>`;
    };
    return `<path d="${band}" fill="none" stroke="#9A2E36" stroke-width="${5 + SW}" stroke-linecap="round" opacity=".55"/><path d="${band}" fill="none" stroke="#E8505A" stroke-width="5" stroke-linecap="round"/>` +
      horn(98, -1) + horn(142, 1);
  }
  if (kind === 'hishi'){
    /* ひしもちリボン：ももいろ・しろ・みどりの 3だんの リボン（ひしもちの 色） */
    const loops = 'M0 0L-18-11Q-23 0-18 11ZM0 0L18-11Q23 0 18 11Z';
    const id = 'hs' + (++PET_SEQ);
    return `<g transform="translate(150 ${HY - 44}) rotate(14)"><defs><clipPath id="${id}"><path d="${loops}"/></clipPath></defs>` +
      `<g clip-path="url(#${id})"><rect x="-24" y="-13" width="48" height="9" fill="#F497B0"/><rect x="-24" y="-4" width="48" height="8" fill="#FFFFFF"/><rect x="-24" y="4" width="48" height="9" fill="#8CC26A"/></g>` +
      `<path d="${loops}" fill="none" stroke="#9A5A6E" stroke-width="${SW}" stroke-linejoin="round"/>` +
      `<circle cx="0" cy="0" r="5.5" fill="#FFFFFF" stroke="#9A5A6E" stroke-width="${SW}"/><circle cx="0" cy="0" r="2.2" fill="#F497B0"/></g>`;
  }
  return '';
}
/* wearSvg を 包む（見本だけ。入れる ときは wearSvg の あたまの kind に 書く） */
const _wearSvg = wearSvg;
wearSvg = function(W, x){
  const h = WEAR_BY_ID[W.head];
  if (h && ['acorn','mikanhat','oni','hishi'].includes(h.kind)){
    const out = _wearSvg(Object.assign({}, W, { head:null }), x);
    out.head = newHeadWear(h.kind, x.HY, x.SW);
    return out;
  }
  return _wearSvg(W, x);
};

/* あたらしい おやつの 絵（treatIcon と 同じ 48×48） */
const _treatIcon = treatIcon;
treatIcon = function(t){
  const k = (t.icon || [])[0];
  if (k === 'momijicookie') return '<path d="M24 7l3.2 7.4 6.4-3.4-1.8 7.6 7.6.6-5.4 5.2 4.6 4.4-8-.2-.8 8.4L24 31.6l-5.8 5.4-.8-8.4-8 .2 4.6-4.4-5.4-5.2 7.6-.6-1.8-7.6 6.4 3.4z" fill="#EE9A57" stroke="#A85A2A" stroke-width="2" stroke-linejoin="round"/><path d="M24 14v17M24 22l-6-4M24 22l6-4M24 27l-7 1M24 27l7 1" stroke="#F7C48A" stroke-width="1.8" stroke-linecap="round"/><path d="M24 37v6" stroke="#A85A2A" stroke-width="2.4" stroke-linecap="round"/>';
  if (k === 'mikanjelly') return '<path d="M11 22h26l-3 16H14z" fill="#F7B24A" stroke="#C0761E" stroke-width="2" stroke-linejoin="round" opacity=".92"/><path d="M15 30q4-3 8 0t8 0" stroke="#FCD58E" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M9 22h30" stroke="#C0761E" stroke-width="3" stroke-linecap="round"/><circle cx="29" cy="15" r="6" fill="#F5A031" stroke="#B8691C" stroke-width="1.8"/><path d="M29 9c3-3 7-2 8 0-3 2-6 2-8 0z" fill="#6DB35A"/>';
  if (k === 'arare') return [[14,30,'#F497B0'],[22,34,'#FFFFFF'],[30,31,'#8CC26A'],[19,22,'#8CC26A'],[28,22,'#F497B0'],[35,26,'#FFFFFF'],[24,14,'#FFFFFF'],[11,22,'#FFFFFF']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="4.6" fill="${c}" stroke="${c === '#FFFFFF' ? '#C9B9B0' : mix(c, '#2A1E2A', .3)}" stroke-width="1.6"/>`).join('');
  return _treatIcon(t);
};

/* ガーランド（js_features.js の garland と 同じ。'leaf'＝もみじの はっぱ を 足した） */
function garland2(shape, cols){
  const W = 100, pts = 11;
  let s = `<path d="M0 3Q50 14 100 3" stroke="#B9A79A" stroke-width=".6" fill="none"/>`;
  for (let i = 1; i < pts; i++){
    const x = i * W / pts, t = x / W, y = 3 + 11 * 4 * t * (1 - t) * .5 + 1;
    const c = cols[i % cols.length];
    if (shape === 'flag') s += `<path d="M${(x - 3).toFixed(1)} ${y.toFixed(1)}h6l-3 6z" fill="${c}"/>`;
    else if (shape === 'ball') s += `<circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="2.4" fill="${c}"/>`;
    else if (shape === 'flower') s += `<circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="2.6" fill="${c}"/><circle cx="${x.toFixed(1)}" cy="${(y + 2.5).toFixed(1)}" r="1" fill="#F5C04A"/>`;
    else if (shape === 'leaf') s += `<path transform="translate(${x.toFixed(1)} ${(y + 3).toFixed(1)}) scale(.16)" d="M0-17l3.2 7.4 6.4-3.4-1.8 7.6 7.6.6-5.4 5.2 4.6 4.4-8-.2-.8 8.4L0 7.6-5.8 13-6.6 4.6l-8 .2 4.6-4.4-5.4-5.2 7.6-.6-1.8-7.6 6.4 3.4z" fill="${c}"/>`;
  }
  return `<svg class="garland" viewBox="0 0 100 18" preserveAspectRatio="none" aria-hidden="true">${s}</svg>`;
}
/* おへやの かざり（SEASON_DECOR と 同じ 形：g＝ガーランド、item＝おきもの） */
const NEW_DECOR = {
  momiji:{ g:['leaf', ['#E8505A','#F0A04B','#F5C843','#D9772E']],
    item:'<svg viewBox="0 0 80 70"><path d="M8 66c4-14 18-22 32-22s28 8 32 22z" fill="#E7A05A" stroke="#A8642A" stroke-width="2.2"/>' +
      [[20,56,'#E8505A',-20],[34,50,'#F5C843',10],[48,52,'#D9772E',-8],[60,58,'#E8505A',24],[28,62,'#F0A04B',0],[52,63,'#F5C843',-30]].map(([x, y, c, r]) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(.42)" d="M0-17l3.2 7.4 6.4-3.4-1.8 7.6 7.6.6-5.4 5.2 4.6 4.4-8-.2-.8 8.4L0 7.6-5.8 13-6.6 4.6l-8 .2 4.6-4.4-5.4-5.2 7.6-.6-1.8-7.6 6.4 3.4z" fill="${c}" stroke="${mix(c, '#2A1E2A', .35)}" stroke-width="2.4" stroke-linejoin="round"/>`).join('') +
      '<g transform="rotate(-14 50 40)"><path d="M30 40c2-8 14-12 26-9 6 2 6 9 0 12-10 5-27 6-26-3z" fill="#9B5C9E" stroke="#6E3E73" stroke-width="2.2"/><ellipse cx="58" cy="35" rx="3.6" ry="5.4" fill="#F7D774" stroke="#6E3E73" stroke-width="2"/></g>' +
      '<path d="M44 26q-3-6 0-12M52 24q-3-6 0-12" stroke="#BDB5C8" stroke-width="2" fill="none" stroke-linecap="round"/></svg>' },
  toshikoshi:{ g:null,
    item:'<svg viewBox="0 0 80 70"><path d="M6 66l6-26h56l6 26z" fill="#E8505A" stroke="#9A2E36" stroke-width="2.2" stroke-linejoin="round"/>' +
      '<path d="M14 50h52M10 60h60" stroke="#F7C1C6" stroke-width="2" stroke-dasharray="4 4"/>' +
      '<rect x="4" y="34" width="72" height="8" rx="2" fill="#C9A97A" stroke="#8B6A3E" stroke-width="2.2"/>' +
      '<path d="M26 34c0-6 6-8 14-8s14 2 14 8z" fill="#E6D2AE" stroke="#8B6A3E" stroke-width="2"/>' +
      [[32,24],[44,22],[38,16]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6" fill="#F5A031" stroke="#B8691C" stroke-width="1.8"/><path d="M${x} ${y - 6}l1-2" stroke="#3E7A30" stroke-width="2" stroke-linecap="round"/>`).join('') + '</svg>' },
  setsubun:{ g:['flag', ['#E8505A','#5B8FD9','#F5C843']],
    item:'<svg viewBox="0 0 80 70"><path d="M6 40h40l-3 26H9z" fill="#D9B886" stroke="#8B6A3E" stroke-width="2.2" stroke-linejoin="round"/><path d="M6 40h40" stroke="#8B6A3E" stroke-width="3"/>' +
      [[14,38],[21,36],[28,38],[35,36],[18,32],[30,32],[25,30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#EED19A" stroke="#B08A4E" stroke-width="1.4"/>`).join('') +
      '<g transform="rotate(10 60 40)"><ellipse cx="60" cy="42" rx="16" ry="18" fill="#E8505A" stroke="#9A2E36" stroke-width="2.2"/><path d="M50 26l-3-12 7 9zM70 26l3-12-7 9z" fill="#F5C843" stroke="#A8822A" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M50 38q4-4 8 0M62 38q4-4 8 0" stroke="#2E2A33" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M53 49q7 5 14 0" stroke="#2E2A33" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M55 50l1.4 3 1.4-3M62 50l1.4 3 1.4-3" fill="#FFFFFF"/>' +
      '<path d="M46 30q-4-8 2-14M74 30q4-8-2-14" stroke="#5A3A24" stroke-width="3" fill="none" stroke-linecap="round"/></g></svg>' },
  hina:{ g:['flower', ['#F7A8C0','#FFFFFF','#FBC9D8']],
    item:'<svg viewBox="0 0 80 80"><path d="M2 78h76l-4-14H6z" fill="#E8505A" stroke="#9A2E36" stroke-width="2.2" stroke-linejoin="round"/><path d="M8 64h64" stroke="#F5C843" stroke-width="2"/>' +
      '<path d="M10 62l6-26h16l6 26z" fill="#2E3A6E" stroke="#1C2448" stroke-width="2" stroke-linejoin="round"/><path d="M18 36l6 26M30 36l-6 26" stroke="#5B6FB0" stroke-width="2"/><circle cx="24" cy="28" r="9" fill="#FBF3EA" stroke="#C9B9B0" stroke-width="2"/><path d="M15 25q9-10 18 0" fill="#2E2A33"/><rect x="21" y="13" width="6" height="9" rx="2" fill="#2E2A33"/><path d="M21 31q3 2 6 0" stroke="#3A2A33" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      '<path d="M42 62l6-26h16l6 26z" fill="#E8505A" stroke="#9A2E36" stroke-width="2" stroke-linejoin="round"/><path d="M50 36l6 26M62 36l-6 26" stroke="#F7C1C6" stroke-width="2"/><path d="M44 52h24" stroke="#F5C843" stroke-width="3"/><circle cx="56" cy="28" r="9" fill="#FBF3EA" stroke="#C9B9B0" stroke-width="2"/><path d="M47 27q9-12 18 0" fill="#2E2A33"/><path d="M50 18l6-6 6 6" fill="#F5C843" stroke="#A8822A" stroke-width="1.4" stroke-linejoin="round"/><path d="M53 31q3 2 6 0" stroke="#3A2A33" stroke-width="1.4" fill="none" stroke-linecap="round"/>' +
      '<circle cx="20" cy="31" r="2" fill="#FF9DB2" opacity=".7"/><circle cx="28" cy="31" r="2" fill="#FF9DB2" opacity=".7"/><circle cx="52" cy="31" r="2" fill="#FF9DB2" opacity=".7"/><circle cx="60" cy="31" r="2" fill="#FF9DB2" opacity=".7"/></svg>' },
};
