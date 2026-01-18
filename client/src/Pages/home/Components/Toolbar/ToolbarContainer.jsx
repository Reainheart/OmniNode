import { useState } from "react";
import Toolbar from "./Toolbar";


const ToolbarContainer = ({ setActiveMode, onZoomIn, onZoomOut, onPan, setSelectStructure, activeMode }) => {
    const [localActiveMode, setLocalActiveMode] = useState("none");

    // Pass through the handlers from Home
    return (
        <Toolbar
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onPan={onPan}
            activeMode={activeMode || localActiveMode}
            setSelectStructure={setSelectStructure}
        />
    );
};

export default ToolbarContainer;