import { useState, useEffect, useRef } from "react";
import "./home.css";
import Header from "./../header/Header";

import ToolbarContainer from "./Components/Toolbar/ToolbarContainer";
import Canvas from "./Components/Canvas/Canvas";
import { NODE_RADIUS } from "./Components/Canvas/constants";


const Home = () => {
    const headerHeight = 96;
    const toolbarHeight = 46;

    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth);
    const [canvasHeight, setCanvasHeight] = useState(
        window.innerHeight - headerHeight - toolbarHeight
    );
    const [activeMode, setActiveMode] = useState("");

    // Zoom and pan state (lifted)
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });

    const onResize = () => {
        setCanvasWidth(window.innerWidth);
        setCanvasHeight(window.innerHeight - headerHeight - toolbarHeight);
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Structure selection state
    const [selectedStructure, setSelectedStructure] = useState("Node");

    // Node/Array/Stack/Queue creation handler
    const handleCanvasClick = (x, y, dispatch) => {
        switch (selectedStructure) {
            case "Node":
                dispatch({ type: "ADD_NODE", x: x - NODE_RADIUS, y: y - NODE_RADIUS });
                break;
            case "Array":
                dispatch({ type: "ADD_ARRAY", x, y });
                break;
            case "Stack":
                dispatch({ type: "ADD_STACK", x, y });
                break;
            case "Queue":
                dispatch({ type: "ADD_QUEUE", x, y });
                break;
            case "Linked List":
                dispatch({ type: "ADD_LINKED_LIST", x, y });
                break;
            case "Tree":
                dispatch({ type: "ADD_TREE", x, y });
                break;
            default:
                break;
        }
    };

    const handleZoomIn = () => {
        setZoom(z => Math.max(0.2, Math.min(z * 1.2, 3)));
    };
    const handleZoomOut = () => {
        setZoom(z => Math.max(0.2, Math.min(z / 1.2, 3)));
    };
    const handlePan = () => {
        setPan(p => ({ x: p.x + 40, y: p.y }));
    };

    // --- Pan drag logic ---
    const panDragRef = useRef({ dragging: false, lastX: 0, lastY: 0 });

    const handlePointerDown = (e) => {
        if (activeMode !== "pan" || e.button !== 0) return;
        panDragRef.current.dragging = true;
        panDragRef.current.lastX = e.clientX;
        panDragRef.current.lastY = e.clientY;
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
    };
    const handlePointerMove = (e) => {
        if (!panDragRef.current.dragging) return;
        const dx = e.clientX - panDragRef.current.lastX;
        const dy = e.clientY - panDragRef.current.lastY;
        setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
        panDragRef.current.lastX = e.clientX;
        panDragRef.current.lastY = e.clientY;
    };
    const handlePointerUp = () => {
        panDragRef.current.dragging = false;
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
    };

    // Minimap jump handler
    const handleMinimapJump = (worldX, worldY) => {
        // Set pan so that the viewport is centered on (worldX, worldY)
        setPan({
            x: -worldX * zoom,
            y: -worldY * zoom,
        });
    };

    return (
        <div className="home-root">
            <Header />
            <ToolbarContainer
                setActiveMode={setActiveMode}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onPan={handlePan}
                setSelectStructure={setSelectedStructure}
                activeMode={activeMode}
            />
            <div className="flex-container">
                <Canvas
                    width={canvasWidth}
                    height={canvasHeight}
                    zoom={zoom}
                    pan={pan}
                    onCanvasClick={handleCanvasClick}
                    onCanvasPointerDown={handlePointerDown}
                    onMinimapJump={handleMinimapJump}
                />
            </div>
        </div>
    );
};

export default Home;
