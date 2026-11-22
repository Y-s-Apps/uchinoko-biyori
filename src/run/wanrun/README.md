# わんラン v33 から 持ってきた ファイル（うちのこラン P2〜P4）

もとは `_ref/wanrun-v33/wanrun-v33.zip` の `source/dist/`（コミット `bdcb40e`）。オーナーが ChatGPT で 作った ゲーム。

**かえたのは 1か所だけ：** `import … from './assets/three.module.js'` を `from 'three'` に（esbuild が `tools/run/node_modules/three`〈r170・わんランと 同じ〉を まとめる）。
ほかは もとの まま（ロジック・数・景色）。直すときは うちのこ日和の ほうの ファイル（`src/run/race.js` など）で 包んで、ここは なるべく さわらない。

| ファイル | 中身 | つかう ところ |
| --- | --- | --- |
| `race-sim.js` | レースの ルール（3レーン・5ひき・まがりかど・障害物・おやつと ダッシュ・CPU・順位）と スワイプの 見わけ `gestureAction` | `race.js` |
| `race-route.js` | 公園の まがりかどと 道の 座標 | `race.js`・景色・カメラ |
| `park-tunnel-profile.js` | 公園の トンネルの 大きさ | `race-sim.js`・`tunnel.js` |
| `beach-layout.js`・`forest-layout.js`・`log-treats.js` | 海辺・森の 配置（P3 から。`race-sim.js` が import する） | `race-sim.js` |
| `race-track.js` | レースの 道・器具・おやつの 3D | `race.js` |
| `park-art.js`・`park-biscuit.js`・`tunnel.js` | 公園の 景色・骨の ビスケット・トンネル | `race-track.js`・`race.js`（HUD の アイコン） |
| `forest-scene.js`・`beach-scene.js` | 森・海辺の 景色（P3 から） | `race-track.js` |
| `park-camera.js`・`chase-camera.js` | うしろから 追う カメラ（公園の トンネル） | `race.js` |
| `dog-gait.js`・`a-frame.js`・`seesaw.js` | 足を 地面に つける `poseLegs`・`footingFor`（坂・シーソーの 上も） | `race.js`・`agility.js` |
| `agility-sim.js` | アジリティの ルール（ひとりで 6つの 障害物・ハードル・わっか・トンネル・スラローム・Aフレーム・シーソー〈とまる → まつ → タップ〉・ミス 1回 +5秒）（P4） | `agility.js`・`tools/run/run_min.mjs` |
| `agility-route.js` | 広場の 道（ぐるっと まわって まんなかで ゴール） | `agility-sim.js` |
| `agility-field.js` | 広場の 景色と 器具の 3D（さく・木・番号の 札・つぎの 障害物の わ） | `agility.js` |
| `slalom.js` | スラロームの ポール（6本・こうごに） | `agility-sim.js`・`agility-field.js`・`agility.js` |

つかわない もの（`race-game.js`・`companions.js`・`app.js`・`courses.js` など）は 持ってきていない。`race-game.js` の 画面は `src/run/race.js`（レース）と `src/run/agility.js`（アジリティ。P4）に 作りなおした。
