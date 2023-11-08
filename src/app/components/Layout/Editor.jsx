'use client'
import React, { useContext, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import AuthContext from '@/app/context/authentication/authContext';
import { toast, Toaster } from 'react-hot-toast';
import ConnectFour from '../ConnectFourBoard';

const Editor = () => {
  const [code, setCode] = useState(''); // State to store the code
  const { allowPlayersToEnter, index, testBoard } = useContext(AuthContext)

  // Function to handle code changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const testCode = async () => {
    try {
      // console.log(JSON.stringify({ code, index }))
      const response = await fetch('http://localhost:3001/onPlayerFunctionTest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: `{"code":"(function makeMove(state){return 4})","index":0}`
      })
      console.log("response", await response.text())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <Toaster />
      <div className='pt-24 px-2 lg:w-1/2 mx-auto min-h-screen pb-10 rounded-2xl'>
        {allowPlayersToEnter ?
          <>
            <h1 className='text-4xl text-center font-bold pb-4'>Start Writing the code here</h1>
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
          </>
          :
          <h1 className='text-4xl text-center font-bold pb-4'>Please wait for the game to start</h1>
        }
      </div>
      {testBoard && <ConnectFour testBoardState={testBoard} type='test' />}
    </>

  );
};

export default Editor;

