'use client'
import React from 'react'

const RestartComponent = ({ showModal, currentPlayer, setshowModal, restart }) => {

    return (
        <>
            <input checked={showModal} type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Game Over</h3>
                    <div className="py-4 flex space-x-2 items-center">
                        {currentPlayer === "X" ? (
                            <p className="bg-[#e73c7e] w-10 h-10 rounded-full"></p>
                        ) : (
                            <p className="bg-[#23a6d5] w-10 h-10 rounded-full"></p>
                        )}
                        <span>has won the game</span>
                    </div>
                    <div className="modal-action">
                        <label onClick={() => { setshowModal(false) }} htmlFor="my_modal_6" className="btn btn-neutral">Close!</label>
                        <button onClick={() => restart()} title='Restart' className="btn btn-neutral" type="button">Restart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestartComponent