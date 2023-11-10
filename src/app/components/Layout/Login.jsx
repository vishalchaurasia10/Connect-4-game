'use client'
import React, { useContext, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { motion } from 'framer-motion';
import AuthContext from '@/app/context/authentication/authContext';

const SignUp = () => {

    const [credentials, setCredentials] = useState({ email: '', name: '', offlineid: '' })
    const { register } = useContext(AuthContext)

    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const checkValidity = (e) => {
        e.preventDefault()
        if (credentials.name === '' || credentials.email === '') {
            toast.error('Please fill all the fields')
        } else if (credentials.name.length < 3) {
            toast.error('Name must be atleast 8 characters long')
        }
        else {
            handleSignUp()
        }
    }

    const handleSignUp = async () => {

        try {
            await register(credentials)
        } catch (error) {
            toast.error(error.message);
        }
        setCredentials({ name: '', email: '', offlineid: '' })
    }


    return (
        <>
            <Toaster />
            <div className="wrapper min-h-screen flex items-center justify-center w-full pt-28 pb-20 md:pt-40 lg:pt-32 px-3">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="upload font-firaCode shadow-slate-600 shadow-2xl text-white border border-white lg:w-1/2 rounded-2xl p-6 md:p-8">
                    <div className="heading flex items-center">
                        <h1 className={` text-6xl md:text-7xl mb-6 mt-2 font-extrabold text-[#57E6D9] capitalize`}>Register for the event</h1>
                    </div>
                    <div
                        className="uploadPhotos flex flex-col items-center justify-center space-y-4 mt-4">
                        <input onChange={onChangeHandler} className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none' placeholder='Enter your email' value={credentials.email} type="email" name="email" id="email" />
                        <input onChange={onChangeHandler} className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none' placeholder='Enter the name' value={credentials.name} type="text" name="name" id="name" />
                        <input onChange={onChangeHandler} className='w-full rounded-lg px-4 py-3 bg-[rgba(255,255,255,0.2)] outline-none' placeholder='Enter the offlineid (Leave it blank if you are playing outside the campus)' value={credentials.offlineid} type="text" name="offlineid" id="offlineid" />
                        <div className="upload w-full">
                            <button onClick={checkValidity} className='bg-white text-black my-2 px-4 py-2 rounded-md'>Register</button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default SignUp