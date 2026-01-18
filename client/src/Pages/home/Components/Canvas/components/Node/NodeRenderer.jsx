import React from "react";
import PropTypes from "prop-types";
import Node from "./Node";

const NodeRenderer = ({ nodes, handleObjectClick, amISelected, toggleSelection, removeCanvasObject, drawPointerFromMeToSelectedID }) => {
    return (
        <>
            {nodes.map((node) => (
                <Node
                    key={node.id}
                    name={node.id}
                    x={node.x}
                    y={node.y}
                    text={node.text}
                    onClick={handleObjectClick(node.id)}
                    selected={amISelected(node.id)}
                    toggleSelection={toggleSelection}
                    removeMe={removeCanvasObject(node.id)}
                    getPointer={drawPointerFromMeToSelectedID(node.id)}
                />
            ))}
        </>
    );
};

NodeRenderer.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleObjectClick: PropTypes.func.isRequired,
    amISelected: PropTypes.func.isRequired,
    toggleSelection: PropTypes.func.isRequired,
    removeCanvasObject: PropTypes.func.isRequired,
    drawPointerFromMeToSelectedID: PropTypes.func.isRequired,
};

export default NodeRenderer;