import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import Cookies from 'js-cookie';

export default function Topbar() {
    const username = Cookies.get("username") || undefined; 
    return (
        <>
            <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
            <div className="flex-col flex w-screen">
                <div className="w-full border-b-2 border-gray-200">
                    <div className="h-16 justify-between items-center px-1 flex">
                        <div className="lg:block mr-auto ml-20 hidden relative max-w-xs">
                            <p className="pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none">
                                <span className="justify-center items-center flex">
                                    <span className="justify-center items-center flex">
                                        <span className="items-center justify-center flex">
                                            {/* <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0
                            11-14 0 7 7 0 0114 0z"/></svg> */}
                                        </span>
                                    </span>
                                </span>
                            </p>
                            {/* <input placeholder="Type to search" type="search" className="border border-gray-300 focus:ring-indigo-600
                    focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2"/> */}
                        </div>
                        <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                            <div className="justify-center items-center flex relative">
                                {/* <img src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg"
                        className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300" alt="" /> */}
                                <FaUserCircle className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300" />
                                <p className="font-semibold text-sm pr-20 mr-40">{username}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


