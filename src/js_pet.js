/* ===== color utils ===== */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
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
  let preset = BREED_BY_ID[raw.breedId];
  if (!preset || preset.sp !== sp) preset = BREED_BY_ID[sp === 'cat' ? 'mix_cat' : 'mix_dog'];
  const P = preset.look;
  const L = { species: sp, breedId: (BREED_BY_ID[raw.breedId] ? raw.breedId : preset.id) };
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
  const haunch = x => fluffy || curly ? `<path d="${blob(x, 206, hrr, 16, 9, .07)}" ${S(haunchCol)}/>` : `<ellipse cx="${x}" cy="206" rx="${hrr}" ry="16" ${S(haunchCol)}/>`;
  const feet = `<ellipse cx="${hx1 - 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/><ellipse cx="${hx2 + 6}" cy="219" rx="12" ry="6.5" ${S(c.paws)}/>`;
  const legPart = (x, px, toes, sx) => `<rect x="${x}" y="${legTop}" width="19" height="${218 - legTop}" rx="9.5" ${S(c.body)}/>` +
    (m.stripes && L.legs !== 'short' ? `<path d="M${sx} 194h6M${sx} 202h6" stroke="${m.stripes}" stroke-width="3.5" stroke-linecap="round"/>` : '') +
    `<ellipse cx="${px}" cy="217" rx="12" ry="7.5" ${S(c.paws)}/>` +
    `<path d="M${toes[0]} 213.5v5M${toes[1]} 213.5v5" stroke="${ol(c.paws)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;
  const legs = `<g class="pv-legL">${legPart(99, 108.5, [104.5, 112.5], 101)}</g><g class="pv-legR">${legPart(122, 131.5, [127.5, 135.5], 133)}</g>`;

  /* head */
  const backEar = ['pointy','big','small'].includes(L.ear);
  const earL = (m.patchL && c.ear === c.main) ? m.patchL : c.ear;
  const earR = (m.patchR && c.ear === c.main) ? m.patchR : c.ear;
  const innerCol = col => cat ? mix(col, '#F4AEBB', .7) : mix(col, '#F3C2C9', .55);
  let earsBack = '', earsFront = '';
  if (backEar){
    const E = EARS[L.ear];
    earsBack = `<path d="${E.o}" ${S(earL)}/><path d="${E.i}" fill="${innerCol(earL)}"/>` +
      `<g transform="${MIRROR}"><path d="${E.o}" ${S(earR)}/><path d="${E.i}" fill="${innerCol(earR)}"/></g>`;
  } else {
    const d = (L.ear === 'long' && (curly || fluffy)) ? blob(66, 112, 22, 46, 12, .07) : EARS[L.ear].o;
    earsFront = `<path d="${d}" ${S(earL)}/><g transform="${MIRROR}"><path d="${d}" ${S(earR)}/></g>`;
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
    <g class="pv-mouth-o">${mouthO}</g>
    ${cheeks}${WS.face}${WS.head}`;

  return `<svg class="pet-svg" viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <clipPath id="${id}h"><path d="${headD}"/></clipPath>
    <clipPath id="${id}b"><path d="${bodyD}"/></clipPath>
    ${WS.defs}
    ${m.mask ? `<radialGradient id="${id}g"><stop offset="0" stop-color="${m.mask}" stop-opacity=".95"/><stop offset=".55" stop-color="${m.mask}" stop-opacity=".85"/><stop offset="1" stop-color="${m.mask}" stop-opacity="0"/></radialGradient>` : ''}
  </defs>
  <ellipse class="pv-shadow" cx="120" cy="225" rx="62" ry="8" fill="rgba(58,40,60,.16)"/>
  <g class="pv-all">
    <g class="pv-tail">${tail}</g>
    <g class="pv-body">${haunch(hx1)}${haunch(hx2)}${feet}${body}<g class="pv-legs">${legs}</g></g>
    <g class="pv-head">${head}</g>
    <g class="pv-neck">${WS.neck}</g>
  </g>
</svg>`;
}
