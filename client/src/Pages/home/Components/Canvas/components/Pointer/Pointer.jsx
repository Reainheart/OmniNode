// import React from 'react';
import { useState, useEffect } from "react";
import "./pointer.css";
import PropTypes from "prop-types";

const Pointer = ({ from_x, from_y, to_x, to_y, from_id, to_id }) => {
    const [isNullPointer, setIsNullPointer] = useState(false);

    // useEffect(() => {
    //     !connectedToObject ? setIsNullPointer(true) : setIsNullPointer(false)
    // }, [connectedToObject])

    // Calculate the angle of the arrow
    const angle = (Math.atan2(to_y - from_y, to_x - from_x) * 180) / Math.PI;

    // Calculate distance between points
    const distance =
        Math.sqrt((to_x - from_x) ** 2 + (to_y - from_y) ** 2) - 40;

    return (
        <>
            {isNullPointer ? (
                <div>
                    <svg
                        style={{
                            overflow: "visible",
                            position: "absolute",
                            left: from_x,
                            top: from_y,
                        }}
                    >
                        <line
                            x1={0}
                            y1={0}
                            x2={from_x + 10}
                            y2={0}
                            stroke="yellow"
                            strokeWidth="2"
                        />
                        <polygon
                            points={`${from_x + 10},0 ${from_x},-5 ${from_x},5`}
                            fill="yellow"
                            transform={`rotate(${angle})`}
                        />
                    </svg>
                </div>
            ) : (
                <div>
                    <svg
                        style={{
                            overflow: "visible",
                            position: "absolute",
                            left: from_x,
                            top: from_y,
                        }}
                    >
                        <line
                            x1={0}
                            y1={0}
                            x2={distance}
                            y2={0}
                            stroke="black"
                            strokeWidth="2"
                            transform={`rotate(${angle})`}
                        />
                        <polygon
                            points={`${distance},0 ${distance - 10},-5 ${
                                distance - 10
                            },5`}
                            fill="black"
                            transform={`rotate(${angle})`}
                        />
                    </svg>
                </div>
            )}
        </>
    );
};
Pointer.propTypes = {
    from_x: PropTypes.number,
    from_y: PropTypes.number,
    to_x: PropTypes.number,
    to_y: PropTypes.number,
    from_id: PropTypes.number,
    to_id: PropTypes.number,
};
export default Pointer;
