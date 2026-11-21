import {MathUtils} from 'three';
import {chaseCameraPose} from './chase-camera.js';
import {routePoint} from './race-route.js';
import {parkExitOffset} from './tunnel.js';
import {RACE} from './race-sim.js';

// Prior lane samples only set how long the close view lasts. The camera and
// its target always share the runner's current lateral position and heading.
export function makeParkCamera(obstacles) {
  const gates = obstacles.filter(o => o.type === 'tunnel');
  const trail = [];
  function lateralAt(s) {
    const i = trail.findIndex(sample => sample.s >= s);
    if (i < 0) return trail.at(-1).x;
    if (i === 0) return trail[0].x;
    const a = trail[i - 1], b = trail[i];
    return MathUtils.lerp(a.x, b.x, (s - a.s) / (b.s - a.s));
  }
  return (runner, normalDistance, normalHeight) => {
    const {s, x} = runner;
    if (trail.length && s < trail.at(-1).s) trail.length = 0;
    if (!trail.length || s - trail.at(-1).s >= .10) trail.push({s, x});
    while (trail.length > 2 && trail[1].s < s - 10) trail.shift();
    const anchor = routePoint(s, x);
    const gate = gates.find(o => s > o.s - 22 && s < o.s + 24);
    if (!gate) return chaseCameraPose(anchor, {distance:normalDistance, height:normalHeight});
    const past = s - gate.s;
    const approach = MathUtils.smoothstep(past, -22, -7);
    const exit = 1 - MathUtils.smoothstep(past, 12, 24);
    const earlierX = lateralAt(s - normalDistance);
    const lane = gate.lane * RACE.lanewidth;
    const proximity = Math.min(Math.abs(x - lane), Math.abs(earlierX - lane));
    const through = approach * exit * (1 - MathUtils.smoothstep(proximity, .85, 1.85));
    const distance = MathUtils.lerp(normalDistance, 4.85, through);
    const height = MathUtils.lerp(normalHeight, 1.26, through);
    const lookHeight = MathUtils.lerp(1, .77, through);
    // At the exit a sideways runner may carry the camera across the solid
    // sleeve. Clear the lip along the chase axis before crossing the side wall.
    const lateral = Math.abs(x - lane);
    const crossesWall = MathUtils.smoothstep(lateral, .48, .98)
      * (1 - MathUtils.smoothstep(lateral, 1.85, 2));
    const beyondLip = past - parkExitOffset - .18;
    if (beyondLip > 0 && beyondLip < distance && crossesWall > 0) {
      const clearance = crossesWall * MathUtils.smoothstep(beyondLip, 0, .66);
      const safeDistance = MathUtils.lerp(distance, beyondLip, clearance);
      const ratio = safeDistance / distance;
      const safeLook = height + (lookHeight - height) * (safeDistance + 10) / (distance + 10);
      const pose = chaseCameraPose(anchor, {distance:safeDistance, height, lookHeight:safeLook});
      pose.zoom = ratio;
      return pose;
    }
    return chaseCameraPose(anchor, {distance, height, lookHeight});
  };
}
