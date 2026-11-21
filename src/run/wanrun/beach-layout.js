import {pointOnRoute, TURN_WINDOW} from './race-route.js';

import {addJumpTreats} from './log-treats.js';

const length = 472;
const turns = [
  [82, 'right', 32, 36],
  [180, 'left', 35, 62],
  [288, 'left', 34, 26],
  [388, 'right', 32, 52]
].map(([start, direction, radius, degrees], id) => {
  const arc = radius * degrees * Math.PI / 180;
  return {id, start, direction, radius, length: arc, end: start + arc};
});

// Each straight splits into a firm jump line and a soft-sand snack line.
export function buildBeachRace() {
  const obstacles = [
    [38, 0, -1], [138, 1, -1], [244, -1, 1], [344, 1, -1], [440, -1, 1]
  ].map(([s, lane, snackLane], id) => ({id, s, lane, snackLane, type: 'log'}));
  // Allow one swipe out after a turn and one back before turn input takes over.
  const approaches = obstacles.map((log, i) => ({
    lane: log.lane,
    from: i ? turns[i - 1].end + 6 : 0,
    to: turns[i] ? turns[i].start - TURN_WINDOW - 6 : length
  }));
  const sand = obstacles.map(({s, snackLane}) => ({
    s, lane: snackLane, halfLength: 4.8, halfWidth: .87
  }));
  const treats = [];
  function add(s, lane) {
    treats.push({id: treats.length, s, lane, y: .65});
  }
  for (let s = 7; s < length - 6; s += 2.15) {
    if (obstacles.some(log => Math.abs(s - log.s) <= 8.5)) continue;
    const approach = approaches.find(section => s >= section.from && s <= section.to);
    // Leave a short break where the line moves across, especially at dash speed.
    if (approaches.some(section => section.lane !== 0 &&
      (Math.abs(s - section.from) < 1.6 || Math.abs(s - section.to) < 1.6))) continue;
    add(s, approach?.lane ?? 0);
  }
  for (const log of obstacles) {
    addJumpTreats(treats, log);
    for (let n = -6; n <= 6; n++) add(log.s + n * 1.3, log.snackLane);
  }
  treats.sort((a, b) => a.s - b.s);
  return {theme: 'beach', length, turns, point: (s, lateral = 0) => pointOnRoute(turns, s, lateral),
    sand, obstacles, treats};
}

export function touchesSoftSand(patches, s, x) {
  return patches.some(patch => {
    const along = (s - patch.s) / patch.halfLength;
    const across = (x - patch.lane * 2) / patch.halfWidth;
    return along * along + across * across < 1;
  });
}
