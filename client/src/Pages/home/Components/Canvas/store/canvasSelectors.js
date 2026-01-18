import { NODE_RADIUS } from "../constants";
import { edgeToEdge } from "../geometry/edgeIntersection";

export function selectNodes(state) {
  return Object.values(state.objects.nodesById);
}

export function selectPointers(state) {
  return Object.values(state.objects.pointersById);
}

export function isSelected(state, id) {
  return state.ui.selected.has(id);
}

export function selectPointerVMs(state) {
  const nodes = state.objects.nodesById;

  return Object.values(state.objects.pointersById)
    .map((p) => {
      const from = nodes[p.fromId];
      const to = nodes[p.toId];
      if (!from || !to) return null;

      const fromCenter = { x: from.x + NODE_RADIUS, y: from.y + NODE_RADIUS };
      const toCenter = { x: to.x + NODE_RADIUS, y: to.y + NODE_RADIUS };

      const { start, end } = edgeToEdge(fromCenter, toCenter);

      return {
        id: p.id,
        fromId: p.fromId,
        toId: p.toId,
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      };
    })
    .filter(Boolean);
}
