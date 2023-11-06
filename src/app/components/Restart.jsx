'use client'
import React from 'react'
import { FaWindowClose } from 'react-icons/fa';

const RestartComponent = ({ showModal, currentPlayer, setshowModal, restart }) => {

    return (
        <>
            <div className={`modalWrapper ${showModal ? '' : 'hidden'} backdrop-blur-sm font-jost z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center`}>
                <div id='modal' className="modal bg-[#3e3e3f] backdrop-blur-2xl fixed z-50 p-6 px-8 mx-4 md:mx-auto lg:px-10 rounded-2xl shadow-2xl shadow-black text-white">
                    <form className="">
                        <header className="modal-header py-3 flex items-center justify-between">
                            <div className="excalmation flex space-x-2 items-center">
                                <h4 className="modal-title text-2xl font-bold flex items-center space-x-2">
                                    {!currentPlayer === "X" ? (
                                        <div className="bg-[#23a6d5] w-10 h-10 rounded-full"></div>
                                    ) : (
                                        <div className="bg-[#e73c7e] w-10 h-10 rounded-full"></div>
                                    )}
                                    <span>has won the game</span>
                                </h4>
                            </div>
                            <FaWindowClose onClick={() => setshowModal(false)} title='Close' className="text-2xl cursor-pointer" />
                        </header>
                        <div className="modal-content pb-6 text-lg">
                            <p>Are you sure you want to restart <span className='font-bold'>this game</span>?</p>
                        </div>
                        <div className="modal-footer py-5 border-t">
                            <div className="flex space-x-2">
                                <button onClick={() => setshowModal(false)} title='Cancel' className="button p-2 hover:bg-white transition-all duration-300 border border-white rounded-lg" type="button">Cancel</button>
                                <button onClick={() => restart()} title='Delete' className="button p-2 hover:bg-white transition-all duration-300 border border-white rounded-lg" type="button">Restart</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default RestartComponent