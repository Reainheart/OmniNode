import React, { useState } from "react";

export default function Minimap({
  worldWidth = 5000,
  worldHeight = 5000,
  viewportWidth,
  viewportHeight,
  pan,
  zoom,
  nodes = [],
  nodeRadius = 40,
  onJumpTo,
}) {
  // Minimap size in px
  const miniW = 200;
  const miniH = 200;
  // Scale world to minimap
  const scaleX = miniW / worldWidth;
  const scaleY = miniH / worldHeight;


  // Viewport rectangle in world coords
  const viewW = viewportWidth / zoom;
  const viewH = viewportHeight / zoom;
  const viewX = -pan.x / zoom;
  const viewY = -pan.y / zoom;

  // Hover state for jump preview
  const [hover, setHover] = useState(null); // {x, y} in minimap px

  // Handle minimap click to jump
  const handleMinimapClick = (e) => {
    if (!onJumpTo) return;
    const rect = e.target.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    // Center viewport on this world coordinate
    const worldX = (mx / scaleX) - viewW / 2;
    const worldY = (my / scaleY) - viewH / 2;
    onJumpTo(worldX, worldY);
  };
  const handleMinimapMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    setHover({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  const handleMinimapLeave = () => setHover(null);

  return (
    <div
      style={{
        position: "absolute",
        right: 16,
        bottom: 16,
        width: miniW,
        height: miniH,
        background: "#222",
        border: "2px solid #888",
        borderRadius: 8,
        zIndex: 10,
        boxShadow: "0 2px 8px #0008"
      }}
      onClick={handleMinimapClick}
      onMouseMove={handleMinimapMove}
      onMouseLeave={handleMinimapLeave}
    >
      <svg width={miniW} height={miniH} style={{ display: "block" }}>
        {/* World border */}
        <rect x={0} y={0} width={miniW} height={miniH} fill="#222" stroke="#555" strokeWidth={2} />
        {/* Nodes */}
        {nodes.map(n => (
          <circle
            key={n.id}
            cx={n.x * scaleX + nodeRadius * scaleX}
            cy={n.y * scaleY + nodeRadius * scaleY}
            r={nodeRadius * scaleX}
            fill="#4af"
            opacity={0.7}
          />
        ))}
        {/* Viewport rectangle */}
        <rect
          x={viewX * scaleX}
          y={viewY * scaleY}
          width={viewW * scaleX}
          height={viewH * scaleY}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
        />
        {/* Jump preview bounding box */}
        {hover && (
          <rect
            x={hover.x - (viewW * scaleX) / 2}
            y={hover.y - (viewH * scaleY) / 2}
            width={viewW * scaleX}
            height={viewH * scaleY}
            fill="none"
            stroke="#0ff"
            strokeDasharray="4 2"
            strokeWidth={2}
            pointerEvents="none"
          />
        )}
      </svg>
    </div>
  );
}

// You will need to import NODE_RADIUS from constants.js in the parent and pass it in or import here if needed.
