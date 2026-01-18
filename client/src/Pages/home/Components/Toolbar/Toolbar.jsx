import { useState } from "react";
import PropTypes from "prop-types";

import "./Toolbar.css";

//connects to home function for deciding on object to draw
const structures = [
    { name: "Node" },
    { name: "Array" },
    { name: "Linked List" },
    { name: "Tree" },
    { name: "Stack" },
    { name: "Queue" },
];

function Toolbar({ setSelectStructure, onZoomIn, onZoomOut, onPan, activeMode }) {
    const [activeStructure, setActiveStructure] = useState("Node");

    const handleClick = (structureName) => {
        setSelectStructure(structureName);
        setActiveStructure(structureName);
    };

    return (
        <div className="toolbar">
            {structures.map((structure) => (
                <button
                    key={structure.name}
                    onClick={() => handleClick(structure.name)}
                    className={
                        activeStructure === structure.name && activeMode === "none"
                            ? "active"
                            : ""
                    }
                >
                    {structure.name}
                </button>
            ))}
            <button
                onClick={onZoomIn}
                className={activeMode === "zoom-in" ? "active" : ""}
            >
                Zoom +
            </button>
            <button
                onClick={onZoomOut}
                className={activeMode === "zoom-out" ? "active" : ""}
            >
                Zoom -
            </button>
            <button
                onClick={onPan}
                className={activeMode === "pan" ? "active" : ""}
            >
                Pan
            </button>
        </div>
    );
}
Toolbar.propTypes = {
    setSelectStructure: PropTypes.func.isRequired,
    onZoomIn: PropTypes.func.isRequired,
    onZoomOut: PropTypes.func.isRequired,
    onPan: PropTypes.func.isRequired,
    activeMode: PropTypes.string.isRequired,
};
export default Toolbar;
