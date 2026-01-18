import React from 'react';

const Arrow = ({ fromX, fromY, toX, toY }) => {
    from_y
  return (
    <svg style={{ overflow: 'visible', position: 'absolute', left: fromX, top: fromY }}>
      <line x1={0} y1={0} x2={distance} y2={0}
        stroke="black" strokeWidth="2"
        transform={`rotate(${angle})`} />
      <polygon points={`${distance},0 ${distance-10},-5 ${distance-10},5`}
        fill="black"
        transform={`rotate(${angle})`} />
    </svg>
  );
};

export default Arrow;
