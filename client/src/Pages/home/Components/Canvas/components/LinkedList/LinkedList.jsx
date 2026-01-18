import React, { useState } from "react";
import PropTypes from "prop-types";
import "./LinkedList.css";

// Helper to generate unique node ids within the LinkedList component
function makeId() {
  return Math.floor(Math.random() * 999999999);
}

export default function LinkedList({ id, x, y, selected, onSelect, onDelete }) {
  // Initial state: head, default node, tail
  const [nodes, setNodes] = useState([
    { id: makeId(), label: "Head", type: "head" },
    { id: makeId(), label: "Node", type: "node" },
    { id: makeId(), label: "Tail", type: "tail" },
  ]);

  // Insert a node before tail
  const handleInsert = () => {
    setNodes((prev) => {
      const tailIdx = prev.findIndex((n) => n.type === "tail");
      const newNode = { id: makeId(), label: "Node", type: "node" };
      const newNodes = [...prev];
      newNodes.splice(tailIdx, 0, newNode);
      return newNodes;
    });
  };

  // Remove the last node before tail (if more than one node between head/tail)
  const handleRemove = () => {
    setNodes((prev) => {
      const tailIdx = prev.findIndex((n) => n.type === "tail");
      if (tailIdx <= 2) return prev; // Only one node between head/tail
      const newNodes = [...prev];
      newNodes.splice(tailIdx - 1, 1);
      return newNodes;
    });
  };

  return (
    <div
      className={`linked-list-root${selected ? " selected" : ""}`}
      style={{ position: "absolute", left: x, top: y }}
      onClick={() => onSelect(id)}
    >
      <div className="linked-list-container">
        {nodes.map((n, idx) => (
          <React.Fragment key={n.id}>
            <div className={`linked-list-node ${n.type}`}>{n.label}</div>
            {idx < nodes.length - 1 && <div className="linked-list-arrow">→</div>}
          </React.Fragment>
        ))}
      </div>
      <div className="linked-list-controls">
        <button onClick={(e) => { e.stopPropagation(); handleInsert(); }}>Insert</button>
        <button onClick={(e) => { e.stopPropagation(); handleRemove(); }}>Remove</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(id); }}>Delete</button>
      </div>
    </div>
  );
}

LinkedList.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
