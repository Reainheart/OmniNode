import PropTypes from "prop-types";
CanvasRenderer.propTypes = {
  nodes: PropTypes.array.isRequired,
  isSelected: PropTypes.func.isRequired,
  handlers: PropTypes.shape({
    onNodeClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onConnect: PropTypes.func.isRequired,
    onCommitText: PropTypes.func,
  }).isRequired,
};

import PointerLayer from "./PointerLayer";
import NodeRenderer from "./NodeRenderer";
import Array from "../components/Array/Array";
import Stack from "../components/Stack/Stack";
import Queue from "../components/Queue/Queue";
import LinkedList from "../components/LinkedList/LinkedList";

export default function CanvasRenderer({ nodes, isSelected, handlers }) {
  return (
    <>
      <PointerLayer />
      {/* Render each node by type */}
      {nodes.map((n) => {
        switch (n.type) {
          case "Array":
            return (
              <Array
                key={n.id}
                name={n.id}
                x={n.x}
                y={n.y}
                text={n.text}
                selected={isSelected(n.id)}
                toggleSelection={() => handlers.onNodeClick(n.id)}
                getPointer={() => handlers.onConnect(n.id)}
                removeMe={() => handlers.onDelete(n.id)}
                getNewObject={() => ({ id: Math.random(), text: "" })}
              />
            );
          case "Stack":
            return (
              <Stack
                key={n.id}
                name={n.id}
                x={n.x}
                y={n.y}
                text={n.text}
                selected={isSelected(n.id)}
                toggleSelection={() => handlers.onNodeClick(n.id)}
                getPointer={() => handlers.onConnect(n.id)}
                removeMe={() => handlers.onDelete(n.id)}
                getNewObject={() => ({ id: Math.random(), text: "" })}
              />
            );
          case "Queue":
            return (
              <Queue
                key={n.id}
                name={n.id}
                x={n.x}
                y={n.y}
                text={n.text}
                selected={isSelected(n.id)}
                toggleSelection={() => handlers.onNodeClick(n.id)}
                getPointer={() => handlers.onConnect(n.id)}
                removeMe={() => handlers.onDelete(n.id)}
                getNewObject={() => ({ id: Math.random(), text: "" })}
              />
            );
          case "Linked List":
            return (
              <LinkedList
                key={n.id}
                id={n.id}
                x={n.x}
                y={n.y}
                selected={isSelected(n.id)}
                onSelect={handlers.onNodeClick}
                onDelete={handlers.onDelete}
              />
            );
          case "Tree":
          case "Node":
          default:
            return (
              <NodeRenderer
                key={n.id}
                nodes={[n]}
                isSelected={isSelected}
                handlers={handlers}
              />
            );
        }
      })}
    </>
  );
}
