'use client'
import React from 'react'
import { toast, Toaster } from 'react-hot-toast'

const AdminPanel = () => {

    const startGame = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminStartGame`)
            if (res.status === 200) {
                toast.success('Game Started')
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const allowPlayers = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminAllowPlayersToEnter`)
            if (res.status === 200) {
                toast.success('Players can now enter')
            } else {
                toast.error('Something went wrong')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <Toaster />
            <div className='min-h-screen flex items-center justify-center flex-col space-y-4'>
                <button onClick={allowPlayers} className='btn btn-neutral text-white'>Allow Players to Enter</button>
                <button onClick={startGame} className='btn btn-neutral text-white'>Start the game</button>
            </div>
        </>
    )
}

export default AdminPanel
