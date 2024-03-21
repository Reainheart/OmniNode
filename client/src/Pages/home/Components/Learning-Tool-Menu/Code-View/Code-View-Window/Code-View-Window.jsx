/* eslint-disable react/prop-types */
//import React, { useState, useRef, useEffect } from "react";
//import "./Code-View-Window.css";

const CodeViewWindow = ({ selectedLanguageCode }) => {
    return (
        <div className="code-view-container" style={{ whiteSpace: "pre-wrap" }}>
            {/* Render the processed code as HTML */}
            <div dangerouslySetInnerHTML={{ __html: selectedLanguageCode }} />
        </div>
    );
};

export default CodeViewWindow;
