import { useEffect, useState } from "react";
import AnchorPoint from "../AnchorPoint/AnchorPoint";
import PropTypes from "prop-types";
import { NODE_RADIUS } from "../../constants";
import "./Node.css";

const degrees = [];
for (let angle = 0; angle < 360; angle += 45) degrees.push(angle);

function pointOnCircle(angleDeg, x, y) {
  const r = NODE_RADIUS;
  const a = (angleDeg * Math.PI) / 180;
  return { x: x + r + r * Math.cos(a), y: y + r + r * Math.sin(a) };
}

export default function Node({
  id,
  x,
  y,
  text,
  selected,
  onClick,
  onDelete,
  onConnect,
  onCommitText,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  useEffect(() => {
    // keep draft in sync when store changes from outside
    setDraft(text);
  }, [text]);

  useEffect(() => {
    // if deselected, stop editing
    if (!selected) setEditing(false);
  }, [selected]);

  const beginEdit = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  const commit = () => {
    const next = draft.trim() || "Node";
    onCommitText(id, next);
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setDraft(text);
      setEditing(false);
    }
  };

  return (
    <div>
      {selected && (
        <div className="node-options" style={{ left: x - 10, top: y - 35 }}>
          <button onClick={beginEdit}>✎</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(id); }}>␥</button>
          <button onClick={(e) => { e.stopPropagation(); onConnect(id); }}>→</button>
        </div>
      )}

      {degrees.map((angle) => {
        const p = pointOnCircle(angle, x, y);
        return <AnchorPoint key={`node_${id}_ap_${angle}`} x={p.x} y={p.y} />;
      })}

      <div  
        data-canvas-hit="node"
        className={selected ? "selected-node" : "node"}
        style={{ left: x, top: y }}
        onClick={(e) => onClick(id, e)}
      >
        <p className="nodeText">{text}</p>
      </div>

      {editing && (
        <input
          style={{ left: x, top: y }}
          className="changeContent"
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={onKeyDown}
          autoFocus
        />
      )}
    </div>
  );
}

Node.propTypes = {
  id: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onCommitText: PropTypes.func.isRequired,
};
