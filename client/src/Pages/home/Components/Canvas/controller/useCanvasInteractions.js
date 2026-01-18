import { useEffect, useMemo, useRef } from "react";
import { useCanvasDispatch, useCanvasState } from "../store/CanvasProvider";

export function useCanvasInteractions(rootRef) {
    const state = useCanvasState();
    const dispatch = useCanvasDispatch();

    const dragRef = useRef({
        dragging: false,
        lastX: 0,
        lastY: 0,
    });

    // click empty space clears selection (and could create nodes depending on tool)
    const onBackgroundClick = () => {
        dispatch({ type: "CLEAR_SELECTION" });
    };

    const onNodeClick = (id, e) => {
        e.stopPropagation();
        dispatch({ type: "TOGGLE_SELECT", id, additive: e.ctrlKey || e.shiftKey });
        dispatch({ type: "SET_ACTIVE", id });
    };

    const onPointerClick = (id, e) => {
        e.stopPropagation();
        dispatch({ type: "TOGGLE_SELECT", id, additive: e.ctrlKey || e.shiftKey });
        dispatch({ type: "SET_ACTIVE", id });
    };

    // Connect UX: active node -> the other selected node (exactly 2 selected nodes)
    const onConnect = (fromId) => {
        const selectedNodes = Array.from(state.ui.selected).filter((id) => !!state.objects.nodesById[id]);
        if (selectedNodes.length !== 2) return; // disable connect
        const toId = selectedNodes.find((id) => id !== fromId);
        dispatch({ type: "ADD_POINTER", fromId, toId });

    };

    const onDelete = (id) => {
        if (state.objects.pointersById[id]) dispatch({ type: "REMOVE_POINTER", id });
        else if (state.objects.nodesById[id]) dispatch({ type: "REMOVE_NODE", id });
    };

    const onCommitText = (id, text) => {
        dispatch({ type: "UPDATE_NODE_TEXT", id, text });
    };

    // Drag selection live
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const onPointerDown = (e) => {
            // left button only
            if (e.button !== 0) return;
            const hitNode = e.target.closest?.('[data-canvas-hit="node"]');
            if (!hitNode) return;

            // only start drag if clicking on something selected (nodes), otherwise let click select do its thing
            // We’ll start dragging whenever there is at least one selected node.
            const hasSelectedNode = Array.from(state.ui.selected).some((id) => !!state.objects.nodesById[id]);
            if (!hasSelectedNode) return;

            dragRef.current.dragging = true;
            dragRef.current.lastX = e.clientX;
            dragRef.current.lastY = e.clientY;

            window.addEventListener("pointermove", onPointerMove);
            window.addEventListener("pointerup", onPointerUp);
        };

        const onPointerMove = (e) => {
            if (!dragRef.current.dragging) return;
            const dx = e.clientX - dragRef.current.lastX;
            const dy = e.clientY - dragRef.current.lastY;
            dragRef.current.lastX = e.clientX;
            dragRef.current.lastY = e.clientY;

            dispatch({ type: "MOVE_SELECTION_BY", dx, dy });
        };

        const onPointerUp = () => {
            dragRef.current.dragging = false;
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
        };

        root.addEventListener("pointerdown", onPointerDown);
        return () => root.removeEventListener("pointerdown", onPointerDown);
    }, [dispatch, rootRef, state.ui.selected, state.objects.nodesById]);

    return {
        onBackgroundClick,
        onNodeClick,
        onPointerClick,
        onConnect,
        onDelete,
        onCommitText,
    };
}
