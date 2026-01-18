// import React from 'react';
import PropTypes from "prop-types";
import "./Array.css";
import { useState, useEffect } from "react";

const ArrayNode = ({
    name,
    display_index,
    display_text,
    onDisplayClick,
    toggleSelection,
    selected,
    getPointer,
    removeMe,
}) => {
    const [content, setContent] = useState(display_text);
    const [inputIsHidden, setInputIsHidden] = useState(true);
    const handleArrayNodeClick = (event) => {
        // Prevents onClick from bubbling to the parent if it's nested
        event.stopPropagation();
        onDisplayClick;
        toggleSelection(name);
    };

    useEffect(() => {
        setInputIsHidden(true); // Hide the input initially or when the node is deselected
    }, [selected]);

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevents the default action of adding a new line
            setInputIsHidden(true);
        }
    };

    const triggerEdit = (e) => {
        e.stopPropagation();
        setInputIsHidden(false);
    };

    return (
        <div className="arrayNode">
            {selected && (
                <div className="array-node-options">
                    <button onClick={triggerEdit}>✎</button>
                    <button onClick={() => removeMe(name)}>␥</button>
                    <button onClick={getPointer}>→</button>
                </div>
            )}
            <div
                className="arrayNodeDisplay"
                onClick={onDisplayClick}
                style={{
                    border: selected ? "4px solid white" : "1px solid gray",
                }}
            >
                <div className="arrayNodeIndex" onClick={handleArrayNodeClick}>
                    {display_index}
                </div>
                <div className="arrayNodeDisplay">
                    {content}
                    <input
                        hidden={inputIsHidden}
                        className="changeContent"
                        type="text"
                        value={content}
                        onInput={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
};
ArrayNode.propTypes = {
    name: PropTypes.number,
    display_index: PropTypes.any,
    display_text: PropTypes.any,
    onDisplayClick: PropTypes.func,
    toggleSelection: PropTypes.func,
    selected: PropTypes.bool,
    getPointer: PropTypes.func,
    removeMe: PropTypes.func,
};
export default ArrayNode;
