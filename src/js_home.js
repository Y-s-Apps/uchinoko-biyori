/* ===== ホーム画面版だけのJS（build.sh がホーム画面版にだけ、js_rules.js のすぐあとに入れる。Claude版・LINE版・サーバーには入らない） =====
 * おたすけを出しなおす：ホーム画面版のおたすけは1日おき（HOME_RESCUE_EVERY）。それより きびしいルール
 * （前の版や ほかの版の「7日に1回」）で、きょうの おねがい3つを かなえて れんぞくが1にもどってしまった子に、
 * いまのルールなら出ていた「おたすけを まつ」形（streak.saved）に もどして、おたすけのおねがいを出しなおす。
 * ひらいたとき（Rules.open）に、ensureDaily より前に 1回だけ見る。いまのルールで かなえた日には当てはまらない
 * （3つを かなえたときに saved が できるので）。2026-11-12 に、だいずの れんぞく（31日）が1にもどったので足した。 */
const HomeRescue = {
  /* d の日から さかのぼった れんぞくの日数（スタンプの日を数え、おたすけで つないだ日は数えずに とばす） */
  streakBefore(st, d){
    const stamps = new Set(st.stamps), rescued = new Set(st.rescued);
    let n = 0, k = d, guard = 0;
    while (guard++ < 50000){
      if (stamps.has(k)) n++;
      else if (!rescued.has(k)) break;
      k = keyShift(k, -1);
    }
    return n;
  },
  fix(st){
    const d = dayKey(), y = keyShift(d, -1), y2 = keyShift(d, -2);
    if (!st || !st.daily || !st.streak || st.daily.day !== d || !st.daily.all) return false;
    if (st.streak.saved || st.streak.last !== d || st.streak.n !== 1) return false;
    if (st.daily.rescue && st.daily.rescue.done) return false;
    if (st.stamps.includes(y) || st.rescued.includes(y) || !st.stamps.includes(y2)) return false;   /* きのうだけ おやすみ */
    if (!Rules.rescueReady(st, d)) return false;
    const n = this.streakBefore(st, y2);
    if (n < 1) return false;
    st.streak.saved = { n, day:d };
    st.daily.rescueNoticed = false;     /* 「とぎれちゃった」を出した日でも、ピンチのお知らせを出す */
    return true;
  },
};
{
  const open = Rules.open;
  Rules.open = function(st, away, ev){ HomeRescue.fix(st); return open.call(this, st, away, ev); };
}
