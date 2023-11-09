import React, { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion';

const AdminPanelLogin = ({ setAdmin }) => {
    const [secretKey, setSecretKey] = useState('')

    const onChangeHandler = (e) => {
        setSecretKey(e.target.value)
    }

    const establishWebSocketConnection = () => {
        return new Promise(async () => {
            const ws = new WebSocket("wss://connect4-backend.onrender.com"); // Replace with your WebSocket server address

            ws.addEventListener("open", () => {
                console.log("WebSocket connection established");
            });

            ws.addEventListener("message", async (event) => {
                const resData = JSON.parse(event.data);
                console.log("WebSocket message received", resData);
                if (resData.reason === "/onClientConnected") {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/registerAdmin`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ index: -1 }),
                    });

                    const data = await response.json();
                    console.log(data);

                    if (response.status === 200) {
                        setAdmin(true)
                        toast.success("Admin connected successfully");
                    } else {
                        toast.error("Registration failed");
                    }
                }
            });
        });
    };

    const checkValidity = async (e) => {
        e.preventDefault()
        if (secretKey === '') {
            toast.error('Please fill all the fields')
        } else if (secretKey.length < 3) {
            toast.error('Secret Key must be atleast 8 characters long')
        }
        else {
            if (secretKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
                await establishWebSocketConnection()
            } else {
                toast.error('Wrong Secret Key')
            }
        }
        setSecretKey('')
    }

    return (
        <>
            <Toaster />
            <div className="wrapper h-screen flex items-center justify-center w-full pt-28 pb-20 md:pt-40 lg:pt-32 px-3">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="upload font-firaCode shadow-slate-600 shadow-2xl text-white border border-white lg:w-1/2 rounded-2xl p-6 md:p-8">
                    <div className="heading flex items-center">
                        <h1 className={` text-6xl md:text-7xl mb-6 mt-2 font-extrabold text-[#57E6D9] capitalize`}>Admin Login</h1>
                    </div>
                    <div
                        className="uploadPhotos flex flex-col items-center justify-center space-y-4 mt-4">
                        <input onChange={onChangeHandler} className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none' placeholder='Enter admin secret key' value={secretKey} type="password" name="secretKey" id="secretKey" />
                        <div className="upload w-full">
                            <button onClick={checkValidity} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Login</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default AdminPanelLogin
