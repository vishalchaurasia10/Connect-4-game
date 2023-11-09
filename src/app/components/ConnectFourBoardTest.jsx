'use client'

import React, { useEffect, useRef } from "react";
import { Jost } from "next/font/google";
import ConnectFourSquareTest from "./ConnectFourSquareTest";

const jost = Jost({
    subsets: ['latin'],
});

export default function ConnectFourTest({ testBoardState, player1, player2, type }) {

    const fullBoard = testBoardState.map((row, rowIdx) => {
        return row.map((val, colIdx) => {
            return (
                <ConnectFourSquareTest
                    key={colIdx + "" + rowIdx}
                    colIdx={colIdx}
                    rowIdx={rowIdx}
                    board={testBoardState}
                />
            );
        });
    });

    const testMatchResultsRef = useRef(null);

    useEffect(() => {
        if (testMatchResultsRef.current) {
            testMatchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return (
        <div id="testMatchResults" ref={testMatchResultsRef} className="main-Page-Container py-24 min-h-screen">
            <div className="current-player-container">
                <div className="credentials flex items-center space-x-4">
                    {type === 'test' ?
                        <>
                            <div className="player flex items-center">
                                <h1 className={`text-4xl ${jost.className} font-bold mt-4`}>{player1} are </h1>
                                <div className="cf-token-X"></div>
                            </div>
                            <div className="bot flex items-center">
                                <h1 className={`text-4xl ${jost.className} font-bold mt-4`}>& {player2} is </h1>
                                <div className="cf-token-O"></div>
                            </div>
                        </>
                        :
                        <>
                            <div className="player flex items-center">
                                <h1 className={`text-4xl ${jost.className} font-bold mt-4`}>Winner : {player1 || ''}</h1>
                            </div>
                            <div className="bot flex items-center">
                                <h1 className={`text-4xl ${jost.className} font-bold mt-4`}>& Loser: {player2 || ''} </h1>
                            </div>
                        </>
                    }
                </div>
            </div>

            <div className="cf-Container">{fullBoard}</div>
        </div>
    );
}
