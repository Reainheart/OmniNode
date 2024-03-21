import React, { useState, useEffect } from "react";
import "./Code-View.css";
import Card from "react-bootstrap/card";
import CodeViewWindow from "./Code-View-Window/Code-View-Window";
import CodeLanguageSelector from "./Code-Language-Selection-Menu/Code-Language-Selection-Menu";

const CodeView = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("C++");
    const [selectedLanguageCode, setSelectedLanguageCode] = useState(
        "Select a language to view the example."
    );

    // Adjusted processData to handle \\n and \\t from the API response
    const processData = (code) => {
        return code
            .replace(/\\n/g, "<br>") // Replace \\n with <br>
            .replace(/\\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"); // Replace \\t with four non-breaking spaces
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:3000/GetSampleCodeNode";
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(
                        `Network response was not ok: ${response.status} ${response.statusText}`
                    );
                }
                const jsonData = await response.json();
                const languageData = jsonData.find(
                    (item) => item.Language === selectedLanguage
                );
                setSelectedLanguageCode(
                    languageData
                        ? processData(languageData.Example)
                        : `No example code found for ${selectedLanguage}`
                );
            } catch (error) {
                console.error("Fetching error:", error);
                setSelectedLanguageCode(
                    `Failed to load data: ${error.message}`
                );
            }
        };
        fetchData();
    }, [selectedLanguage]);

    return (
        <>
            <Card>
                <div className="card-header">
                    <CodeLanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                    />
                </div>
                <div className="card-body">
                    <CodeViewWindow
                        selectedLanguageCode={selectedLanguageCode}
                    />
                </div>
            </Card>
        </>
    );
};

export default CodeView;
