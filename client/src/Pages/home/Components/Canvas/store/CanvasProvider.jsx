// canvas/store/CanvasProvider.jsx

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { canvasReducer, initialCanvasState } from "./canvasReducer";

const CanvasStateContext = createContext(null);
const CanvasDispatchContext = createContext(null);

export function CanvasProvider({ children }) {
  const [state, dispatch] = useReducer(canvasReducer, initialCanvasState);

  // Keeps the state reference stable unless it changes
  const memoState = useMemo(() => state, [state]);

  return (
    <CanvasStateContext.Provider value={memoState}>
      <CanvasDispatchContext.Provider value={dispatch}>
        {children}
      </CanvasDispatchContext.Provider>
    </CanvasStateContext.Provider>
  );
}

export function useCanvasState() {
  const ctx = useContext(CanvasStateContext);
  if (!ctx) throw new Error("useCanvasState must be used within <CanvasProvider>");
  return ctx;
}

export function useCanvasDispatch() {
  const ctx = useContext(CanvasDispatchContext);
  if (!ctx) throw new Error("useCanvasDispatch must be used within <CanvasProvider>");
  return ctx;
}
