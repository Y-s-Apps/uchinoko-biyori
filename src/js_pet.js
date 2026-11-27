/* ===== color utils ===== */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
/* 表（BREED_BY_ID・WEAR_BY_ID など）の 知っている ID か。WEAR_BY_ID[id] の「あるか」だけだと constructor・__proto__ や 配列 ["id"] も通るため（診断 1-7）。
   Object.hasOwn と同じ意味で、古い iPhone でも動く書き方 */
const hasId = (t, id) => typeof id === 'string' && Object.prototype.hasOwnProperty.call(t, id);
function isHex(v){ return typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim()); }
function hexToRgb(h){ h = h.trim().replace('#',''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function rgbToHex(r, g, b){ return '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join(''); }
function mix(a, b, t){ const A = hexToRgb(a), C = hexToRgb(b); return rgbToHex(A[0] + (C[0] - A[0]) * t, A[1] + (C[1] - A[1]) * t, A[2] + (C[2] - A[2]) * t); }
function lum(h){ const [r, g, b] = hexToRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }
const lighten = (c, t) => mix(c, '#ffffff', t);
const normHex = h => { const [r, g, b] = hexToRgb(h); return rgbToHex(r, g, b); };

/* ===== look normalisation ===== */
const ENUMS = {
  ear: ['pointy','big','small','floppy','long','semi','fold'],
  coat: ['smooth','fluffy','curly','long'],
  muzzle: ['short','medium','long'],
  tail: ['curl','plume','straight','stub','long','fluffy'],
  face: ['muzzle','lower','mask','hachiware','blaze'],
  legs: ['normal','short'],
};
function normalizeLook(raw){
  raw = raw || {};
  const sp = raw.species === 'cat' ? 'cat' : 'dog';
  const known = hasId(BREED_BY_ID, raw.breedId);
  let preset = known ? BREED_BY_ID[raw.breedId] : null;
  if (!preset || preset.sp !== sp) preset = BREED_BY_ID[sp === 'cat' ? 'mix_cat' : 'mix_dog'];
  const P = preset.look;
  const L = { species: sp, breedId: (known ? raw.breedId : preset.id) };
  for (const k in ENUMS) L[k] = ENUMS[k].includes(raw[k]) ? raw[k] : P[k];
  const useRaw = raw.colors && isHex(raw.colors.main);
  const src = useRaw ? raw.colors : P.colors;
  const srcM = useRaw ? (raw.marks || {}) : (P.marks || {});
  const hx = (v, d) => isHex(v) ? normHex(v) : d;
  const c = {};
  c.main = hx(src.main, '#C9A27A');
  c.body = hx(src.body, c.main);
  c.ear = hx(src.ear, c.main);
  c.tail = hx(src.tail, c.body);
  c.face = hx(src.face, c.main);
  c.chest = hx(src.chest, c.face === c.main ? c.body : c.face);
  c.paws = hx(src.paws, c.body);
  c.tailTip = hx(src.tailTip, null);
  c.eye = hx(src.eye, sp === 'cat' ? '#E3B04A' : '#2B1E1A');
  c.nose = hx(src.nose, sp === 'cat' ? (lum(c.main) < .06 ? '#5A4650' : '#F0A0AA') : '#2E2328');
  const m = {};
  for (const k of ['stripes','spots','patchL','patchR','brows','mask','saddle']) m[k] = hx(srcM[k], null);
  m.bodyPatch = !!srcM.bodyPatch && !!(m.patchL || m.patchR);
  L.colors = c; L.marks = m;
  return L;
}

/* ===== ここから 下は 絵（renderPet と その 道具）。サーバーの game.js には 入れない（tools/build_server.py が この 行で 切る。2026-11-26）。
   サーバーは 絵を かかないので、絵を かえても サーバーの デプロイは いらない。サーバーで つかう 関数（normalizeLook・hasId・色）は この 行より 上に 書く ===== */
/* ===== geometry helpers ===== */
const f1 = n => Math.round(n * 10) / 10;
function ellD(cx, cy, rx, ry){ return `M${f1(cx - rx)} ${f1(cy)}a${rx} ${ry} 0 1 0 ${f1(2 * rx)} 0a${rx} ${ry} 0 1 0 ${f1(-2 * rx)} 0Z`; }
function blob(cx, cy, rx, ry, n, amp){
  let d = '';
  const k = 1 + amp * 2.2;
  for (let i = 0; i < n; i++){
    const a0 = -Math.PI / 2 + i / n * 2 * Math.PI, a1 = -Math.PI / 2 + (i + 1) / n * 2 * Math.PI, am = (a0 + a1) / 2;
    if (i === 0) d += `M${f1(cx + rx * Math.cos(a0))} ${f1(cy + ry * Math.sin(a0))}`;
    d += `Q${f1(cx + rx * k * Math.cos(am))} ${f1(cy + ry * k * Math.sin(am))} ${f1(cx + rx * Math.cos(a1))} ${f1(cy + ry * Math.sin(a1))}`;
  }
  return d + 'Z';
}
const MIRROR = 'matrix(-1 0 0 1 240 0)';
const EARS = {
  pointy: { o:'M66 74C60 48 62 26 70 14C86 22 100 38 108 54Z', i:'M74 62C71 46 72 34 76 26C85 33 93 42 98 52Z' },
  big:    { o:'M60 82C48 52 48 18 58 4C82 12 100 32 110 56Z', i:'M69 68C62 46 62 26 65 16C79 24 91 38 98 52Z' },
  small:  { o:'M72 66C70 52 72 40 78 32C88 38 96 46 102 54Z', i:'M78 60C77 51 78 45 81 41C87 45 91 49 94 53Z' },
  floppy: { o:'M98 54C80 48 58 56 48 76C38 96 40 124 52 136C62 146 74 136 78 120C82 100 88 76 98 54Z' },
  long:   { o:'M98 54C78 46 54 56 44 80C34 106 36 140 46 160C56 176 76 168 80 146C84 120 88 80 98 54Z' },
  semi:   { o:'M70 70C66 54 72 40 86 36C98 34 106 44 108 54C100 56 92 62 88 72C84 78 76 78 70 70Z' },
  fold:   { o:'M78 62C78 50 88 44 100 48C104 56 98 64 88 68C82 70 78 68 78 62Z' },
};
let PET_SEQ = 0;

/* ===== the chibi pet ===== */
function renderPet(rawLook, opts = {}){
  const L = normalizeLook(rawLook);
  const c = L.colors, m = L.marks, cat = L.species === 'cat';
  const id = 'pt' + (++PET_SEQ);
  const SW = 2.4;
  const ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const fluffy = L.coat === 'fluffy' || L.coat === 'long', curly = L.coat === 'curly';
  const HX = 120, HY = 100, hrx = cat ? 62 : 60, hry = cat ? 50 : 51;
  const headD = curly ? blob(HX, HY, hrx, hry, 18, .07) : fluffy ? blob(HX, HY, hrx + 1, hry + 1, 16, .05) : ellD(HX, HY, hrx, hry);
  const BX = 120, BY = 182, brx = cat ? 42 : 46, bry = 40;
  const bodyD = curly ? blob(BX, BY, brx, bry, 16, .07) : fluffy ? blob(BX, BY, brx + 1, bry, 14, .05) : ellD(BX, BY, brx, bry);
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* tail */
  let tail = '';
  const tc = c.tail;
  if (L.tail === 'curl'){
    tail = thick('M150 190C176 196 194 176 186 156C180 140 160 140 158 154C157 164 168 168 174 160', tc, 17);
    if (c.tailTip) tail += `<circle cx="174" cy="160" r="8" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'plume'){
    tail = `<path d="${blob(176, 160, 24, 30, 12, .08)}" ${S(tc)}/>`;
  } else if (L.tail === 'straight'){
    const d = 'M150 196C172 194 186 178 192 152';
    tail = thick(d, tc, fluffy ? 15 : 12);
    if (c.tailTip) tail += `<circle cx="192" cy="152" r="${fluffy ? 7.5 : 6}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'stub'){
    tail = `<ellipse cx="163" cy="204" rx="9" ry="8" ${S(tc)}/>`;
  } else {
    const d = 'M154 206C188 210 198 186 192 160C189 146 194 136 202 134';
    const w = L.tail === 'fluffy' ? 22 : 13;
    tail = thick(d, tc, w);
    if (m.stripes) tail += `<path d="${d}" fill="none" stroke="${m.stripes}" stroke-width="${w}" stroke-dasharray="5 11" stroke-dashoffset="-14"/>`;
    if (c.tailTip) tail += `<circle cx="202" cy="134" r="${w / 2}" fill="${c.tailTip}"/>`;
  }

  /* body */
  const hx1 = cat ? 84 : 80, hx2 = 240 - hx1, hrr = cat ? 19 : 22;
  const haunchCol = m.saddle || c.body;
  const legTop = L.legs === 'short' ? 196 : 176;
  const chestFill = c.chest === c.body ? lighten(c.body, lum(c.body) > .7 ? 0 : .1) : c.chest;
  let body = `<path d="${bodyD}" ${S(c.body)}/>`;
  body += `<g clip-path="url(#${id}b)">`;
  if (m.saddle) body += `<ellipse cx="120" cy="150" rx="62" ry="26" fill="${m.saddle}"/>`;
  if (m.bodyPatch){
    if (m.patchR) body += `<ellipse cx="148" cy="174" rx="19" ry="15" fill="${m.patchR}"/>`;
    if (m.patchL) body += `<ellipse cx="90" cy="196" rx="16" ry="12" fill="${m.patchL}"/>`;
  }
  body += `<ellipse cx="120" cy="164" rx="${cat ? 20 : 23}" ry="25" fill="${chestFill}"/>`;
  if (m.stripes) body += `<path d="M78 166q10 3 17-5M76 182q12 3 19-5M162 166q-10 3-17-5M164 182q-12 3-19-5" fill="none" stroke="${m.stripes}" stroke-width="5" stroke-linecap="round"/>`;
  if (m.spots) body += [[92,170,5],[148,166,6],[141,196,4.5],[99,199,5],[160,188,4],[82,186,3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  body += `</g><path d="${bodyD}" fill="none" stroke="${ol(c.body)}" stroke-width="${SW}"/>`;
  /* おしり・うしろあしの 先は 体勢（たつ・ふせる）で うごかす グループ（docs/MOTION_DESIGN.md 4-2。見た目は かえない） */
  const haunch = (x, k) => `<g class="pv-haunch pv-haunch${k}">` + (fluffy || curly ? `<path d="${blob(x, 206, hrr, 16, 9, .07)}" ${S(haunchCol)}/>` : `<ellipse cx="${x}" cy="206" rx="${hrr}" ry="16" ${S(haunchCol)}/>`) + '</g>';
  /* うしろあしの 先は 左右べつ（pv-footL・pv-footR。しぐさ「かく」で 上げる ほうを かくす） */
  const feet = `<g class="pv-feet"><g class="pv-footL"><ellipse cx="${hx1 - 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g><g class="pv-footR"><ellipse cx="${hx2 + 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g></g>`;
  /* 前あしは 腕（pv-arm*）と 足先（pv-paw*）に わける */
  const legPart = (x, px, toes, sx, k) => `<g class="pv-arm${k}"><rect x="${x}" y="${legTop}" width="19" height="${218 - legTop}" rx="9.5" ${S(c.body)}/>` +
    (m.stripes && L.legs !== 'short' ? `<path d="M${sx} 194h6M${sx} 202h6" stroke="${m.stripes}" stroke-width="3.5" stroke-linecap="round"/>` : '') +
    `</g><g class="pv-paw${k}"><ellipse cx="${px}" cy="217" rx="12" ry="7.5" ${S(c.paws)}/>` +
    `<path d="M${toes[0]} 213.5v5M${toes[1]} 213.5v5" stroke="${ol(c.paws)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/></g>`;
  /* 前あし：外がわ（pv-legL・pv-legR）は 体勢、内がわ（*-g）は しぐさ・げい */
  const legs = `<g class="pv-legL"><g class="pv-legL-g">${legPart(99, 108.5, [104.5, 112.5], 101, 'L')}</g></g><g class="pv-legR"><g class="pv-legR-g">${legPart(122, 131.5, [127.5, 135.5], 133, 'R')}</g></g>`;
  /* 体勢・しぐさ用の 部品（docs/MOTION_DESIGN.md 10章。2026-11-26 だんかい 1）。ふだんは display="none" の 属性で 見えない
     （ページの CSS が 効かない うちのこカード・写真立て でも 見えない。CSS の しぐさ・体勢の ときだけ display:inline。
     opacity="0" だと 見えなくても ほかの 線の ふちの ぬり方が すこし かわった＝tools/poses.py が 前の 版と 1px で くらべる）。
     pvx-down＝ふせる・ねる の 前に のばした 前あし、pvx-hind＝かく の うしろ足（頭の 前）、pvx-beg＝おねだり の 胸の 前で まげた 前あし、
     pvx-pawup＝けづくろい の 顔の 前の 前足（beg・pawup は 首の きせかえより 前＝いちばん うしろに かく）、pvx-tongue＝はぁはぁ の 舌、pvx-lick＝ぺろり の 舌 */
  const toes = (x, y) => `<path d="M${x - 4} ${y - 3.5}v5M${x + 4} ${y - 3.5}v5" stroke="${ol(c.paws)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;
  const xDown = [108.5, 131.5].map(x => `<rect x="${x - 9.5}" y="198" width="19" height="18" rx="9.5" ${S(c.body)}/><ellipse cx="${x}" cy="215" rx="12.5" ry="8" ${S(c.paws)}/>${toes(x, 215)}`).join('');
  const xBeg = [[101, -8, 'L'], [139, 8, 'R']].map(([x, r, k]) => `<g class="pvx-beg${k}"><g transform="rotate(${r} ${x} 150)"><rect x="${x - 9.5}" y="146" width="19" height="25" rx="9.5" ${S(c.body)}/><ellipse cx="${x}" cy="172" rx="12.5" ry="8.5" ${S(c.paws)}/>${toes(x, 173)}</g></g>`).join('');
  const xHind = `<g class="pvx-hindleg">` + thick(`M${hx1 - 4} 204C${hx1 - 30} 196 ${hx1 - 34} 164 ${hx1 - 22} 134`, c.body, 17) +
    `<ellipse cx="${hx1 - 21}" cy="128" rx="11" ry="8.5" transform="rotate(-24 ${hx1 - 21} 128)" ${S(c.paws)}/></g>`;
  const xPawup = thick('M134 186C140 168 136 146 128 132', c.body, 17) + `<ellipse cx="126" cy="127" rx="11" ry="9.5" ${S(c.paws)}/>${toes(126, 124)}`;

  /* head */
  const backEar = ['pointy','big','small'].includes(L.ear);
  const earL = (m.patchL && c.ear === c.main) ? m.patchL : c.ear;
  const earR = (m.patchR && c.ear === c.main) ? m.patchR : c.ear;
  const innerCol = col => cat ? mix(col, '#F4AEBB', .7) : mix(col, '#F3C2C9', .55);
  /* 耳は 左右べつの グループ（pv-earL・pv-earR。耳ぴく用）。右は MIRROR の <g> の 外に もう 1つ */
  let earsBack = '', earsFront = '';
  if (backEar){
    const E = EARS[L.ear];
    earsBack = `<g class="pv-earL"><path d="${E.o}" ${S(earL)}/><path d="${E.i}" fill="${innerCol(earL)}"/></g>` +
      `<g class="pv-earR"><g transform="${MIRROR}"><path d="${E.o}" ${S(earR)}/><path d="${E.i}" fill="${innerCol(earR)}"/></g></g>`;
  } else {
    const d = (L.ear === 'long' && (curly || fluffy)) ? blob(66, 112, 22, 46, 12, .07) : EARS[L.ear].o;
    earsFront = `<g class="pv-earL"><path d="${d}" ${S(earL)}/></g><g class="pv-earR"><g transform="${MIRROR}"><path d="${d}" ${S(earR)}/></g></g>`;
  }
  let ruff = '';
  if (fluffy || curly){
    const big = L.ear === 'small' && fluffy;
    const rc = c.chest !== c.body ? mix(c.body, c.chest, .5) : c.body;
    ruff = `<path d="${blob(120, 142, big ? 64 : (cat ? 50 : 54), big ? 34 : 26, 14, .09)}" ${S(rc)}/>`;
  }
  const EX = cat ? [96, 144] : [97, 143], EY = cat ? 97 : 98;
  const NY = cat ? { short:109, medium:111, long:113 }[L.muzzle] : { short:112, medium:116, long:119 }[L.muzzle];
  const mz = { short:[19, 13], medium:[22, 15], long:[24, 17] }[L.muzzle];

  let faceIn = '';
  if (m.patchL) faceIn += `<ellipse cx="90" cy="${HY - 14}" rx="38" ry="36" fill="${m.patchL}"/>`;
  if (m.patchR) faceIn += `<ellipse cx="150" cy="${HY - 14}" rx="38" ry="36" fill="${m.patchR}"/>`;
  const fc = c.face;
  if (L.face === 'lower') faceIn += `<ellipse cx="120" cy="${HY + 30}" rx="${cat ? 50 : 48}" ry="30" fill="${fc}"/>`;
  else if (L.face === 'mask'){
    faceIn += `<ellipse cx="120" cy="${HY + 20}" rx="58" ry="34" fill="${fc}"/><ellipse cx="${EX[0]}" cy="${EY}" rx="16" ry="13" fill="${fc}"/><ellipse cx="${EX[1]}" cy="${EY}" rx="16" ry="13" fill="${fc}"/>`;
    faceIn += `<path d="M112 ${HY - 54}L128 ${HY - 54}L124 ${HY - 8}Q120 ${HY - 2} 116 ${HY - 8}Z" fill="${c.main}"/>`;
  } else if (L.face === 'hachiware'){
    faceIn += `<path d="M120 ${HY - 36}C124 ${HY - 18} 130 ${HY + 6} 150 ${HY + 14}C166 ${HY + 18} 180 ${HY + 14} 190 ${HY + 12}L190 ${HY + 60}L50 ${HY + 60}L50 ${HY + 12}C60 ${HY + 14} 74 ${HY + 18} 90 ${HY + 14}C110 ${HY + 6} 116 ${HY - 18} 120 ${HY - 36}Z" fill="${fc}"/>`;
  } else if (L.face === 'blaze'){
    faceIn += `<path d="M115 ${HY - 54}L125 ${HY - 54}C126 ${HY - 20} 130 ${HY - 2} 146 ${HY + 10}L172 ${HY + 60}L68 ${HY + 60}L94 ${HY + 10}C110 ${HY - 2} 114 ${HY - 20} 115 ${HY - 54}Z" fill="${fc}"/>`;
  }
  if (m.stripes){
    faceIn += `<path d="M112 ${HY - 44}l2 12M120 ${HY - 47}v14M128 ${HY - 44}l-2 12M60 ${HY + 2}l14 3M62 ${HY + 12}h12M180 ${HY + 2}l-14 3M178 ${HY + 12}h-12" fill="none" stroke="${m.stripes}" stroke-width="4.5" stroke-linecap="round"/>`;
  }
  if (m.spots) faceIn += [[100,64,4],[140,60,5],[124,72,3.5],[70,94,4],[170,90,4.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  if (m.brows) faceIn += `<ellipse cx="${EX[0]}" cy="${EY - 16}" rx="5.5" ry="4" fill="${m.brows}"/><ellipse cx="${EX[1]}" cy="${EY - 16}" rx="5.5" ry="4" fill="${m.brows}"/>`;

  // colour around the eyes decides rim + line colour
  const eyeArea = L.face === 'mask' ? fc : (m.patchL || c.main);
  const darkEyes = lum(eyeArea) < .12;
  const lineCol = darkEyes ? '#FFF2EA' : '#2E2430';
  const muzzleFill = c.face === c.main ? lighten(c.main, lum(c.main) > .7 ? 0 : .16) : c.face;
  let muzzle = '';
  if (!cat){
    if (muzzleFill !== c.main) muzzle = `<ellipse cx="120" cy="${NY + 7}" rx="${mz[0]}" ry="${mz[1]}" fill="${muzzleFill}"/>`;
  } else if (muzzleFill !== c.main){
    muzzle = `<circle cx="113.5" cy="${NY + 6}" r="7.5" fill="${muzzleFill}"/><circle cx="126.5" cy="${NY + 6}" r="7.5" fill="${muzzleFill}"/>`;
  }
  let maskSvg = '';
  if (m.mask){
    maskSvg = cat ? `<ellipse cx="120" cy="${NY - 4}" rx="38" ry="32" fill="url(#${id}g)"/>` : `<ellipse cx="120" cy="${NY + 2}" rx="31" ry="26" fill="url(#${id}g)"/>`;
  }
  const muzzleDark = lum(m.mask || muzzleFill) < .12;
  const mouthCol = muzzleDark ? '#F4E6EA' : '#3A2A33';

  // eyes
  const lightIris = lum(c.eye) > .06;
  let eyeOpen = '';
  for (const x of EX){
    eyeOpen += `<g class="pv-eye">`;
    if (darkEyes) eyeOpen += `<ellipse cx="${x}" cy="${EY}" rx="${cat ? 12.5 : 11.5}" ry="${cat ? 14 : 13}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/>`;
    eyeOpen += `<ellipse cx="${x}" cy="${EY}" rx="${cat ? 10 : 9}" ry="${cat ? 11.5 : 10.5}" fill="${c.eye}"/>`;
    if (lightIris) eyeOpen += `<ellipse cx="${x}" cy="${EY + 1}" rx="${cat ? 3.6 : 4.4}" ry="${cat ? 8.5 : 6}" fill="#1E1620"/>`;
    eyeOpen += `<circle cx="${x + 3.4}" cy="${EY - 4.2}" r="3.6" fill="#fff"/><circle cx="${x - 3.4}" cy="${EY + 4.4}" r="1.7" fill="#fff" opacity=".85"/></g>`;
  }
  const arcs = (dy1, dy2) => EX.map(x => `M${x - 9} ${EY + dy1}Q${x} ${EY + dy2} ${x + 9} ${EY + dy1}`).join('');
  const eyeHappy = `<path d="${arcs(2, -8)}" fill="none" stroke="${lineCol}" stroke-width="3.6" stroke-linecap="round"/>`;
  const eyeClosed = `<path d="${arcs(0, 7)}" fill="none" stroke="${lineCol}" stroke-width="3.4" stroke-linecap="round"/>`;
  const browSad = `<path d="M${EX[0] - 8} ${EY - 13}L${EX[0] + 6} ${EY - 18}M${EX[1] + 8} ${EY - 13}L${EX[1] - 6} ${EY - 18}" stroke="${lineCol}" stroke-width="3" stroke-linecap="round"/>`;

  // nose + mouth
  let nose, mouthW, mouthO;
  if (!cat){
    nose = `<path d="M112 ${NY - 2}Q120 ${NY - 7} 128 ${NY - 2}Q128 ${NY + 5} 120 ${NY + 8}Q112 ${NY + 5} 112 ${NY - 2}Z" fill="${c.nose}"/><ellipse cx="117" cy="${NY - 1}" rx="2.4" ry="1.4" fill="#fff" opacity=".6"/>`;
    mouthW = `<path d="M120 ${NY + 8}V${NY + 12}M111 ${NY + 11}Q115.5 ${NY + 17} 120 ${NY + 12}Q124.5 ${NY + 17} 129 ${NY + 11}" fill="none" stroke="${mouthCol}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    mouthO = `<path d="M110 ${NY + 11}Q120 ${NY + 29} 130 ${NY + 11}Q120 ${NY + 15} 110 ${NY + 11}Z" fill="#7A2F43"/><ellipse cx="120" cy="${NY + 21}" rx="5.5" ry="4" fill="#F38BA0"/>`;
  } else {
    nose = `<path d="M115 ${NY - 3}H125Q125 ${NY} 120 ${NY + 3}Q115 ${NY} 115 ${NY - 3}Z" fill="${c.nose}"/>`;
    mouthW = `<path d="M120 ${NY + 3}V${NY + 6}M113 ${NY + 6}Q116.5 ${NY + 10} 120 ${NY + 6}Q123.5 ${NY + 10} 127 ${NY + 6}" fill="none" stroke="${mouthCol}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    mouthO = `<path d="M113 ${NY + 6}Q120 ${NY + 20} 127 ${NY + 6}Q120 ${NY + 9} 113 ${NY + 6}Z" fill="#7A2F43"/><ellipse cx="120" cy="${NY + 13}" rx="3.6" ry="2.8" fill="#F38BA0"/>`;
  }
  const xTongue = cat
    ? `<path d="M116.5 ${NY + 9}c0 6 1.6 9 3.5 9s3.5-3 3.5-9z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.2"/>`
    : `<path d="M114 ${NY + 13}c0 9 2.6 14 6 14s6-5 6-14z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.4"/><path d="M120 ${NY + 16}v7" stroke="#C25A72" stroke-width="1.2" stroke-linecap="round"/>`;
  const xLick = cat
    ? `<ellipse cx="120" cy="${NY + 6}" rx="3.6" ry="4.4" fill="#F38BA0" stroke="#C25A72" stroke-width="1.1"/>`
    : `<ellipse cx="120" cy="${NY + 10}" rx="5" ry="6" fill="#F38BA0" stroke="#C25A72" stroke-width="1.3"/>`;
  const cheeks = `<g class="pv-cheek"><ellipse cx="${EX[0] - 12}" cy="${NY + 2}" rx="8.5" ry="5" fill="#FF9DB2"/><ellipse cx="${EX[1] + 12}" cy="${NY + 2}" rx="8.5" ry="5" fill="#FF9DB2"/></g>`;
  let whiskers = '';
  if (cat){
    const wc = lum(c.main) < .2 ? 'rgba(255,255,255,.6)' : 'rgba(60,40,55,.38)';
    whiskers = `<path d="M104 ${NY + 4}L78 ${NY - 1}M104 ${NY + 7}H77M104 ${NY + 10}L79 ${NY + 15}M136 ${NY + 4}L162 ${NY - 1}M136 ${NY + 7}H163M136 ${NY + 10}L161 ${NY + 15}" stroke="${wc}" stroke-width="1.6" stroke-linecap="round"/>`;
  }

  const WS = wearSvg(wearFrom(opts), { id, SW, HX, HY, EX, EY, ear:L.ear });

  const head = `${ruff}${earsBack}
    <path d="${headD}" ${S(c.main)}/>
    <g clip-path="url(#${id}h)">${faceIn}</g>
    <path d="${headD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW}"/>
    ${earsFront}${muzzle}${maskSvg}
    <g class="pv-eyes-open">${eyeOpen}</g>
    <g class="pv-eyes-happy">${eyeHappy}</g>
    <g class="pv-eyes-closed">${eyeClosed}</g>
    <g class="pv-brow-sad">${browSad}</g>
    ${nose}${whiskers}
    <g class="pv-mouth-w">${mouthW}</g>
    <g class="pvx-tongue" display="none">${xTongue}</g><g class="pvx-lick" display="none">${xLick}</g>
    <g class="pv-mouth-o">${mouthO}</g>
    ${cheeks}${WS.face}${WS.head}`;

  /* グループ（docs/MOTION_DESIGN.md 4-1・4-2。2026-11-26 だんかい 0）：外がわ（pv-tail・pv-body・pv-legL/R・pv-head・pv-neck）は 体勢（pose-*。止まった transform）、
     内がわ（pv-*-g）は しぐさ・げい・いまの アニメ（wag・tilt・chomp・trPaw など）。2重に して、アニメの あいだも 体勢が もどらない ように する。
     前あし pv-legs は いまの まま からだ（pv-body-g）の 中（外に 出すと「ふせ」の うしろあしの ふちが ほんの 少し かわる）。
     座標・色・ぬる 順は かえない（tools/poses.py が 1px で くらべる）。
     うちのこカード（js_line.js の CardArt）は この 文字列の 先頭 '<svg class="pet-svg"' と ' aria-hidden="true"' を 置きかえるので かえない */
  return `<svg class="pet-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
    ${m.mask ? `<radialGradient id="${id}g"><stop offset="0" stop-color="${m.mask}" stop-opacity=".95"/><stop offset=".55" stop-color="${m.mask}" stop-opacity=".85"/><stop offset="1" stop-color="${m.mask}" stop-opacity="0"/></radialGradient>` : ''}
  </defs>
  <ellipse class="pv-shadow" cx="120" cy="225" rx="62" ry="8" fill="rgba(58,40,60,.16)"/>
  <g class="pv-all">
    <g class="pv-tail"><g class="pv-tail-g">${tail}</g></g>
    <g class="pv-body"><g class="pv-body-g">${haunch(hx1, 'L')}${haunch(hx2, 'R')}${feet}${body}<g class="pv-legs">${legs}</g></g></g>
    <g class="pvx-down" display="none">${xDown}</g><g class="pvx-hind" display="none">${xHind}</g>
    <g class="pv-head"><g class="pv-head-g">${head}</g></g>
    <g class="pv-neck"><g class="pv-neck-g">${WS.neck}</g></g>
    <g class="pvx-beg" display="none">${xBeg}</g><g class="pvx-pawup" display="none">${xPawup}</g>
  </g>
</svg>`;
}

/* ===== よこむきの うちのこ（docs/MOTION_DESIGN.md 10章・12章。2026-11-27 だんかい 2。見本 2 の tools/motion_sample/side.js から）=====
   右を むく 絵。左へは 入れもの（.view-s）を scaleX(-1)。たつ・あるく・のび・くんくん に つかう（おへやの うちのこ だけ。カード・タイル・ランの 画面には 出さない）。
   renderPet と 同じ look から かく（41種の 耳・しっぽ・毛・顔と からだの もよう・みじかい足）。あたまと マズルは「ふちを うしろに かいてから ぬる」で 1つの りんかく。
   グループ：ps-leg（ps-bf うしろ・おく／ps-ff まえ・おく／ps-bn うしろ・てまえ〈もも つき〉／ps-fn まえ・てまえ。軸は 肩・腰。おくの 足は すこし 暗く）、
   ps-tail > ps-tail-g、ps-body、ps-neckw（首の きせかえ。マフラーの 端は ps-scarf）、ps-head > ps-head-g（ps-ear は 外がわに クラス・内がわに transform 属性＝CSS の アニメと ぶつけない）。
   きせかえ：あたまは 正面の 絵の ものを 0.74 倍で のせる、かお・くびは よこむき用に かいた。目・口の 出し入れは display="none" の 属性（CSS で display:inline） */
function renderPetSide(rawLook, opts = {}){
  const L = normalizeLook(rawLook);
  const c = L.colors, m = L.marks, cat = L.species === 'cat';
  const id = 'ps' + (++PET_SEQ);
  const SW = 2.4;
  const ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const far = col => mix(col, '#3A2A3A', .16);
  const fluffy = L.coat === 'fluffy' || L.coat === 'long', curly = L.coat === 'curly';
  const short = L.legs === 'short';
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;

  /* からだ */
  const BX = 108, BY = short ? 180 : 168, brx = cat ? 50 : 53, bry = cat ? 26 : 29;
  const bodyD = curly ? blob(BX, BY, brx, bry, 16, .06) : fluffy ? blob(BX, BY, brx + 1, bry + 1, 14, .05) : ellD(BX, BY, brx, bry);
  const chestFill = c.chest === c.body ? lighten(c.body, lum(c.body) > .7 ? 0 : .1) : c.chest;
  let body = `<path d="${bodyD}" ${S(c.body)}/><g clip-path="url(#${id}b)">`;
  if (m.saddle) body += `<ellipse cx="${BX - 6}" cy="${BY - 22}" rx="58" ry="18" fill="${m.saddle}"/>`;
  if (m.bodyPatch){
    if (m.patchR) body += `<ellipse cx="${BX - 12}" cy="${BY - 6}" rx="24" ry="16" fill="${m.patchR}"/>`;
    if (m.patchL) body += `<ellipse cx="${BX + 20}" cy="${BY + 14}" rx="14" ry="9" fill="${m.patchL}"/>`;
  }
  body += `<ellipse cx="${BX + brx - 12}" cy="${BY + 6}" rx="${cat ? 17 : 20}" ry="24" fill="${chestFill}"/>`;
  if (m.stripes) body += [-34, -18, -2, 14].map(dx => `<path d="M${BX + dx} ${BY - 28}q-6 12 1 24" fill="none" stroke="${m.stripes}" stroke-width="5" stroke-linecap="round"/>`).join('');
  if (m.spots) body += [[-30,-10,5],[-6,-16,6],[12,4,4.5],[-20,10,5],[24,-12,4]].map(([x, y, r]) => `<circle cx="${BX + x}" cy="${BY + y}" r="${r}" fill="${m.spots}"/>`).join('');
  body += `</g><path d="${bodyD}" fill="none" stroke="${ol(c.body)}" stroke-width="${SW}"/>`;

  /* あし（よこから。てまえは あとで かく。軸＝肩・腰） */
  const LT = short ? 196 : 178, LW = cat ? 13 : 15;
  const leg = (x, cls, col, pawCol, thigh) => {
    let s = `<g class="ps-leg ${cls}">`;
    if (thigh) s += `<ellipse cx="${x + 3}" cy="${LT + 2}" rx="${short ? 15 : 17}" ry="${short ? 12 : 15}" ${S(col)}/>`;
    s += `<rect x="${x - LW / 2}" y="${LT}" width="${LW}" height="${214 - LT}" rx="${LW / 2}" ${S(col)}/>`;
    if (m.stripes && !short) s += `<path d="M${x - 4} ${LT + 14}h8M${x - 4} ${LT + 21}h8" stroke="${m.stripes}" stroke-width="3" stroke-linecap="round"/>`;
    s += `<ellipse cx="${x + 2.5}" cy="215.5" rx="9.5" ry="5.8" ${S(pawCol)}/></g>`;
    return s;
  };
  const legsFar = leg(85, 'ps-bf', far(c.body), far(c.paws)) + leg(133, 'ps-ff', far(c.body), far(c.paws));
  const legsNear = leg(74, 'ps-bn', c.body, c.paws, true) + leg(144, 'ps-fn', c.body, c.paws);

  /* しっぽ（こしの うしろ） */
  const tx = BX - brx + 7, ty = BY - 8, tc = c.tail;
  let tail = '';
  if (L.tail === 'curl'){
    tail = thick(`M${tx} ${ty}C${tx - 16} ${ty - 10} ${tx - 18} ${ty - 40} ${tx + 6} ${ty - 44}C${tx + 24} ${ty - 46} ${tx + 26} ${ty - 24} ${tx + 12} ${ty - 22}`, tc, 15);
    if (c.tailTip) tail += `<circle cx="${tx + 12}" cy="${ty - 22}" r="7" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'plume'){
    tail = `<path d="${blob(tx + 12, ty - 26, 27, 23, 12, .08)}" ${S(tc)}/>`;
  } else if (L.tail === 'straight'){
    const d = `M${tx} ${ty}C${tx - 14} ${ty - 6} ${tx - 24} ${ty - 22} ${tx - 28} ${ty - 42}`;
    tail = thick(d, tc, fluffy ? 15 : 12);
    if (c.tailTip) tail += `<circle cx="${tx - 28}" cy="${ty - 42}" r="${fluffy ? 7.5 : 6}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'stub'){
    tail = `<ellipse cx="${tx - 4}" cy="${ty + 2}" rx="8" ry="7" ${S(tc)}/>`;
  } else {
    const d = `M${tx} ${ty + 4}C${tx - 26} ${ty + 4} ${tx - 34} ${ty - 18} ${tx - 28} ${ty - 40}C${tx - 25} ${ty - 52} ${tx - 18} ${ty - 58} ${tx - 10} ${ty - 60}`;
    const w = L.tail === 'fluffy' ? 20 : 12;
    tail = thick(d, tc, w);
    if (m.stripes) tail += `<path d="${d}" fill="none" stroke="${m.stripes}" stroke-width="${w}" stroke-dasharray="5 11" stroke-dashoffset="-14"/>`;
    if (c.tailTip) tail += `<circle cx="${tx - 10}" cy="${ty - 60}" r="${w / 2}" fill="${c.tailTip}"/>`;
  }

  /* あたま（右むき）。マズルと いっしょの ふちどり（ふちを うしろに かいてから ぬる） */
  const HX = 162, HY = (short ? 114 : 102), hrx = cat ? 46 : 45, hry = cat ? 40 : 41;
  const headD = curly ? blob(HX, HY, hrx, hry, 18, .06) : fluffy ? blob(HX, HY, hrx + 1, hry + 1, 16, .05) : ellD(HX, HY, hrx, hry);
  const mrx = cat ? 9 : { short:12, medium:16, long:20 }[L.muzzle], mry = cat ? 8.5 : 12;
  const mcx = cat ? HX + hrx - 4 : HX + hrx - 6 + mrx * .55, mcy = cat ? HY + 12 : HY + 16;
  const muzD = ellD(mcx, mcy, mrx, mry);
  const fc = c.face;
  const muzzleFill = c.face === c.main ? lighten(c.main, lum(c.main) > .7 ? 0 : .16) : c.face;
  const ex = HX + hrx * .4, ey = HY - 6;
  let faceIn = '';
  if (m.patchR) faceIn += `<ellipse cx="${HX + 2}" cy="${HY - 12}" rx="36" ry="32" fill="${m.patchR}"/>`;
  if (L.face === 'lower') faceIn += `<ellipse cx="${HX + 22}" cy="${HY + 30}" rx="50" ry="24" fill="${fc}"/>`;
  else if (L.face === 'mask') faceIn += `<ellipse cx="${HX + 20}" cy="${HY + 24}" rx="48" ry="26" fill="${fc}"/><ellipse cx="${ex}" cy="${ey}" rx="13" ry="11" fill="${fc}"/>`;
  else if (L.face === 'hachiware') faceIn += `<path d="M${HX + 30} ${HY - 44}C${HX + 34} ${HY - 20} ${HX + 30} ${HY + 2} ${HX + 8} ${HY + 10}C${HX - 12} ${HY + 16} ${HX - 30} ${HY + 20} ${HX - 50} ${HY + 24}L${HX - 50} ${HY + 60}L${HX + 90} ${HY + 60}L${HX + 90} ${HY - 44}Z" fill="${fc}"/>`;
  else if (L.face === 'blaze') faceIn += `<path d="M${HX + 26} ${HY - 46}L${HX + 37} ${HY - 46}C${HX + 43} ${HY - 22} ${HX + 50} ${HY - 4} ${HX + 90} ${HY + 4}L${HX + 90} ${HY + 50}L${HX + 44} ${HY + 50}C${HX + 38} ${HY + 12} ${HX + 30} ${HY - 18} ${HX + 26} ${HY - 46}Z" fill="${fc}"/>`;
  if (!cat && muzzleFill !== c.main && L.face !== 'lower') faceIn += `<path d="${muzD}" fill="${muzzleFill}"/>`;
  if (cat && muzzleFill !== c.main) faceIn += `<path d="${muzD}" fill="${muzzleFill}"/>`;
  if (m.stripes) faceIn += `<path d="M${HX + 6} ${HY - 38}l3 11M${HX + 16} ${HY - 39}l1 11M${HX + 26} ${HY - 35}l-1 10M${HX - 16} ${HY + 8}l13 2M${HX - 18} ${HY + 17}h13" fill="none" stroke="${m.stripes}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (m.spots) faceIn += [[-20,-20,4],[-4,-30,4.5],[-28,0,3.5]].map(([x, y, r]) => `<circle cx="${HX + x}" cy="${HY + y}" r="${r}" fill="${m.spots}"/>`).join('');
  if (m.mask) faceIn += `<ellipse cx="${mcx - 2}" cy="${mcy - 2}" rx="${mrx + 12}" ry="20" fill="url(#${id}g)"/>`;
  if (m.brows) faceIn += `<ellipse cx="${ex - 1}" cy="${ey - 15}" rx="5" ry="3.6" fill="${m.brows}"/>`;

  /* 耳 */
  const earN = (m.patchR && c.ear === c.main) ? m.patchR : c.ear, earF = far((m.patchL && c.ear === c.main) ? m.patchL : c.ear);
  const innerCol = col => cat ? mix(col, '#F4AEBB', .7) : mix(col, '#F3C2C9', .55);
  const ebx = HX - 6, eby = HY - hry + 8;
  const backEar = ['pointy','big','small','semi'].includes(L.ear);
  const earScale = { pointy:1, big:1.3, small:.68, semi:.95 }[L.ear] || 1;
  const earPath = (s) => `M${-14 * s} ${6}C${-14 * s} ${-18 * s} ${-8 * s} ${-34 * s} ${-2 * s} ${-44 * s}C${8 * s} ${-30 * s} ${16 * s} ${-12 * s} ${18 * s} ${4}Z`;
  const earIn = (s) => `M${-8 * s} ${2}C${-8 * s} ${-14 * s} ${-5 * s} ${-26 * s} ${-1 * s} ${-33 * s}C${6 * s} ${-22 * s} ${10 * s} ${-10 * s} ${11 * s} ${2}Z`;
  let earsBack = '', earsFront = '';
  if (backEar){
    const s = earScale;
    earsBack = `<g class="ps-ear ps-earF"><g transform="translate(${ebx - 12} ${eby + 1})"><path d="${earPath(s)}" ${S(earF)}/></g></g>` +
      `<g class="ps-ear ps-earN"><g transform="translate(${ebx} ${eby})"><path d="${earPath(s)}" ${S(earN)}/><path d="${earIn(s)}" fill="${innerCol(earN)}"/>` +
      (L.ear === 'semi' ? `<path d="M${-6} ${-30}L${14} ${-26}L${4} ${-14}Z" ${S(mix(earN, '#3A2A3A', .08))}/>` : '') + `</g></g>`;
  } else if (L.ear === 'fold'){
    earsFront = `<g class="ps-ear ps-earN"><g transform="translate(${ebx} ${eby})"><path d="M-8 6C-6 -6 8 -10 16 -2C12 4 2 8 -8 6Z" ${S(earN)}/></g></g>`;
  } else {
    const len = L.ear === 'long' ? 74 : 54;
    const d = `M8 -4C-12 -6 -22 16 -18 ${len * .7}C-16 ${len} -2 ${len + 2} 2 ${len * .78}C6 ${len * .48} 12 ${len * .2} 8 -4Z`;
    earsFront = `<g class="ps-ear ps-earN ps-earFlop"><g transform="translate(${ebx - 2} ${eby - 2})"><path d="${(L.ear === 'long' && (curly || fluffy)) ? blob(-6, len * .5, 15, len * .52, 12, .07) : d}" ${S(earN)}/></g></g>`;
  }
  let ruff = '';
  if (fluffy || curly){
    const big = L.ear === 'small' && fluffy;
    const rc = c.chest !== c.body ? mix(c.body, c.chest, .5) : c.body;
    ruff = `<path d="${blob(HX - 10, HY + 36, big ? 40 : 32, big ? 26 : 20, 12, .09)}" ${S(rc)}/>`;
  }

  /* 目・鼻・口 */
  const eyeArea = L.face === 'mask' ? fc : (m.patchR || c.main);
  const darkEyes = lum(eyeArea) < .12;
  const lineCol = darkEyes ? '#FFF2EA' : '#2E2430';
  const lightIris = lum(c.eye) > .06;
  const erx = cat ? 7 : 6.5, ery = cat ? 9.5 : 8.5;
  let eyeOpen = `<g class="ps-eye">`;
  if (darkEyes) eyeOpen += `<ellipse cx="${ex}" cy="${ey}" rx="${erx + 2}" ry="${ery + 2}" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/>`;
  eyeOpen += `<ellipse cx="${ex}" cy="${ey}" rx="${erx}" ry="${ery}" fill="${c.eye}"/>`;
  if (lightIris) eyeOpen += `<ellipse cx="${ex + 1}" cy="${ey + 1}" rx="${cat ? 2.6 : 3.4}" ry="${cat ? 7 : 5}" fill="#1E1620"/>`;
  eyeOpen += `<circle cx="${ex + 2.4}" cy="${ey - 3.6}" r="2.8" fill="#fff"/><circle cx="${ex - 2}" cy="${ey + 3.6}" r="1.3" fill="#fff" opacity=".85"/></g>`;
  const eyeHappy = `<path d="M${ex - 7} ${ey + 2}Q${ex} ${ey - 7} ${ex + 7} ${ey + 2}" fill="none" stroke="${lineCol}" stroke-width="3.4" stroke-linecap="round"/>`;
  const eyeClosed = `<path d="M${ex - 7} ${ey}Q${ex} ${ey + 6} ${ex + 7} ${ey}" fill="none" stroke="${lineCol}" stroke-width="3.2" stroke-linecap="round"/>`;
  const muzzleDark = lum(m.mask || (L.face === 'lower' ? fc : muzzleFill)) < .12;
  const mouthCol = muzzleDark ? '#F4E6EA' : '#3A2A33';
  let nose, mouthW, mouthO, tongue;
  if (!cat){
    const nx = mcx + mrx - 2.5, ny = mcy - 5;
    nose = `<ellipse cx="${nx}" cy="${ny}" rx="6" ry="4.8" fill="${c.nose}"/><ellipse cx="${nx + 1}" cy="${ny - 1.6}" rx="2" ry="1.2" fill="#fff" opacity=".6"/>`;
    mouthW = `<path d="M${nx - 1} ${mcy + 3}Q${mcx + 1} ${mcy + 10} ${mcx - mrx + 3} ${mcy + 6}" fill="none" stroke="${mouthCol}" stroke-width="2.3" stroke-linecap="round"/>`;
    mouthO = `<path d="M${nx} ${mcy + 2}Q${mcx} ${mcy + 22} ${mcx - mrx + 1} ${mcy + 6}Q${mcx} ${mcy + 8} ${nx} ${mcy + 2}Z" fill="#7A2F43"/>`;
    tongue = `<path d="M${mcx - 2} ${mcy + 8}c-1 7 1 13 6 13s6-6 4-13z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.4"/><path d="M${mcx + 3} ${mcy + 10}v7" stroke="#C25A72" stroke-width="1.2" stroke-linecap="round"/>`;
  } else {
    const nx = mcx + mrx - 1, ny = mcy - 6;
    nose = `<path d="M${nx - 5} ${ny - 2}H${nx + 1}Q${nx + 1} ${ny + 2} ${nx - 2} ${ny + 4}Q${nx - 5} ${ny + 1} ${nx - 5} ${ny - 2}Z" fill="${c.nose}"/>`;
    mouthW = `<path d="M${nx - 2} ${ny + 4}v3q-3 4-7 1" fill="none" stroke="${mouthCol}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`;
    mouthO = `<path d="M${nx - 2} ${ny + 6}Q${nx - 5} ${ny + 18} ${nx - 13} ${ny + 8}Z" fill="#7A2F43"/>`;
    tongue = `<path d="M${nx - 7} ${ny + 9}c-1 5 1 9 4 9s4-4 3-9z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.2"/>`;
  }
  const cheek = `<ellipse class="ps-cheek" cx="${ex + 5}" cy="${HY + 17}" rx="7" ry="4.5" fill="#FF9DB2"/>`;
  let whiskers = '';
  if (cat){
    const wc = lum(c.main) < .2 ? 'rgba(255,255,255,.6)' : 'rgba(60,40,55,.38)';
    whiskers = `<path d="M${mcx + 1} ${mcy + 1}L${mcx + 25} ${mcy - 5}M${mcx + 1} ${mcy + 4}L${mcx + 26} ${mcy + 5}M${mcx - 1} ${mcy + 6}L${mcx + 21} ${mcy + 14}" stroke="${wc}" stroke-width="1.5" stroke-linecap="round"/>`;
  }

  /* きせかえ。あたまは 正面の 絵を 小さく のせる。かお・くびは よこむき用 */
  const W = wearFrom(opts);
  const WS = wearSvg(W, { id, SW, HX:120, HY:100, EX:[97, 143], EY:98, ear:L.ear });
  const k = .74;
  const headWear = WS.head ? `<g transform="translate(${f1(HX - 120 * k + 2)} ${f1(HY - 100 * k + 2)}) scale(${k}) rotate(-7 120 100)">${WS.head}</g>` : '';
  const ink = col => mix(col, '#2A1E2A', .42);
  let faceWear = '';
  const fw = WEAR_BY_ID[W.face];
  if (fw){
    const p = fw.p;
    const arm = `<path d="M${ex - 9} ${ey - 3}L${HX - 22} ${ey - 8}" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`;
    if (fw.kind === 'glasses') faceWear = arm + `<circle cx="${ex + 1}" cy="${ey}" r="11" fill="rgba(255,255,255,.2)" stroke="${p.c}" stroke-width="3.2"/>`;
    else faceWear = arm + (p.heart
      ? `<path d="M${ex + 1} ${ey + 11}C${ex - 13} ${ey + 2} ${ex - 11} ${ey - 11} ${ex - 4} ${ey - 9}C${ex - 1} ${ey - 8} ${ex + 1} ${ey - 6} ${ex + 1} ${ey - 4}C${ex + 1} ${ey - 6} ${ex + 3} ${ey - 8} ${ex + 6} ${ey - 9}C${ex + 13} ${ey - 11} ${ex + 15} ${ey + 2} ${ex + 1} ${ey + 11}Z" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="2"/>`
      : `<rect x="${ex - 11}" y="${ey - 9}" width="23" height="18" rx="8" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="2"/>`);
  }
  let neckWear = '';
  const nw = WEAR_BY_ID[W.neck];
  if (nw){
    const p = nw.p, band = `M${HX - 36} ${HY + 30}Q${HX - 14} ${HY + 50} ${HX + 16} ${HY + 41}`;
    const bandStroke = (col, w) => `<path d="${band}" fill="none" stroke="${ink(typeof col === 'string' && col[0] === '#' ? col : '#888888')}" stroke-width="${w + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    const pts = (n) => Array.from({ length:n }, (_, i) => { const t = i / (n - 1), u = 1 - t; return [u * u * (HX - 36) + 2 * u * t * (HX - 14) + t * t * (HX + 16), u * u * (HY + 30) + 2 * u * t * (HY + 50) + t * t * (HY + 41)]; });
    if (nw.kind === 'bandana'){
      let fill = p.c;
      if (p.check){ neckWear += `<defs><pattern id="${id}ck" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#FFFFFF"/><rect width="4.5" height="9" fill="${p.c}" opacity=".55"/><rect width="9" height="4.5" fill="${p.c}" opacity=".55"/></pattern></defs>`; fill = `url(#${id}ck)`; }
      neckWear += `<path d="M${HX - 30} ${HY + 34}Q${HX - 8} ${HY + 50} ${HX + 18} ${HY + 39}L${HX + 8} ${HY + 72}Q${HX + 2} ${HY + 78} ${HX - 4} ${HY + 70}Z" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        (p.d ? [[-10, 46], [6, 46], [2, 60]].map(([a, b]) => `<circle cx="${HX + a}" cy="${HY + b}" r="2.3" fill="${p.d}"/>`).join('') : '');
    } else if (nw.kind === 'bell'){
      let col = p.c;
      if (p.c === 'rainbow'){ neckWear += `<defs><linearGradient id="${id}rb" x1="0" x2="1"><stop offset="0" stop-color="#F27B7B"/><stop offset=".5" stop-color="#8CC26A"/><stop offset="1" stop-color="#B8A6EC"/></linearGradient></defs>`; col = `url(#${id}rb)`; }
      neckWear += bandStroke(col, 7) + `<circle cx="${HX + 8}" cy="${HY + 54}" r="8" fill="${p.b}" stroke="${ink(p.b)}" stroke-width="${SW}"/><path d="M${HX + 2} ${HY + 55}h12M${HX + 8} ${HY + 55}v5" stroke="${ink(p.b)}" stroke-width="1.7" stroke-linecap="round"/><circle cx="${HX + 5}" cy="${HY + 51}" r="2" fill="#FFFFFF" opacity=".75"/>`;
    } else if (nw.kind === 'bowtie'){
      const bx = HX + 10, by = HY + 46;
      neckWear += `<path d="M${bx} ${by}L${bx - 13} ${by - 8}Q${bx - 16} ${by} ${bx - 13} ${by + 8}ZM${bx} ${by}L${bx + 11} ${by - 7}Q${bx + 14} ${by} ${bx + 11} ${by + 7}Z" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/><rect x="${bx - 4}" y="${by - 4}" width="8" height="8" rx="3" fill="${mix(p.c, '#FFFFFF', .18)}" stroke="${ink(p.c)}" stroke-width="${SW}"/>`;
    } else if (nw.kind === 'scarf'){
      /* たれた 端は 正面の 絵と 同じく 見える がわ（胸の 前）に。ふさ つき。あるくと ゆれる（ps-scarf） */
      const tail = `M${HX - 13} ${HY + 41}L${HX + 1} ${HY + 43}L${HX + 9} ${HY + 84}L${HX - 5} ${HY + 86}Z`;
      let tailIn = '';
      if (p.tri){
        const [a1, a2, a3] = p.tri;
        tailIn = `<defs><clipPath id="${id}sc"><path d="${tail}"/></clipPath></defs><g clip-path="url(#${id}sc)">` + Array.from({ length:8 }, (_, i) => `<rect x="${HX - 22}" y="${HY + 38 + i * 6}" width="40" height="6" fill="${[a2, a3, a1][i % 3]}" transform="rotate(-12 ${HX - 2} ${HY + 41 + i * 6})"/>`).join('') + `</g>`;
      }
      neckWear += `<g class="ps-scarf"><path d="${tail}" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>${tailIn}` +
        `<path d="${tail}" fill="none" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M${HX - 2} ${HY + 86}l-1 6M${HX + 3} ${HY + 85}l0 6M${HX + 8} ${HY + 84}l1 6" stroke="${p.tri ? p.tri[0] : ink(p.c)}" stroke-width="2.4" stroke-linecap="round"/></g>`;
      neckWear += bandStroke(p.c, 13);
      if (p.tri) neckWear += `<path d="${band}" fill="none" stroke="${p.tri[1]}" stroke-width="13" stroke-dasharray="6 12"/><path d="${band}" fill="none" stroke="${p.tri[2]}" stroke-width="13" stroke-dasharray="6 12" stroke-dashoffset="-6"/>`;
    } else if (nw.kind === 'ukiwa'){
      neckWear += `<ellipse cx="${BX + 8}" cy="${BY + 2}" rx="62" ry="19" fill="none" stroke="#9AA3B5" stroke-width="${14 + SW * 2}"/><ellipse cx="${BX + 8}" cy="${BY + 2}" rx="62" ry="19" fill="none" stroke="#FFFFFF" stroke-width="14"/><ellipse cx="${BX + 8}" cy="${BY + 2}" rx="62" ry="19" fill="none" stroke="#F27B7B" stroke-width="14" stroke-dasharray="30 34"/>`;
    } else if (nw.kind === 'pearls'){
      neckWear += pts(7).map(([a, b]) => `<circle cx="${f1(a)}" cy="${f1(b)}" r="4.4" fill="#FBF7F2" stroke="#BFAF9A" stroke-width="1.4"/>`).join('');
    } else if (nw.kind === 'lei'){
      const cols = ['#F7A9C4','#FFD27A','#FFFFFF','#C9B6F2','#F28C8C'];
      neckWear += pts(6).map(([a, b], i) => [0, 72, 144, 216, 288].map(q => { const r = q * Math.PI / 180; return `<circle cx="${f1(a + 4.6 * Math.cos(r))}" cy="${f1(b + 4.6 * Math.sin(r))}" r="4" fill="${cols[i % cols.length]}" stroke="${ink(cols[i % cols.length])}" stroke-width="1"/>`; }).join('') + `<circle cx="${f1(a)}" cy="${f1(b)}" r="2.8" fill="#F5C04A"/>`).join('');
    }
  }

  return `<svg class="pet-svg pet-side${short ? ' ps-short' : ''}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/><path d="${muzD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
    ${m.mask ? `<radialGradient id="${id}g"><stop offset="0" stop-color="${m.mask}" stop-opacity=".95"/><stop offset=".6" stop-color="${m.mask}" stop-opacity=".8"/><stop offset="1" stop-color="${m.mask}" stop-opacity="0"/></radialGradient>` : ''}
  </defs>
  <ellipse class="ps-shadow" cx="112" cy="222" rx="70" ry="7" fill="rgba(58,40,60,.16)"/>
  <g class="ps-all">
    ${legsFar}
    <g class="ps-tail"><g class="ps-tail-g">${tail}</g></g>
    <g class="ps-body">${body}</g>
    ${legsNear}
    ${ruff}
    <g class="ps-neckw">${neckWear}</g>
    <g class="ps-head"><g class="ps-head-g">
      ${earsBack}
      <path d="${headD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW * 2}"/><path d="${muzD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW * 2}"/>
      <path d="${headD}" fill="${c.main}"/><path d="${muzD}" fill="${c.main}"/>
      <g clip-path="url(#${id}h)">${faceIn}</g>
      ${earsFront}
      <g class="ps-eyes-open">${eyeOpen}</g><g class="ps-eyes-happy" display="none">${eyeHappy}</g><g class="ps-eyes-closed" display="none">${eyeClosed}</g>
      ${nose}${whiskers}
      <g class="ps-mouth-w">${mouthW}</g><g class="ps-mouth-o" display="none">${mouthO}</g><g class="ps-tongue" display="none">${tongue}</g>
      ${cheek}${faceWear}${headWear}
    </g></g>
  </g>
</svg>`;
}

/* ===== うしろすがたの うちのこ（docs/MOTION_DESIGN.md 14章・15章。2026-11-27 だんかい 4。見本 4 の tools/motion_sample4/back.js から）=====
   おへやの うちのこ だけ（まどの 下で 外を 見る・雨・雪・奥へ あるく）。カード・タイル・ランの 画面には 出さない。
   すわった 正面の 絵（renderPet）と 同じ 位置・大きさで、うしろから 見た 絵（くるっと 入れかえても ずれない）。顔は かかない。
   左右は 正面と 反対：正面の 左がわの もよう（patchL・耳の 色）は うしろでは 右がわ。
   41種の 耳（7しゅるい）・しっぽ（6）・毛（ふわふわ・くるくる）・せなかと うしろあたまの もよう（しま・ぶち・サドル・ぶち〈patch〉・てん）を 引きつぐ。
   グループ：pb-all > pb-legs（立つ・あるく ときの うしろ足。ふだんは display="none"）、pb-feet（すわった ときの かかと・前あしの 先）、
   pb-body > pb-body-g（おしり pb-haunchL/R・からだ・せなかの もよう）、pb-ruff、
   pb-neck.pb-neck-b（せなかに たれる 首の きせかえ：マフラーの 端・バンダナの 先）、うきわ、pb-tail.pb-tail-lo > pb-tail-g、
   pb-head > pb-head-g（耳 pb-earL/R・頭・うしろあたまの もよう・かおの きせかえの つる・あたまの きせかえ）、pb-neck（うなじの 帯。頭と しっぽより てまえ＝帯が かくれない）、
   pb-tail.pb-tail-hi（しっぽの 2まい目。ふだんは visibility="hidden"。ふせる・奥へ あるく ときだけ 見せて、しっぽを 頭・首の 帯より 前に）。
   うしろから 見ると しっぽが いちばん てまえ（2026-11-27 オーナーの 声：前は マフラーの 端が しっぽの 上に かさなっていた）。
   きせかえ（wearBack）：首は うなじの 帯（バンダナは むすび目、すずは 金具、マフラーは 端を 1本 せなかへ）、かおは めがねの つる、
   あたまは 正面の 絵を 左右 反対に して（王冠・かぼちゃ・ティアラ・かぶと・はちまき・うさぎのみみ は うしろ用に かいた） */
function renderPetBack(rawLook, opts = {}){
  const L = normalizeLook(rawLook);
  const c = L.colors, m = L.marks, cat = L.species === 'cat';
  const id = 'pb' + (++PET_SEQ);
  const SW = 2.4;
  const ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const far = col => mix(col, '#3A2A3A', .16);
  const fluffy = L.coat === 'fluffy' || L.coat === 'long', curly = L.coat === 'curly';
  const short = L.legs === 'short';
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const HX = 120, HY = 100, hrx = cat ? 62 : 60, hry = cat ? 50 : 51;
  const headD = curly ? blob(HX, HY, hrx, hry, 18, .07) : fluffy ? blob(HX, HY, hrx + 1, hry + 1, 16, .05) : ellD(HX, HY, hrx, hry);
  /* からだ：正面より すこし 上まで（せなかが 見える）。おしりは 正面と 同じ ところ */
  const BX = 120, BY = 178, brx = cat ? 43 : 47, bry = 44;
  const bodyD = curly ? blob(BX, BY, brx, bry, 16, .07) : fluffy ? blob(BX, BY, brx + 1, bry, 14, .05) : ellD(BX, BY, brx, bry);
  /* 左右 反対：うしろの 左（x が 小さい がわ）は 正面の 右（patchR） */
  const pL = m.patchR, pR = m.patchL;

  /* しっぽ（いちばん てまえ。つけねは おしりの まんなか 120,204） */
  let tail = '';
  const tc = c.tail;
  if (L.tail === 'curl'){
    /* まいた しっぽは こしの 上に のる */
    const d = 'M120 204C102 200 98 178 110 168C122 158 142 164 140 180C138 192 122 192 122 182';
    tail = thick(d, tc, 16);
    if (c.tailTip) tail += `<circle cx="122" cy="182" r="8" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'plume'){
    /* ふさふさの しっぽは せなかに ふわっと のる（ポメラニアンなど） */
    tail = `<path d="${blob(126, 172, 30, 25, 13, .08)}" ${S(tc)}/>` +
      `<path d="M112 182q8-12 22-16M120 190q10-10 24-12" fill="none" stroke="${ol(tc)}" stroke-opacity=".35" stroke-width="1.8" stroke-linecap="round"/>`;
    if (c.tailTip) tail += `<path d="${blob(140, 160, 13, 11, 9, .08)}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'straight'){
    /* まっすぐの しっぽは ゆかに のばす（みぎへ） */
    const d = 'M120 206C134 216 152 222 174 220';
    tail = thick(d, tc, fluffy ? 15 : 12);
    if (c.tailTip) tail += `<circle cx="174" cy="220" r="${fluffy ? 7.5 : 6}" fill="${c.tailTip}"/>`;
  } else if (L.tail === 'stub'){
    tail = `<ellipse cx="120" cy="200" rx="9" ry="8" ${S(tc)}/>`;
  } else {
    /* ながい しっぽ（ねこ）：ゆかを みぎへ まわって さきが 上を むく */
    const d = 'M120 208C140 226 176 228 188 212C193 205 192 196 186 190';
    const w = L.tail === 'fluffy' ? 20 : 13;
    tail = thick(d, tc, w);
    if (m.stripes) tail += `<path d="${d}" fill="none" stroke="${m.stripes}" stroke-width="${w}" stroke-dasharray="5 11" stroke-dashoffset="-8"/>`;
    if (c.tailTip) tail += `<circle cx="186" cy="190" r="${w / 2}" fill="${c.tailTip}"/>`;
  }

  /* おしり・かかと・前あしの 先 */
  const hx1 = cat ? 84 : 80, hx2 = 240 - hx1, hrr = cat ? 19 : 22;
  const haunchCol = m.saddle || c.body;
  const haunch = (x, k) => `<g class="pb-haunch pb-haunch${k}">` + (fluffy || curly ? `<path d="${blob(x, 206, hrr, 16, 9, .07)}" ${S(haunchCol)}/>` : `<ellipse cx="${x}" cy="206" rx="${hrr}" ry="16" ${S(haunchCol)}/>`) + '</g>';
  const feet = `<g class="pb-feet">` +
    `<ellipse cx="108" cy="220" rx="10" ry="5.5" ${S(far(c.paws))}/><ellipse cx="132" cy="220" rx="10" ry="5.5" ${S(far(c.paws))}/>` +
    `<g class="pb-footL"><ellipse cx="${hx1 - 2}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g><g class="pb-footR"><ellipse cx="${hx2 + 2}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/></g></g>`;
  /* 立つ・あるく ときの うしろ足（ふだんは 見えない）。おくに 前足 */
  const LT = short ? 198 : 184;
  const standLeg = (x, k) => `<g class="pb-leg pb-leg${k}"><rect x="${x - 10}" y="${LT}" width="20" height="${216 - LT}" rx="10" ${S(haunchCol === c.body ? c.body : haunchCol)}/>` +
    (m.stripes && !short ? `<path d="M${x - 5} ${LT + 12}h10M${x - 5} ${LT + 19}h10" stroke="${m.stripes}" stroke-width="3" stroke-linecap="round"/>` : '') +
    `<ellipse cx="${x}" cy="217" rx="11.5" ry="6.5" ${S(c.paws)}/></g>`;
  const legs = `<g class="pb-legs" display="none">` +
    `<rect x="${103}" y="${LT}" width="15" height="${214 - LT}" rx="7.5" ${S(far(c.body))}/><rect x="${122}" y="${LT}" width="15" height="${214 - LT}" rx="7.5" ${S(far(c.body))}/>` +
    standLeg(97, 'L') + standLeg(143, 'R') + '</g>';

  /* からだと せなかの もよう */
  let body = `<path d="${bodyD}" ${S(c.body)}/><g clip-path="url(#${id}b)">`;
  if (m.saddle) body += `<ellipse cx="120" cy="168" rx="${brx - 4}" ry="34" fill="${m.saddle}"/>`;
  if (m.bodyPatch){
    if (pL) body += `<ellipse cx="94" cy="172" rx="19" ry="15" fill="${pL}"/>`;
    if (pR) body += `<ellipse cx="150" cy="194" rx="16" ry="12" fill="${pR}"/>`;
  }
  if (m.stripes) body += `<path d="M120 140V214" stroke="${m.stripes}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M120 158q-16 1-30 11M120 158q16 1 30 11M120 176q-19 1-36 12M120 176q19 1 36 12M120 194q-16 1-30 10M120 194q16 1 30 10" fill="none" stroke="${m.stripes}" stroke-width="5" stroke-linecap="round"/>`;
  if (m.spots) body += [[148,166,6],[92,170,5],[99,196,4.5],[141,199,5],[80,186,4],[158,184,3.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  body += `</g><path d="${bodyD}" fill="none" stroke="${ol(c.body)}" stroke-width="${SW}"/>`;

  let ruff = '';
  if (fluffy || curly){
    const big = L.ear === 'small' && fluffy;
    /* うしろの えりまきは からだの 色に むねの 色を すこし（ボーダーコリーなどで 頭と からだの さかいが 見える） */
    const rc = c.chest !== c.body ? mix(c.body, c.chest, .35) : c.body;
    ruff = `<path d="${blob(120, 144, big ? 62 : (cat ? 50 : 54), big ? 32 : 25, 14, .09)}" ${S(rc)}/>`;
  }

  /* 耳（うしろから。左右の 色は 正面と 反対） */
  const backEar = ['pointy','big','small'].includes(L.ear);
  const earLc = (pL && c.ear === c.main) ? pL : c.ear;
  const earRc = (pR && c.ear === c.main) ? pR : c.ear;
  const earBack = col => mix(col, '#FFFFFF', .14);
  let earsBack = '', earsFront = '';
  if (backEar){
    const E = EARS[L.ear];
    /* 耳の うら：ふちの 色を すこし こく、まんなかを すこし あかるく（ふくらみ） */
    earsBack = `<g class="pb-earL"><path d="${E.o}" ${S(earLc)}/><path d="${E.i}" fill="${earBack(earLc)}" opacity=".55"/></g>` +
      `<g class="pb-earR"><g transform="${MIRROR}"><path d="${E.o}" ${S(earRc)}/><path d="${E.i}" fill="${earBack(earRc)}" opacity=".55"/></g></g>`;
  } else {
    const d = (L.ear === 'long' && (curly || fluffy)) ? blob(66, 112, 22, 46, 12, .07) : EARS[L.ear].o;
    earsFront = `<g class="pb-earL"><path d="${d}" ${S(earLc)}/></g><g class="pb-earR"><g transform="${MIRROR}"><path d="${d}" ${S(earRc)}/></g></g>`;
  }

  /* うしろあたまの もよう（顔の もよう〈lower・mask・blaze〉は うしろからは 見えない） */
  let headIn = '';
  if (pL) headIn += `<ellipse cx="90" cy="${HY - 14}" rx="38" ry="36" fill="${pL}"/>`;
  if (pR) headIn += `<ellipse cx="150" cy="${HY - 14}" rx="38" ry="36" fill="${pR}"/>`;
  if (m.stripes) headIn += `<path d="M108 ${HY - 46}l3 15M120 ${HY - 50}v18M132 ${HY - 46}l-3 15M62 ${HY + 2}l14 3M62 ${HY + 14}h13M178 ${HY + 2}l-14 3M178 ${HY + 14}h-13M98 ${HY + 34}q22 9 44 0" fill="none" stroke="${m.stripes}" stroke-width="4.5" stroke-linecap="round"/>`;
  if (m.spots) headIn += [[140,64,4],[100,60,5],[116,72,3.5],[170,94,4],[70,90,4.5]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${m.spots}"/>`).join('');
  /* うなじの ふわっと した 毛（ふわふわ・ながい 毛の 子） */
  const nape = (fluffy || curly) ? `<path d="M100 ${HY + 40}q6 6 10 0q6 6 10 0q6 6 10 0q6 6 10 0" fill="none" stroke="${ol(c.main)}" stroke-opacity=".3" stroke-width="1.8" stroke-linecap="round"/>` : '';

  const WS = wearBack(wearFrom(opts), { id, SW, HX, HY, hrx, EY:cat ? 97 : 98, ear:L.ear });

  const head = `${earsBack}
    <path d="${headD}" ${S(c.main)}/>
    <g clip-path="url(#${id}h)">${headIn}</g>
    <path d="${headD}" fill="none" stroke="${ol(c.main)}" stroke-width="${SW}"/>
    ${nape}${earsFront}${WS.face}${WS.head}`;

  return `<svg class="pet-svg pet-back pb-t-${L.tail}${cat ? ' pb-cat' : ''}${short ? ' pb-short' : ''}" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
  </defs>
  <ellipse class="pb-shadow" cx="120" cy="225" rx="62" ry="8" fill="rgba(58,40,60,.16)"/>
  <g class="pb-all">
    ${legs}
    <g class="pb-body"><g class="pb-body-g">${haunch(hx1, 'L')}${haunch(hx2, 'R')}${feet}${body}</g></g>
    ${ruff}
    <g class="pb-neck pb-neck-b">${WS.back}</g>
    ${WS.over}
    <g class="pb-tail pb-tail-lo"><g class="pb-tail-g">${tail}</g></g>
    <g class="pb-head"><g class="pb-head-g">${head}</g></g>
    <g class="pb-neck">${WS.neck}</g>
    <g class="pb-tail pb-tail-hi" visibility="hidden"><g class="pb-tail-g">${tail}</g></g>
  </g>
</svg>`;
}

/* うしろから 見た きせかえ。x：id・SW・HX・HY・hrx（頭の よこはば）・EY（目の 高さ）・ear
   neck＝うなじの 帯（しっぽより 前）、back＝せなかに たれる ところ（しっぽの うしろ）、over＝うきわ（しっぽの うしろ） */
function wearBack(W, x){
  const out = { neck:'', back:'', face:'', head:'', defs:'', over:'' };
  const SW = x.SW, HX = x.HX, HY = x.HY, EY = x.EY;
  const ink = col => mix(col, '#2A1E2A', .42);
  const band = 'M86 152Q120 168 154 152';
  const bandStroke = (col, w, edge) => `<path d="${band}" fill="none" stroke="${edge || ink(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
  const along = (n) => Array.from({ length:n }, (_, i) => { const t = i / (n - 1), u = 1 - t; return [u * u * 86 + 2 * u * t * 120 + t * t * 154, u * u * 152 + 2 * u * t * 168 + t * t * 152]; });

  /* くび */
  const n = WEAR_BY_ID[W.neck];
  if (n){
    const p = n.p;
    if (n.kind === 'bandana'){
      /* うしろは むすび目と 2本の 先 */
      let fill = p.c;
      if (p.check){ out.defs += `<pattern id="${x.id}ck" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="#FFFFFF"/><rect width="4.5" height="9" fill="${p.c}" opacity=".55"/><rect width="9" height="4.5" fill="${p.c}" opacity=".55"/></pattern>`; fill = `url(#${x.id}ck)`; }
      out.back = `<path d="M118 162L104 178L112 181ZM122 162L136 178L128 181Z" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        (p.d ? [[110,174],[130,174]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.1" fill="${p.d}"/>`).join('') : '');
      out.neck = bandStroke(p.c, 9) +
        `<ellipse cx="120" cy="161" rx="7" ry="6" fill="${fill}" stroke="${ink(p.c)}" stroke-width="${SW}"/>` +
        (p.d ? [[98,158],[142,158]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="2.1" fill="${p.d}"/>`).join('') : '');
    } else if (n.kind === 'bell'){
      /* すずは 前。うしろは 帯と 金具 */
      let col = p.c, edge = ink(p.c);
      if (p.c === 'rainbow'){
        out.defs += `<linearGradient id="${x.id}rb" x1="86" x2="154" y1="0" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#B8A6EC"/><stop offset=".25" stop-color="#6FABE3"/><stop offset=".5" stop-color="#8CC26A"/><stop offset=".75" stop-color="#F5C562"/><stop offset="1" stop-color="#F27B7B"/></linearGradient>`;
        col = `url(#${x.id}rb)`; edge = '#6B5A7A';
      }
      out.neck = bandStroke(col, 8, edge) +
        `<rect x="114" y="155" width="12" height="10" rx="2.5" fill="${p.b}" stroke="${ink(p.b)}" stroke-width="1.8"/><path d="M120 157v6" stroke="${ink(p.b)}" stroke-width="1.6" stroke-linecap="round"/>`;
    } else if (n.kind === 'bowtie'){
      out.neck = bandStroke(p.c, 5);
    } else if (n.kind === 'scarf'){
      /* 帯と、せなかへ たらした 端（正面の 端と 同じ がわ＝うしろでは 左） */
      const tail = 'M104 158L90 156L84 192L97 195Z';
      const edge = ink(p.c);
      let tailFill = '', bandFill = '';
      if (p.tri){
        const [a1, a2, a3] = p.tri;
        out.defs += `<clipPath id="${x.id}sc"><path d="${tail}"/></clipPath>`;
        tailFill = `<g clip-path="url(#${x.id}sc)">` + Array.from({ length:8 }, (_, i) =>
          `<rect x="78" y="${153 + i * 6}" width="32" height="6" fill="${[a2, a3, a1][i % 3]}" transform="rotate(10 94 ${156 + i * 6})"/>`).join('') + '</g>';
        bandFill = `<path d="${band}" fill="none" stroke="${a2}" stroke-width="14" stroke-dasharray="6 12"/><path d="${band}" fill="none" stroke="${a3}" stroke-width="14" stroke-dasharray="6 12" stroke-dashoffset="-6"/>`;
      }
      out.back = `<g class="pb-scarf"><path d="${tail}" fill="${p.c}" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>${tailFill}` +
        `<path d="${tail}" fill="none" stroke="${edge}" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M86 194l-1 6M91 195l0 6M96 196l1 6" stroke="${p.tri ? p.tri[0] : edge}" stroke-width="2.4" stroke-linecap="round"/></g>`;
      out.neck = `<path d="${band}" fill="none" stroke="${edge}" stroke-width="${14 + SW * 2}" stroke-linecap="round"/><path d="${band}" fill="none" stroke="${p.c}" stroke-width="14" stroke-linecap="round"/>${bandFill}` +
        `<path d="M94 155l2 6M106 159l1 6M134 159l-1 6M146 155l-2 6" stroke="#FFFFFF" stroke-opacity=".18" stroke-width="2" stroke-linecap="round"/>`;
    } else if (n.kind === 'ukiwa'){
      /* うきわは からだの まわり。うしろからも 同じ（しっぽは こしから 出て うきわの 上に のる＝しっぽの うしろ） */
      out.over = `<path d="M74 168a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="#FFFFFF" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M74 168a46 21 0 0 0 23 18.2L105 174a20 9 0 0 1 -9-6Z" fill="#F27B7B"/><path d="M166 168a46 21 0 0 1 -23 18.2L135 174a20 9 0 0 0 9-6Z" fill="#F27B7B"/>` +
        `<path d="M97 150.2a46 21 0 0 1 46 0L136 161a20 9 0 0 0 -32 0Z" fill="#F27B7B"/>` +
        `<path d="M74 168a46 21 0 1 0 92 0a46 21 0 1 0 -92 0Z" fill="none" stroke="#9AA3B5" stroke-width="${SW}"/>` +
        `<path d="M86 162q6-6 14-8" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" fill="none" opacity=".8"/>`;
    } else if (n.kind === 'pearls'){
      out.neck = along(9).map(([a, b]) => `<circle cx="${f1(a)}" cy="${f1(b)}" r="4.4" fill="#FBF7F2" stroke="#BFAF9A" stroke-width="1.4"/><circle cx="${f1(a - 1.3)}" cy="${f1(b - 1.5)}" r="1.3" fill="#FFFFFF"/>`).join('');
    } else if (n.kind === 'lei'){
      const cols = ['#F28C8C','#C9B6F2','#FFFFFF','#FFD27A','#F7A9C4'];
      out.neck = along(7).map(([a, b], i) => [0, 72, 144, 216, 288].map(q => { const r = (q - 90) * Math.PI / 180; return `<circle cx="${f1(a + 4.6 * Math.cos(r))}" cy="${f1(b + 4.6 * Math.sin(r))}" r="4.1" fill="${cols[i % cols.length]}" stroke="${ink(cols[i % cols.length])}" stroke-width="1"/>`; }).join('') + `<circle cx="${f1(a)}" cy="${f1(b)}" r="3" fill="#F5C04A"/>`).join('');
    }
  }

  /* かお：めがね・サングラスは つるだけ（頭の よこ） */
  const fw = WEAR_BY_ID[W.face];
  if (fw){
    const p = fw.p, l = HX - x.hrx, r = HX + x.hrx;
    out.face = `<path d="M${l - 1} ${EY - 2}Q${l + 8} ${EY - 8} ${l + 16} ${EY - 16}M${r + 1} ${EY - 2}Q${r - 8} ${EY - 8} ${r - 16} ${EY - 16}" fill="none" stroke="${ink(p.c)}" stroke-width="${3 + SW}" stroke-linecap="round"/>` +
      `<path d="M${l - 1} ${EY - 2}Q${l + 8} ${EY - 8} ${l + 16} ${EY - 16}M${r + 1} ${EY - 2}Q${r - 8} ${EY - 8} ${r - 16} ${EY - 16}" fill="none" stroke="${p.c}" stroke-width="3" stroke-linecap="round"/>`;
  }

  /* あたま */
  const h = WEAR_BY_ID[W.head];
  if (h){
    const p = h.p;
    const mirrorFront = () => {
      const f = wearSvg({ head:W.head, face:null, neck:null }, { id:x.id + 'f', SW, HX, HY, EX:[97, 143], EY, ear:x.ear });
      out.defs += f.defs;
      return `<g transform="${MIRROR}">${f.head}</g>`;
    };
    if (h.kind === 'crown'){
      /* 王冠の うら：宝石は 前なので 見えない */
      const y0 = HY - 44;
      out.head = `<path d="M94 ${y0}L89 ${y0 - 30}L106 ${y0 - 15}L120 ${y0 - 36}L134 ${y0 - 15}L151 ${y0 - 30}L146 ${y0}Z" fill="#EDBE3A" stroke="#A8822A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<rect x="93" y="${y0 - 6}" width="54" height="9" rx="3" fill="#F2CF66" stroke="#A8822A" stroke-width="${SW}"/>` +
        `<circle cx="89" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/><circle cx="151" cy="${y0 - 31}" r="3.4" fill="#FFFFFF"/>` +
        (p.gem === 'heart' ? `<circle cx="120" cy="${y0 - 37}" r="3.6" fill="#F0728E"/>` : `<circle cx="120" cy="${y0 - 37}" r="3.4" fill="#FFFFFF"/>`);
    } else if (h.kind === 'pumpkin'){
      /* かぼちゃの うしろ（かおは ない） */
      const y0 = HY - 50;
      out.head = `<path d="M120 ${y0 - 26}c-22 0-34 10-34 22 0 9 14 14 34 14s34-5 34-14c0-12-12-22-34-22z" fill="#F0A04B" stroke="#A8642A" stroke-width="${SW}"/>` +
        `<path d="M120 ${y0 - 25}c-9 6-9 29 0 35M120 ${y0 - 25}c9 6 9 29 0 35M102 ${y0 - 21}c-6 8-6 22 0 28M138 ${y0 - 21}c6 8 6 22 0 28" fill="none" stroke="#C97A30" stroke-width="2"/>` +
        `<path d="M120 ${y0 - 26}c0-8-4-12-9-13" stroke="#5C8A3A" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M112 ${y0 - 36}c-6-4-12-2-13 2 6 3 10 2 13-2z" fill="#7CC26A"/>`;
    } else if (h.kind === 'hachimaki'){
      /* はちまきの むすび目は うしろ。2本の 先が たれる */
      out.head = `<path d="M62 ${HY - 22}Q120 ${HY - 40} 178 ${HY - 22}" fill="none" stroke="#B9373E" stroke-width="${12 + SW * 2}" stroke-linecap="round" opacity=".55"/><path d="M62 ${HY - 22}Q120 ${HY - 40} 178 ${HY - 22}" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>` +
        `<path d="M118 ${HY - 28}l-12 26M122 ${HY - 28}l14 24" stroke="#B9373E" stroke-opacity=".55" stroke-width="${8 + SW * 2}" stroke-linecap="round"/><path d="M118 ${HY - 28}l-12 26M122 ${HY - 28}l14 24" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>` +
        `<ellipse cx="120" cy="${HY - 30}" rx="9" ry="7" fill="#FFFFFF" stroke="#C9A0A3" stroke-width="${SW}"/>`;
    } else if (h.kind === 'usagi'){
      /* うさぎのみみの うら（ピンクは 前） */
      const ear = (cx, rot) => `<g transform="rotate(${rot} ${cx} ${HY - 40})"><ellipse cx="${cx}" cy="${HY - 72}" rx="12" ry="32" fill="#FFFFFF" stroke="#B9B4C2" stroke-width="${SW}"/><path d="M${cx} ${HY - 96}v40" stroke="#E4E0EA" stroke-width="4" stroke-linecap="round"/></g>`;
      out.head = `<path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#B9B4C2" stroke-width="${5 + SW}" stroke-linecap="round" opacity=".6"/><path d="M84 ${HY - 34}Q120 ${HY - 56} 156 ${HY - 34}" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>` +
        ear(106, -12) + ear(134, 12);
    } else if (h.kind === 'tiara'){
      /* ティアラの うら：帯と 山の かげ */
      const y0 = HY - 40;
      out.head = `<path d="M110 ${y0 - 4}L114 ${y0 - 18}L120 ${y0 - 8}L126 ${y0 - 18}L130 ${y0 - 4}" fill="#CDD2E0" stroke="#A9AFC2" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M120 ${y0 - 22}l5 7-5 7-5-7z" fill="#B3A3DE" stroke="#7D6AB0" stroke-width="1.6" stroke-linejoin="round"/>` +
        `<path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#A9AFC2" stroke-width="${5 + SW * 2}" stroke-linecap="round"/><path d="M86 ${y0 + 4}Q120 ${y0 - 16} 154 ${y0 + 4}" fill="none" stroke="#E4E8F2" stroke-width="5" stroke-linecap="round"/>`;
    } else if (h.kind === 'kabuto'){
      /* かぶとの うしろ：ドームと しころ（くびの うしろの たれ）。くわがたの 先が 上に 見える */
      const y0 = HY - 40;
      out.head = `<path d="M104 ${y0 - 18}C96 ${y0 - 44} 108 ${y0 - 52} 112 ${y0 - 52}C110 ${y0 - 40} 112 ${y0 - 28} 116 ${y0 - 20}ZM136 ${y0 - 18}C144 ${y0 - 44} 132 ${y0 - 52} 128 ${y0 - 52}C130 ${y0 - 40} 128 ${y0 - 28} 124 ${y0 - 20}Z" fill="#E2B43A" stroke="#A8822A" stroke-width="2" stroke-linejoin="round"/>` +
        `<path d="M80 ${y0 + 6}C80 ${y0 - 30} 160 ${y0 - 30} 160 ${y0 + 6}Z" fill="#3E5FA8" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M70 ${y0 + 4}L170 ${y0 + 4}L164 ${y0 + 24}Q120 ${y0 + 32} 76 ${y0 + 24}Z" fill="#5B7FC9" stroke="#24386A" stroke-width="${SW}" stroke-linejoin="round"/>` +
        `<path d="M74 ${y0 + 14}Q120 ${y0 + 22} 166 ${y0 + 14}" fill="none" stroke="#24386A" stroke-opacity=".45" stroke-width="2"/>`;
    } else if (h.kind === 'straw'){
      /* むぎわらぼうしは 正面と 同じ ＋ リボンの 先が うしろに たれる */
      out.head = mirrorFront() + `<path d="M116 ${HY - 40}l-8 22M124 ${HY - 40}l9 20" stroke="#D9534F" stroke-width="6" stroke-linecap="round"/>`;
    } else {
      /* リボン・花かんむり・ベレー・ニット帽・サンタ・カチューシャ・ヘアピン・あまがさ：正面の 絵を 左右 反対に */
      out.head = mirrorFront();
    }
  }
  return out;
}
