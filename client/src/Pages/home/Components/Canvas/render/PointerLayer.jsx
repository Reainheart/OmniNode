import React from "react";
import { useCanvasDispatch, useCanvasState } from "../store/CanvasProvider";
import { selectPointerVMs, isSelected } from "../store/canvasSelectors";
import "./pointerLayer.css";

export default function PointerLayer() {
  const state = useCanvasState();
  const dispatch = useCanvasDispatch();

  const pointers = selectPointerVMs(state);

  const onPointerClick = (id) => (e) => {
    e.stopPropagation();
    dispatch({ type: "TOGGLE_SELECT", id, additive: e.ctrlKey || e.shiftKey });
  };

  return (
    <svg className="pointerLayer">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>

      {pointers.map((p) => {
        const selected = isSelected(state, p.id);

        return (
          <g key={p.id} onClick={onPointerClick(p.id)}>
            {/* hit target */}
            <line
              x1={p.x1}
              y1={p.y1}
              x2={p.x2}
              y2={p.y2}
              stroke="transparent"
              strokeWidth="14"
              pointerEvents="stroke"
            />
            {/* visible */}
            <line
              x1={p.x1}
              y1={p.y1}
              x2={p.x2}
              y2={p.y2}
              stroke={selected ? "gray" : "black"}
              strokeWidth="2"
              markerEnd="url(#arrow)"
              pointerEvents="none"
            />
          </g>
        );
      })}
    </svg>
  );
}
