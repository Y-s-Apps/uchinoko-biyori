/* うちのこラン：まとめる ファイルの 入口（tools/run/build_run.mjs が ここから src/run_bundle.js を 作る）。
 * esbuild の iife で 1つの ファイルに まとめ、名前は ぜんぶ 中に とじる（アプリの スクリプトの T・clamp・mix などと ぶつからない）。
 * 外に 出すのは window.UchinokoRun だけ（ホームの js_run.js が つかう）。レースは race.js、アジリティは agility.js（P4）。 */
export { mountRace, COURSES, courseMap, helpHtml, formatClock, formatTime, timeMs, PET_SCALE } from './race.js';
export { mountAgility, AGILITY_COURSES, agilityMap, agilityHelpHtml } from './agility.js';
export { makePet3D, posePet3D, disposePet3D } from './pet3d.js';
export const VERSION = 'p6';
