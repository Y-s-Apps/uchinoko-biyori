import {A_FRAME, aFrameHeight} from './a-frame.js';
import {SEESAW, seesawSurface} from './seesaw.js';

const grass = () => -.035;
const road = () => .015;
const forestTrail = () => .016;

export function footingFor(sim, agility) {
  if (!agility) return sim.layout.theme === 'forest' ? forestTrail : road;
  const runner = sim.player;
  // Front paws can reach a plank before the hips enter, and rear paws leave it last.
  const obstacle = sim.layout.obstacles.find(o =>
    (o.type === 'a-frame' || o.type === 'seesaw') && Math.abs(runner.s - o.s) < A_FRAME.run + 1
  );
  if (!obstacle || Math.abs(runner.x - obstacle.lane * 2) > .68) return grass;
  const distance = runner.s - obstacle.s;
  if (obstacle.type === 'a-frame' && sim.rampPass?.onBoard !== false && Math.abs(distance) < A_FRAME.run + 1) {
    return ahead => Math.abs(distance + ahead) <= A_FRAME.run ? aFrameHeight(distance + ahead) : grass();
  }
  if (obstacle.type === 'seesaw' && Math.abs(distance) < SEESAW.length / 2 + 1) {
    const {angle, phase} = sim.seesaws.get(obstacle.id);
    if (phase === 'missed' || Math.abs(runner.x - obstacle.lane * 2) >= .48) return grass;
    const half = SEESAW.length / 2 * Math.cos(angle);
    return ahead => Math.abs(distance + ahead) <= half ? seesawSurface(distance + ahead, angle) : grass();
  }
  return grass;
}

// For each diagonal pair, plant the sole during the backstroke and lift it on return.
export function poseLegs(dog, phase, running, airborne, heightAt) {
  const pitch = dog.rotation.x, roll = dog.rotation.z, scale = dog.scale.y;
  const cp = Math.cos(pitch), sp = Math.sin(pitch), cr = Math.cos(roll), sr = Math.sin(roll);
  for (const leg of dog.userData.legs) {
    const {hip, paw} = leg.userData;
    const cycle = phase * 1.85 + leg.userData.phase;
    const swing = airborne ? (hip.z > 0 ? -.64 : .74) : running ? .52 * Math.sin(cycle) : 0;
    leg.position.copy(hip);
    leg.rotation.x = swing;
    paw.rotation.x = airborne ? -.35 * swing : -swing;
    if (airborne) continue;

    const lift = running ? Math.max(0, -Math.cos(cycle)) ** 2 * hip.y * .23 : 0;
    const cs = Math.cos(swing), ss = Math.sin(swing);
    const soleY = hip.y + paw.position.y * cs - paw.position.z * ss - paw.scale.y;
    const soleZ = hip.z + paw.position.y * ss + paw.position.z * cs;
    const tiltedY = hip.x * sr + soleY * cr;
    const ahead = scale * (sp * tiltedY + cp * soleZ);
    const worldY = dog.position.y + scale * (cp * tiltedY - sp * soleZ);
    const dy = (heightAt(ahead) - worldY) / scale + lift;
    // Convert a vertical world-space correction to the leaning dog's local axes.
    leg.position.x += cp * sr * dy;
    leg.position.y += cp * cr * dy;
    leg.position.z -= sp * dy;
  }
}
