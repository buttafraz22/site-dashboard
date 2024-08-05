import React, { useState, useEffect } from 'react';
import { FcBullish } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { features, feedback } from '../../lib/constants';
import { FaUserCircle } from "react-icons/fa";

export default function LandingPage() {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Welcome to PSX Visualization App!';
    const barPositions = [20, 50, 80, 110, 140, 170, 200, 230, 260];

    useEffect(() => {
        let index = 0;
        let direction = 1; // 1 for adding characters, -1 for chopping off characters

        const interval = setInterval(() => {
            if (direction === 1) {
                setDisplayText(fullText.slice(0, index + 15)); // "Welcome to " is 12 characters
                index++;
                if (index === fullText.length - 15) {
                    direction = -1;
                }
            } else {
                setDisplayText(fullText.slice(0, index + 15)); // "Welcome to " is 12 characters
                index--;
                if (index === 0) {
                    direction = 1;
                }
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='stock-bg h-screen w-screen overflow-y-scroll'>

            {/* Navbar goes here */}
            <nav className='w-full flex justify-between text-white navbar px-4 py-4 md:px-16 md:py-8'>
                <FcBullish fontSize={50} />
                <ul className='list-none justify-end items-center flex flex-1'>
                    <li className='mr-3'>
                        <Link to={'/login'} className='text-teal-400'>
                            Sign In
                        </Link>
                    </li>

                    <li className='mr-3'>
                        <Link to={'/register'} className='text-teal-400'>
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* The Main Hero goes here */}
            <section className='flex flex-col flex-1 justify-center items-center text-center relative z-50'>
                <div className="chart-container mb-4">
                    <div className="base"></div>
                
                    <div className="bar one"></div>
                    <div className="bar two"></div>
                    <div className="bar three"></div>
                    <div className="bar four"></div>
                    <div className="bar five"></div>
                    <div className="bar six"></div>
                    <div className="bar seven"></div>
                    <div className="bar eight"></div>
                </div>
                <div className='text-teal-500 text-5xl leading-relaxed justify-center items-center text-center'>
                    <h2 style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>{displayText}</h2>

                    <div className='w-1/2 ml-auto mr-auto'>

                        <p className='text-teal-500 text-sm sm:text-[16px] my-4 leading-10 mx-8'>
                            All your stocks information in the correct place. Get the most of current Pakistan
                            Stock Exchange Trends, Past Data and Statistics from our site!
                        </p>
                    </div>
                </div>

                <button type="submit" style={{ maxWidth: 250, }} className="w-full px-5 py-4 rounded-full text-white-200 font-[700] hover:bg-secondary-500 bg-blue-500 ">
                    Get Started
                </button>
            </section>


            {/* The Features Section goes here */}
            <section className='text-white text-center mb-10'>
                <div className=' grid grid-rows-2 gap-10 m-auto w-3/5 sm:grid-cols-2 pt-8'>

                    {features.map((feature) => (
                        <div key={feature.title} className='w-full rounded-lg box-shd p-4 hover:bg-slate hover:text-blue-500 hover:cursor-none'>
                            <span className='text-xl'>{feature.icon}</span>
                            <h2 className='text-lg font-raleway'>{feature.title}</h2>
                            <p className='leading-normal text-[14px] font-raleway p-2'>{feature.content}</p>
                        </div>
                    ))}
                </div>
            </section>


            <hr className='w-80 h-1 mx-auto my-4 bg-teal-400 border-0 rounded md:my-10 dark:bg-teal-500' />
            {/* Add Testimonial here*/}
            <h1 className='text-center tracking-wide text-3xl pb-2'>See testimonials from our clients!</h1>
            <p className='text-center italic hover:not-italic text-sm'> Visualize we have been adding value to our clients in the past years.</p>
            <section className='grid grid-cols-3 sm:grid-cols-3 grid-rows-1 mt-16 relative z-[1] ml-5'>
                {feedback.map((item) => (
                    <div key={item.id} className='bg-transparent border border-gray-200 mr-8 mb-8 px-6 py-8 text-white shadow-[0px_0px_10px_0px_#e1e1e129] rounded-md' style={{ boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.3)' }}>
                        <p className='leading-5 mb-4 tracking-wide'>{item.content}</p>
                        <span className="flex">
                            <FaUserCircle className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300" />
                            <div className='flex flex-col mt-2' >
                                <small className='font-bold mb-2 text-xs tracking-wide'>{item.name}</small>
                                <small className='text-white/60'>{item.title}</small>
                            </div>
                        </span>
                    </div>


                ))}
            </section>
        </div>
    );
}
