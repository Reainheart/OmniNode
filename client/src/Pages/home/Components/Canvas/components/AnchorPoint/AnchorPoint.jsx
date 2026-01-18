// AnchorPoint.jsx
// Minimal stub for anchor points (future use)
import React from "react";

export default function AnchorPoint({ x, y }) {
  return (
    <div
      className="point"
      style={{ position: "absolute", left: x, top: y, width: 4, height: 4, borderRadius: 2, background: "#aaa", pointerEvents: "none", zIndex: 2 }}
    />
  );
}
