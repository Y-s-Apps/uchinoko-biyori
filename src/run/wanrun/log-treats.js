// Relative to the centre of a log, in running order. Even the lowest
// biscuit sits above the grounded pickup range.
const jumpArc = [
  {distance: -2.1, height: 1.70},
  {distance: 0, height: 2.12},
  {distance: 2.1, height: 1.70}
];

export function addJumpTreats(treats, log) {
  for (const {distance, height} of jumpArc) {
    treats.push({
      id: treats.length, s: log.s + distance, lane: log.lane, y: height,
      jumpLog: log.id
    });
  }
}
