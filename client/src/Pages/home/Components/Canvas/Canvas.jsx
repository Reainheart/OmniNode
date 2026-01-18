import PropTypes from "prop-types";

import { useRef } from "react";
import { CanvasProvider, useCanvasState, useCanvasDispatch } from "./store/CanvasProvider";
import { selectNodes, isSelected as isSelectedSel } from "./store/canvasSelectors";
import { useCanvasInteractions } from "./controller/useCanvasInteractions";
import CanvasRenderer from "./render/CanvasRenderer";
import Grid from "./render/Grid";
import Minimap from "./render/Minimap";
import { NODE_RADIUS } from "./constants";
import "./canvasRoot.css";




function CanvasInner({ width, height, zoom, pan, onCanvasClick, onCanvasPointerDown, onMinimapJump }) {

  CanvasInner.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
    pan: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    onCanvasClick: PropTypes.func,
    onCanvasPointerDown: PropTypes.func,
    onMinimapJump: PropTypes.func,
  };
  const rootRef = useRef(null);
  const state = useCanvasState();
  const dispatch = useCanvasDispatch();
  const nodes = selectNodes(state);
  const handlers = useCanvasInteractions(rootRef);
  const isSelected = (id) => isSelectedSel(state, id);

  // Handle background click for node creation
  const handleBackgroundClick = (e) => {
    // Allow click if target is canvasRoot or the grid SVG
    const isCanvasRoot = e.target.classList.contains("canvasRoot");
    const isGrid = e.target.classList.contains("canvas-grid");
    if (isCanvasRoot || isGrid) {
      // Always get bounding rect from the main canvasRoot div
      const rect = rootRef.current.getBoundingClientRect();
      // Adjust for pan/zoom transform
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;
      if (onCanvasClick) onCanvasClick(x, y, dispatch);
    }
  };

  // World size
  const worldWidth = 5000;
  const worldHeight = 5000;
  const transform = `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`;

  return (
    <div
      ref={rootRef}
      className="canvasRoot"
      style={{ width, height, position: "relative" }}
      onClick={handleBackgroundClick}
      onPointerDown={onCanvasPointerDown}
    >
      <div
        style={{
          width: worldWidth,
          height: worldHeight,
          position: "absolute",
          left: 0,
          top: 0,
          transform,
          transformOrigin: "0 0",
        }}
      >
        {/* Grid background */}
        <Grid width={worldWidth} height={worldHeight} zoom={zoom} pan={pan} />
        <CanvasRenderer nodes={nodes} isSelected={isSelected} handlers={handlers} />
      </div>
      {/* Minimap overlay */}
      <Minimap
        worldWidth={worldWidth}
        worldHeight={worldHeight}
        viewportWidth={width}
        viewportHeight={height}
        pan={pan}
        zoom={zoom}
        nodes={nodes}
        nodeRadius={NODE_RADIUS}
        onJumpTo={onMinimapJump}
      />
    </div>
  );
}



function Canvas({ width, height, zoom, pan, onCanvasClick, onCanvasPointerDown, onMinimapJump }) {
  return (
    <CanvasProvider>
      <CanvasInner
        width={width}
        height={height}
        zoom={zoom}
        pan={pan}
        onCanvasClick={onCanvasClick}
        onCanvasPointerDown={onCanvasPointerDown}
        onMinimapJump={onMinimapJump}
      />
    </CanvasProvider>
  );
}

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  pan: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onCanvasClick: PropTypes.func,
  onCanvasPointerDown: PropTypes.func,
  onMinimapJump: PropTypes.func,
};

export default Canvas;
