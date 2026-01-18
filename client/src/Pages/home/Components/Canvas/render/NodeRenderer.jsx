import React from "react";
import PropTypes from "prop-types";
import Node from "../components/Node/Node";

export default function NodeRenderer({ nodes, isSelected, handlers }) {
  return (
    <>
      {nodes.map((n) => (
        <Node
          key={n.id}
          id={n.id}
          x={n.x}
          y={n.y}
          text={n.text}
          selected={isSelected(n.id)}
          onClick={handlers.onNodeClick}
          onDelete={handlers.onDelete}
          onConnect={handlers.onConnect}
          onCommitText={handlers.onCommitText}
        />
      ))}
    </>
  );
}

NodeRenderer.propTypes = {
  nodes: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  handlers: PropTypes.object.isRequired,
};
