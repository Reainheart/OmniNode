import React from "react";

export default function Grid({ width, height, zoom, pan }) {
  // Grid spacing in world coordinates
  const baseSpacing = 40;
  const spacing = baseSpacing * zoom;
  const lines = [];

  // Calculate offset for panning
  const offsetX = pan.x % spacing;
  const offsetY = pan.y % spacing;

  // Vertical lines
  for (let x = offsetX; x < width; x += spacing) {
    lines.push(
      <line
        key={"v" + x}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#eee"
        strokeWidth={1}
      />
    );
  }
  // Horizontal lines
  for (let y = offsetY; y < height; y += spacing) {
    lines.push(
      <line
        key={"h" + y}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke="#eee"
        strokeWidth={1}
      />
    );
  }

  return (
    <svg
      className="canvas-grid"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: -1 }}
      width={width}
      height={height}
    >
      {lines}
    </svg>
  );
}
