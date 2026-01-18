

// canvas/store/canvasReducer.js

export const initialCanvasState = {
  objects: {
    nodesById: {},     // id -> { id, type:"Node", x, y, text }
    pointersById: {},  // id -> { id, type:"Pointer", fromId, toId }
  },
  ui: {
    selected: new Set(), // Set<id>
    activeId: null,      // last clicked id
  },
};

function nextId() {
  return Math.floor(Math.random() * 999999999);
}

export function canvasReducer(state, action) {
  switch (action.type) {
    case "ADD_NODE": {
      const id = nextId();
      const node = {
        id,
        type: "Node",
        x: action.x,
        y: action.y,
        text: action.text ?? "Node",
      };

      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, [id]: node },
        },
        ui: {
          ...state.ui,
          activeId: id,
          selected: new Set([id]),
        },
      };
    }

    case "UPDATE_NODE_TEXT": {
      const node = state.objects.nodesById[action.id];
      if (!node) return state;

      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: {
            ...state.objects.nodesById,
            [action.id]: { ...node, text: action.text },
          },
        },
      };
    }

    case "MOVE_SELECTION_BY": {
      const { dx, dy } = action;
      if (!dx && !dy) return state;

      const nodesById = { ...state.objects.nodesById };

      // Move only selected nodes (ignore pointers)
      state.ui.selected.forEach((id) => {
        const n = nodesById[id];
        if (n?.type === "Node") {
          nodesById[id] = { ...n, x: n.x + dx, y: n.y + dy };
        }
      });

      return { ...state, objects: { ...state.objects, nodesById } };
    }

    case "TOGGLE_SELECT": {
      const selected = new Set(state.ui.selected);

      if (!action.additive) selected.clear();

      if (selected.has(action.id)) selected.delete(action.id);
      else selected.add(action.id);

      return {
        ...state,
        ui: {
          ...state.ui,
          selected,
          activeId: action.id,
        },
      };
    }

    case "SET_ACTIVE": {
      return { ...state, ui: { ...state.ui, activeId: action.id } };
    }

    case "CLEAR_SELECTION": {
      return { ...state, ui: { ...state.ui, selected: new Set(), activeId: null } };
    }

    case "ADD_POINTER": {
      const { fromId, toId } = action;
      if (!fromId || !toId || fromId === toId) return state;
      if (!state.objects.nodesById[fromId] || !state.objects.nodesById[toId]) return state;

      // Optional: prevent duplicates
      for (const p of Object.values(state.objects.pointersById)) {
        if (p.fromId === fromId && p.toId === toId) return state;
      }

      const id = nextId();
      const pointer = { id, type: "Pointer", fromId, toId };

      return {
        ...state,
        objects: {
          ...state.objects,
          pointersById: { ...state.objects.pointersById, [id]: pointer },
        },
        ui: { ...state.ui, selected: new Set([id]), activeId: id },
      };
    }

    case "REMOVE_POINTER": {
      const pointersById = { ...state.objects.pointersById };
      delete pointersById[action.id];

      const selected = new Set(state.ui.selected);
      selected.delete(action.id);

      return {
        ...state,
        objects: { ...state.objects, pointersById },
        ui: { ...state.ui, selected, activeId: state.ui.activeId === action.id ? null : state.ui.activeId },
      };
    }

    case "REMOVE_NODE": {
      const nodesById = { ...state.objects.nodesById };
      delete nodesById[action.id];

      const pointersById = { ...state.objects.pointersById };
      for (const [pid, p] of Object.entries(pointersById)) {
        if (p.fromId === action.id || p.toId === action.id) delete pointersById[pid];
      }

      const selected = new Set(state.ui.selected);
      selected.delete(action.id);

      return {
        ...state,
        objects: { nodesById, pointersById },
        ui: { ...state.ui, selected, activeId: state.ui.activeId === action.id ? null : state.ui.activeId },
      };
    }
    case "ADD_ARRAY": {
      const id = nextId();
      const node = {
        id,
        type: "Array",
        x: action.x,
        y: action.y,
        text: action.text ?? "Array",
      };
      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, [id]: node },
        },
        ui: {
          ...state.ui,
          activeId: id,
          selected: new Set([id]),
        },
      };
    }

    case "ADD_LINKED_LIST": {
      // Place three nodes horizontally spaced
      const x = action.x, y = action.y;
      const headId = nextId();
      const nodeId = nextId();
      const tailId = nextId();
      const nodeSpacing = 120;
      const nodes = {
        [headId]: { id: headId, type: "Node", x: x, y: y, text: "Head" },
        [nodeId]: { id: nodeId, type: "Node", x: x + nodeSpacing, y: y, text: "Node" },
        [tailId]: { id: tailId, type: "Node", x: x + 2 * nodeSpacing, y: y, text: "Tail" },
      };
      // Add pointers: head→node, node→tail
      const pointer1Id = nextId();
      const pointer2Id = nextId();
      const pointers = {
        [pointer1Id]: { id: pointer1Id, type: "Pointer", fromId: headId, toId: nodeId },
        [pointer2Id]: { id: pointer2Id, type: "Pointer", fromId: nodeId, toId: tailId },
      };
      // Select all nodes on creation
      const selected = new Set([headId, nodeId, tailId]);
      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, ...nodes },
          pointersById: { ...state.objects.pointersById, ...pointers },
        },
        ui: {
          ...state.ui,
          activeId: nodeId,
          selected,
        },
      };
    }

    case "ADD_TREE": {
      const id = nextId();
      const node = {
        id,
        type: "Tree",
        x: action.x,
        y: action.y,
        text: action.text ?? "Tree",
      };
      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, [id]: node },
        },
        ui: {
          ...state.ui,
          activeId: id,
          selected: new Set([id]),
        },
      };
    }

    case "ADD_STACK": {
      const id = nextId();
      const node = {
        id,
        type: "Stack",
        x: action.x,
        y: action.y,
        text: action.text ?? "Stack",
      };
      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, [id]: node },
        },
        ui: {
          ...state.ui,
          activeId: id,
          selected: new Set([id]),
        },
      };
    }

    case "ADD_QUEUE": {
      const id = nextId();
      const node = {
        id,
        type: "Queue",
        x: action.x,
        y: action.y,
        text: action.text ?? "Queue",
      };
      return {
        ...state,
        objects: {
          ...state.objects,
          nodesById: { ...state.objects.nodesById, [id]: node },
        },
        ui: {
          ...state.ui,
          activeId: id,
          selected: new Set([id]),
        },
      };
    }
    default:
      return state;
  }
}
