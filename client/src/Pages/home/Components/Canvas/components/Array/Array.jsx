// import React from "react";
import ArrayNode from "./ArrayNode";
import PropTypes from 'prop-types'
import "./Array.css";
import { useState, useEffect, useRef } from "react";

const Array = ({ name, x, y, text, getNewObject, selected, toggleSelection, getPointer, removeMe }) => {
    const [arrayData, setArrayData] = useState([]);
    const [, setUpdate] = useState(0); // State to trigger re-renders
    const selectedSubnodes = useRef(new Map());
    const [content, setContent] = useState(text);
    const [inputIsHidden, setInputIsHidden] = useState(true);

    useEffect(() => {
        setInputIsHidden(true); // Hide the input initially or when the node is deselected
    }, [selected]);

    const handleArrayClick = (event) => {
        // Prevents onClick from bubbling to the parent if it's nested
        event.stopPropagation();
        toggleSelection(name);
    };

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevents the default action of adding a new line
            setInputIsHidden(true);
        }
    };

    const amISelected = (id) => {
        return selectedSubnodes.current.has(id);
    };
    const toggleSubnodeSelection = (id) => {
        console.log('Array::toggleSubnodeSelection::' + id);
        if (selectedSubnodes.current.has(id)) {
            selectedSubnodes.current.delete(id);
            console.log('Array::toggleSubnodeSelection::Removed::' + id);
        } else {
            selectedSubnodes.current.set(id, true);
            console.log('Array::toggleSubnodeSelection::Added::' + id);
        }
        setUpdate(prev => prev + 1); // Force re-render
    };

    const triggerEdit = (e) => {
        e.stopPropagation();
        setInputIsHidden(false);
    };

    const addEmptyArrayNode = () => {
        const newArrayNode = getNewObject(x, y, 'null', 'Array Node');
        const newArrayNodeId = newArrayNode.id;
        newArrayNode.text = newArrayNodeId
        setArrayData([...arrayData, newArrayNode]);
        setUpdate(prev => prev + 1); // Force re-render
    };

    const removeArrayNode = (remove_id) => {
        
        setArrayData(prevNodes => prevNodes.filter(node => node.id !== remove_id))
    };

    return (
        <div style={{ position: "absolute", left: x, top: y }}>
            {selected && (
                <div className="array-options" style={{ left: -36, top: 0 }}>
                    <button onClick={triggerEdit}>✎</button>
                    <button onClick={removeMe}>␥</button>
                    <button onClick={getPointer}>→</button>
                </div>
            )}
            <input
                style={{ left: -50, top: -50, position: "absolute" }}
                hidden={inputIsHidden}
                className="changeContent"
                type="text"
                value={content}
                onInput={handleChange}
                onKeyDown={handleKeyDown}
            />
            <div
                className={selected ? "selected-array" : "array"}
                style={{
                    border: (selected ? "4px solid white" : "1px solid gray"),
                    minWidth: 120,
                    minHeight: 60,
                    background: "#fafbfc"
                }}
            >
                <h3 onClick={handleArrayClick}>
                    {content}
                </h3>
                <div className='array-functions'>
                    <button onClick={addEmptyArrayNode}>Add new Index</button>
                </div>
                <div className="array-container">
                    {arrayData.length === 0 && (
                        <div style={{ color: '#bbb', textAlign: 'center', padding: 8 }}>Empty Array</div>
                    )}
                    {arrayData.map((node, index) => (
                        <ArrayNode
                            key={node.id}
                            name={node.id}
                            display_index={index}
                            display_text={node.text}
                            selected={amISelected(node.id)}
                            toggleSelection={toggleSubnodeSelection}
                            removeMe={() => removeArrayNode(node.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
Array.propTypes = {
    name: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    getNewObject: PropTypes.func,
    removeArrayNode: PropTypes.func,
    selected: PropTypes.bool,
    toggleSelection: PropTypes.func,
    getPointer: PropTypes.func,
    removeMe: PropTypes.func,
}
export default Array;
