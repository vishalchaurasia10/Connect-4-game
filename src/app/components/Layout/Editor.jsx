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

  const testCode = () => {
    console.log(code)
  }

  return (
    <div className='pt-32 px-2 lg:w-1/2 mx-auto min-h-screen rounded-2xl'>
      <AceEditor
        className='rounded-2xl'
        mode="javascript" // Set the code language mode
        theme="monokai"   // Set the editor theme
        value={code}      // Pass the code to be displayed
        onChange={handleCodeChange} // Handle code changes
        width="100%"      // Set the width of the editor
        height="500px"    // Set the height of the editor
        fontSize={16}     // Set the font size
      />
      <div className="upload w-full flex space-x-2 pt-4">
        <button className='bg-white text-black my-2 px-4 py-2 rounded-md'>Submit</button>
        <button onClick={testCode} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Test</button>
      </div>
    </div>

  );
};

export default Editor;

