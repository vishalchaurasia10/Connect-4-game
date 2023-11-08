'use client'
import React, { useEffect, useState } from 'react'

const Leaderboard = () => {

    const [scoreboard, setScoreboard] = useState([])

    useEffect(() => {
        const getLeaderboard = async () => {
            const res = await fetch('http://localhost:3001/getLeaderboard')
            const data = await res.json()
            console.log(data)
            setScoreboard(data.scoreboard)
        }
        getLeaderboard()
    }, [])

    return (
        <>
            <div className="overflow-x-auto pt-28 pl-10 min-h-screen">
                <h1 className='text-4xl font-bold pb-4'>Leaderboard</h1>
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
                                    <th>{index+1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.combinedPoints}</td>
                                    <td>{user.matchesPlayed}</td>
                                    <td>{user.averageWinMargin}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Leaderboard
