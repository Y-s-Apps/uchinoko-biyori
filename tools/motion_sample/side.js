/* ===== よこむきの うちのこ（見本。右を むく。左へ あるく ときは 入れものを scaleX(-1)） =====
   renderPet と 同じ look から かく。グループ：
   ps-leg（ps-bf うしろ・おく／ps-ff まえ・おく／ps-bn うしろ・てまえ／ps-fn まえ・てまえ。軸は 肩・腰）、ps-tail > ps-tail-g、ps-body、
   ps-neckw（首の きせかえ）、ps-head > ps-head-g（ps-ear・目・口・舌） */
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
      const tail = `M${HX - 30} ${HY + 38}L${HX - 18} ${HY + 42}L${HX - 30} ${HY + 76}L${HX - 43} ${HY + 72}Z`;
      neckWear += `<path d="${tail}" fill="${p.c}" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      if (p.tri){
        const [a1, a2, a3] = p.tri;
        neckWear += `<defs><clipPath id="${id}sc"><path d="${tail}"/></clipPath></defs><g clip-path="url(#${id}sc)">` + Array.from({ length:7 }, (_, i) => `<rect x="${HX - 50}" y="${HY + 36 + i * 6}" width="40" height="6" fill="${[a2, a3, a1][i % 3]}" transform="rotate(-14 ${HX - 30} ${HY + 39 + i * 6})"/>`).join('') + `</g><path d="${tail}" fill="none" stroke="${ink(p.c)}" stroke-width="${SW}" stroke-linejoin="round"/>`;
      }
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
