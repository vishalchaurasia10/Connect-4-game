'use client'
import React, { useContext, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import AuthContext from '@/app/context/authentication/authContext';
import { toast, Toaster } from 'react-hot-toast';
import ConnectFourTest from '../ConnectFourBoardTest';

const Editor = () => {
  const [code, setCode] = useState(''); // State to store the code
  const { allowPlayersToEnter, index, testBoard, setTestBoard, testMatchResult, setTestMatchResult } = useContext(AuthContext)
  const [showModal, setshowModal] = useState(false);

  // Function to handle code changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const testCode = async () => {
    if (code.length === 0) return toast.error("Please write some code")

    const element = document.getElementById("testMatchResults");

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/onPlayerFunctionTest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, index })
      })
      console.log("response", await response.text())
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const submitCode = async () => {
    if (code.length === 0) return toast.error("Please write some code")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/onPlayerFunctionSubmit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, index })
      })
      const data = await response.text()
      console.log("response", data)
      toast.success(data)
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (testMatchResult)
      setshowModal(true)
  }, [testMatchResult])

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
              <button onClick={submitCode} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Submit</button>
              <button onClick={testCode} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Test</button>
            </div>
          </>
          :
          <h1 className='text-4xl text-center font-bold pb-4'>Please wait for the game to start</h1>
        }
      </div>
      {testBoard.length > 0 && <ConnectFourTest testBoardState={testBoard} setTestBoardState={setTestBoard} />}
      {
        testMatchResult &&
        <>
          <input checked={showModal} type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-2xl">Test Match Over</h3>
              <div className="py-4 space-y-1">
                <p><strong>Winner:</strong> {testMatchResult.winner.name}</p>
                <p><strong>Loser:</strong> {testMatchResult.loser.name}</p>
                <p>Your code generated <strong>{testMatchResult.invalid ? 'an invalid move' : 'no invalid move'}</strong></p>
              </div>
              <div className="modal-action">
                <label onClick={() => { setshowModal(false); setTestMatchResult(null) }} htmlFor="my_modal_6" className="btn btn-neutral">Close!</label>
              </div>
            </div>
          </div>
        </>
      }
    </>

  );
};

export default Editor;

