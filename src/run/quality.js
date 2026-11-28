/* うちのこラン：3D の こまかさを 自動で さげる（レビュー R3-2。2026-11-28）
 *
 *   makeQuality(renderer, light) → { sample(dt, running), level, pixelRatio, shadows }
 *
 * 走っている あいだの こまの 長さを 2秒ごとに 見て、1こまの へいきんが 1/24秒より 長い（1秒に 24こま より 少ない）
 * おそい 端末では、画面の きめ（pixel ratio：1.6 → 1.25 → 1）→ かげ（DirectionalLight の castShadow）の じゅんに 1だんずつ さげる。
 * いちど さげたら その 回は あげない（いったり きたり しない）。はじめの 1.2秒（シェーダーを 作る あいだ）と、さげた すぐあとの 1.5秒は 見ない。
 * オーナーの iPhone（1秒に 30こま）は さがらない。見た目の 色・形・ルールは かわらない（きめと かげだけ）。 */
export const QUALITY = { fps:24, window:2, warmup:1.2, cool:1.5 };

export function makeQuality(renderer, light){
  const top = Math.min(window.devicePixelRatio || 1, 1.6);
  const ratios = [top];
  for (const r of [1.25, 1]) if (r < ratios[ratios.length - 1]) ratios.push(r);
  let step = 0, level = 0, shadows = true, wait = QUALITY.warmup, sum = 0, n = 0;
  return {
    get level(){ return level; },
    get pixelRatio(){ return ratios[step]; },
    get shadows(){ return shadows; },
    /* 1こまごとに よぶ（running：走っている＝カウントダウン・ひとやすみ・ゴールの あとは 見ない） */
    sample(dt, running){
      if (!running || !(dt > 0)){ sum = 0; n = 0; return; }
      if (wait > 0){ wait -= dt; sum = 0; n = 0; return; }
      sum += dt; n++;
      if (sum < QUALITY.window) return;
      const slow = sum / n > 1 / QUALITY.fps;
      sum = 0; n = 0;
      if (!slow) return;
      if (step < ratios.length - 1){ step++; renderer.setPixelRatio(ratios[step]); }
      else if (shadows && light){ shadows = false; light.castShadow = false; }
      else return;
      level++; wait = QUALITY.cool;
    },
  };
}
