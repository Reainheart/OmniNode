import { NODE_RADIUS } from "../constants";

function normalize(dx, dy) {
  const len = Math.hypot(dx, dy);
  if (len === 0) return { x: 0, y: 0 };
  return { x: dx / len, y: dy / len };
}

/**
 * Given two node centers, returns points on the circle edge (radius NODE_RADIUS)
 * so arrows touch the edge, not the center.
 */
export function edgeToEdge(fromCenter, toCenter) {
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;
  const dir = normalize(dx, dy);

  const start = {
    x: fromCenter.x + dir.x * NODE_RADIUS,
    y: fromCenter.y + dir.y * NODE_RADIUS,
  };

  const end = {
    x: toCenter.x - dir.x * NODE_RADIUS,
    y: toCenter.y - dir.y * NODE_RADIUS,
  };

  return { start, end };
}
