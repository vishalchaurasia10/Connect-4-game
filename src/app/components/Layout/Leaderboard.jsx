'use client'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '@/app/context/authentication/authContext'
import ConnectFourTest from '../ConnectFourBoardTest'

const Leaderboard = () => {

    const [scoreboard, setScoreboard] = useState([])
    const { loading, actualBoard, actualMatchResult, matchType, onGoingMatch } = useContext(AuthContext)

    useEffect(() => {
        const getLeaderboard = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getLeaderboard`)
            const data = await res.json()
            setScoreboard(data.scoreboard)
        }
        getLeaderboard()
    }, [])

    useEffect(() => {
        const getLeaderboard = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getLeaderboard`)
            const data = await res.json()
            setScoreboard(data.scoreboard)
        }
        getLeaderboard()
    }, [loading])


    return (
        <>
            <div className="overflow-x-auto lg:px-20 min-h-screen">
                {loading ?
                    <>
                        <div className="loadingAnimation pt-40 space-y-4 flex flex-col items-center justify-center">
                            <span className="loading loading-spinner loading-lg"></span>
                            <p className='text-4xl text-center'>Wait for the game to end to see the Leaderboard</p>
                        </div>
                        {actualBoard.length > 0 &&
                            <ConnectFourTest
                                testBoardState={actualBoard}
                                player1={matchType === 'match' ? onGoingMatch?.player1Object?.name : actualMatchResult?.winner?.name}
                                player2={matchType === 'match' ? onGoingMatch?.player2Object?.name : actualMatchResult?.loser?.name}
                                type={matchType}
                            />}
                    </>
                    :
                    <>
                        <h1 className='text-4xl font-bold pb-4 pt-28'>Leaderboard</h1>
                        <table className="table">
                            <thead className='text-white text-xl'>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Points</th>
                                    <th>Matches Played</th>
                                    <th>Avg Win Margin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoreboard.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.combinedPoints}</td>
                                            <td>{user.matchesPlayed}</td>
                                            <td>{user.averageWinMargin}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </>}
            </div>
        </>
    )
}

export default Leaderboard
