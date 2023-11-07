'use client'
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

const Editor = () => {
    const [code, setCode] = useState(''); // State to store the code

    // Function to handle code changes
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    return (
        <div>
            <AceEditor
                mode="javascript" // Set the code language mode
                theme="monokai"   // Set the editor theme
                value={code}      // Pass the code to be displayed
                onChange={handleCodeChange} // Handle code changes
                width="100%"      // Set the width of the editor
                height="500px"    // Set the height of the editor
                fontSize={16}     // Set the font size
            />
        </div>
    );
};

export default Editor;

