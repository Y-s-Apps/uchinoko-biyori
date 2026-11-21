// Dimensions are shared by the painted panels, the dog's footing and the entry cue.
export const A_FRAME = Object.freeze({run: 4.8, height: 2.15, width: 1.9, entryTolerance: .68});
const angle = Math.atan2(A_FRAME.height, A_FRAME.run);

export function aFrameHeight(offset) {
  return Math.max(0, 1 - Math.abs(offset) / A_FRAME.run) * A_FRAME.height;
}

// Ease camera travel at the grass and ridge. Position depends on footing, so
// the camera stays still if the player stops partway up the incline.
export function aFrameCameraLift(surfaceHeight) {
  const t = Math.max(0, Math.min(1, surfaceHeight / A_FRAME.height));
  const shoulder = .2;
  let lift = t - shoulder / 2;
  if (t < shoulder) lift = t * t / (2 * shoulder);
  if (t > 1 - shoulder) lift = 1 - shoulder - (1 - t) ** 2 / (2 * shoulder);
  return A_FRAME.height * .85 * lift / (1 - shoulder);
}

export function aFramePitch(offset) {
  // The dog's body rolls over the ridge and toes while the two panels stay rigid.
  const blend = Math.min(1, Math.abs(offset) / .85, Math.max(0, A_FRAME.run - Math.abs(offset)) / .85);
  return Math.sign(offset) * angle * blend;
}

export function addAFrame(parent, box) {
  const {run, width} = A_FRAME, thickness = .12;
  for (const side of [1, -1]) {
    const tilt = side * angle;
    // Position each box by its top face so the painted sections join exactly.
    for (const [from, to, color] of [[0, run - 1.35, '#4b8f95'], [run - 1.35, run, '#edc65e']]) {
      const middle = (from + to) / 2;
      const panel = box(width, thickness, (to - from) / Math.cos(angle), color,
        0, aFrameHeight(middle) - thickness * Math.cos(angle) / 2,
        side * middle - thickness * Math.sin(tilt) / 2, parent);
      panel.name = 'a-frame-panel';
      panel.rotation.x = tilt;
      panel.castShadow = true;
    }
    for (const z of [.85, 1.65, 2.45, 3.25, 4.05]) {
      const grip = box(width - .12, .032, .078, z > run - 1.35 ? '#d4aa48' : '#78a9a2',
        0, aFrameHeight(z) + .013, side * z, parent);
      grip.rotation.x = tilt;
    }
  }
  for (const side of [-1, 1]) {
    box(.075, .09, run, '#677e78', side * (width / 2 - .1), .86, 0, parent);
  }
}
