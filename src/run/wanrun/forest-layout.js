import {pointOnRoute, cornerAt, TURN_WINDOW} from './race-route.js';
import {addJumpTreats} from './log-treats.js';

export function buildForestRace() {
  const length = 510;
  const turns = [
    [72, 'left', 18, 52],
    [142, 'right', 20, 88],
    [231, 'left', 19, 78],
    [298, 'right', 19, 76],
    [389, 'left', 18, 68],
    [452, 'right', 19, 48]
  ].map(([start, direction, radius, degrees], id) => {
    const length = radius * degrees * Math.PI / 180;
    return {id, start, direction, radius, length, end: start + length};
  });

  const obstacles = [[35, 0], [105, -1], [195, 1], [273, 0],
    [349, -1], [425, 1], [492, 0]].map(([s, lane], id) => ({id, s, lane, type: 'log'}));
  const treats = [];
  for (let s = 7; s < length - 5; s += 2.15) {
    const log = obstacles.find(o => Math.abs(s - o.s) < 13);
    if (log && Math.abs(s - log.s) <= 4.8) continue;
    const lane = cornerAt(s, TURN_WINDOW, 4, turns) ? 0 : log?.lane ?? 0;
    treats.push({id: treats.length, s, lane, y: .65});
  }
  for (const log of obstacles) addJumpTreats(treats, log);
  treats.sort((a, b) => a.s - b.s);
  return {theme: 'forest', length, turns, obstacles, treats,
    point: (s, laneOffset = 0) => pointOnRoute(turns, s, laneOffset)};
}
