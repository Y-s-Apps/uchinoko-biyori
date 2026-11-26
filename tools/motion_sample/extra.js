/* ===== 正面の 絵に 足す 部品（見本。だんかい 2 で renderPet に 入れる 予定。ふだんは opacity="0"＝見た目は かわらない） =====
   pvx-down（ふせる・ねる：前に のばした 前あし）、pvx-beg（おねだり：上げて まげた 前あし。むなげ・首の きせかえより 前＝いちばん うしろに かく）、pvx-hind（かく：うしろ足）、
   pvx-pawup（けづくろい：顔の 前の 前足。頭の 上に かく）、pvx-tongue（はぁはぁ・ぺろり：頭の 中）、pv-footL/R（うしろ足の 先を 左右べつに） */
function petFront(rawLook, wear){
  const L = normalizeLook(rawLook), c = L.colors, m = L.marks, cat = L.species === 'cat';
  const SW = 2.4, ol = col => mix(col, '#3A2A3A', .5);
  const S = col => `fill="${col}" stroke="${ol(col)}" stroke-width="${SW}" stroke-linejoin="round"`;
  const thick = (d, col, w) => `<path d="${d}" fill="none" stroke="${ol(col)}" stroke-width="${w + SW * 2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const toes = (x, y) => `<path d="M${x - 4} ${y - 3.5}v5M${x + 4} ${y - 3.5}v5" stroke="${ol(c.paws)}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`;
  const hx1 = cat ? 84 : 80;
  const NY = cat ? { short:109, medium:111, long:113 }[L.muzzle] : { short:112, medium:116, long:119 }[L.muzzle];
  let s = renderPet(rawLook, wear ? { wear } : {});
  /* うしろ足の 先を 左右べつに */
  s = s.replace(/<g class="pv-feet">(<ellipse[^>]*\/>)(<ellipse[^>]*\/>)<\/g>/, '<g class="pv-feet"><g class="pv-footL">$1</g><g class="pv-footR">$2</g></g>');
  /* 前あし（腕と 足先） */
  for (const k of ['L','R']) s = s.replace(new RegExp('<g class="pv-leg' + k + '-g">(<rect[^>]*/>(?:<path[^>]*/>)?)(<ellipse[^>]*/><path[^>]*/>)</g>'), '<g class="pv-leg' + k + '-g"><g class="pv-arm' + k + '">$1</g><g class="pv-paw' + k + '">$2</g></g>');
  const down = [108.5, 131.5].map(x => `<rect x="${x - 9.5}" y="198" width="19" height="18" rx="9.5" ${S(c.body)}/><ellipse cx="${x}" cy="215" rx="12.5" ry="8" ${S(c.paws)}/>${toes(x, 215)}`).join('');
  const beg = [[101, -8, 'L'], [139, 8, 'R']].map(([x, r, k]) => `<g class="pvx-beg${k}"><g transform="rotate(${r} ${x} 150)"><rect x="${x - 9.5}" y="146" width="19" height="25" rx="9.5" ${S(c.body)}/><ellipse cx="${x}" cy="172" rx="12.5" ry="8.5" ${S(c.paws)}/>${toes(x, 173)}</g></g>`).join('');
  const hind = `<g class="pvx-hindleg">` + thick(`M${hx1 - 4} 204C${hx1 - 30} 196 ${hx1 - 34} 164 ${hx1 - 22} 134`, c.body, 17) +
    `<ellipse cx="${hx1 - 21}" cy="128" rx="11" ry="8.5" transform="rotate(-24 ${hx1 - 21} 128)" ${S(c.paws)}/></g>`;
  const pawup = thick('M134 186C140 168 136 146 128 132', c.body, 17) + `<ellipse cx="126" cy="127" rx="11" ry="9.5" ${S(c.paws)}/>${toes(126, 124)}`;
  const tongue = cat
    ? `<path d="M116.5 ${NY + 9}c0 6 1.6 9 3.5 9s3.5-3 3.5-9z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.2"/>`
    : `<path d="M114 ${NY + 13}c0 9 2.6 14 6 14s6-5 6-14z" fill="#F38BA0" stroke="#C25A72" stroke-width="1.4"/><path d="M120 ${NY + 16}v7" stroke="#C25A72" stroke-width="1.2" stroke-linecap="round"/>`;
  const lick = cat
    ? `<ellipse cx="120" cy="${NY + 6}" rx="3.6" ry="4.4" fill="#F38BA0" stroke="#C25A72" stroke-width="1.1"/>`
    : `<ellipse cx="120" cy="${NY + 10}" rx="5" ry="6" fill="#F38BA0" stroke="#C25A72" stroke-width="1.3"/>`;
  s = s.replace('<g class="pv-head">', `<g class="pvx-down" opacity="0">${down}</g><g class="pvx-hind" opacity="0">${hind}</g><g class="pv-head">`);
  s = s.replace('<g class="pv-mouth-o">', `<g class="pvx-tongue" opacity="0">${tongue}</g><g class="pvx-lick" opacity="0">${lick}</g><g class="pv-mouth-o">`);
  s = s.replace(/(<g class="pv-neck">[\s\S]*?<\/g><\/g>)(\s*<\/g>\s*<\/svg>)/, `$1<g class="pvx-beg" opacity="0">${beg}</g><g class="pvx-pawup" opacity="0">${pawup}</g>$2`);
  return s;
}
