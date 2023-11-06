'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(false);

    const handleHamburgerClick = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Function to check screen size
        function checkScreenSize() {
            setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
        }

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Initial check on component mount
        checkScreenSize();

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return (
        <>
            <motion.nav
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
                className='fixed top-0 left-0 z-40 w-full py-4 flex justify-center items-center font-firaCode text-xl bg-black'>
                <div className="left w-1/2 md:w-1/4 pl-4 md:pl-8 flex items-center">
                    <Link href='/'>
                        <h1>TECHFEST</h1>
                    </Link>
                </div>

                <div className="center hidden md:flex w-1/2 items-center justify-center">
                    <ul className={`flex space-x-8 rounded-full py-2 px-10 border-2 border-[#57E6D9] text-[#57E6D9]`}>
                        <li className='whitespace-nowrap'>
                            <Link href='/'>
                                Home
                            </Link>
                        </li>
                        <li className='whitespace-nowrap'>
                            <Link href='/editor'>
                                Editor
                            </Link>
                        </li>
                        <li className='whitespace-nowrap'>
                            <Link href='/leaderboard'>
                                LeaderBoard
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="right md:relative flex justify-end items-center w-1/2 md:w-1/4 pr-4 lg:pr-8">
                    <div className="hamburger lg:hidden flex flex-col space-y-1" onClick={handleHamburgerClick}>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="line w-7 h-[0.2rem] bg-white rounded-full"
                        ></motion.div>
                        <motion.div
                            initial={{ opacity: 1 }}
                            animate={{ opacity: isOpen ? 0 : 1 }}
                            transition={{ duration: 0.2 }}
                            className="line text-left w-6 h-[0.2rem] bg-white rounded-full"
                        ></motion.div>
                        <motion.div
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="line w-7 h-[0.2rem] bg-white rounded-full"
                        ></motion.div>
                    </div>
                </div>
            </motion.nav>
            {
                <div onClick={() => setIsOpen(false)} className={`wrapper lg:hidden overflow-hidden ${isOpen ? 'backdrop-blur-md' : 'hidden'} transition-all duration-300 fixed z-30`}>
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{
                            x: isMobile ? (isOpen ? '40%' : '100%') : (isOpen ? '60%' : '100%'),
                            opacity: 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`mobileNavbar bg-black font-firaCode ${isOpen ? 'shadow-[#57E6D9] shadow-2xl' : ''} pt-24 px-10 text-white h-screen w-screen`}>
                        <ul className='flex flex-col space-y-8'>
                            <li className='text-xl'>
                                <Link href='/'>
                                    Home
                                </Link>
                            </li>
                            <li className='text-xl'>
                                <Link href='/editor'>
                                    Editor
                                </Link>
                            </li>
                            <li className='text-xl'>
                                <Link href='/leaderboard'>
                                    Leaderboard
                                </Link>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            }

        </>
    )
}

export default Navbar