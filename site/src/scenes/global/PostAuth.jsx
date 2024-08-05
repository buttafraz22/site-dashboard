import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Symbols } from '../dashboard/Symbols';
import { SymbolAnalytics } from '../dashboard/SymbolAnalytics';
import { HelpSettings } from '../dashboard/HelpSettings';
import Cookies from 'js-cookie';
import Sidebar from '../../components/Sidebar';
import Topbar from '../../components/Topbar';
import SummaryScene from '../dashboard/SummaryScene';


const PostAuth = () => {
    const navigate = useNavigate();

    useEffect( () => {
        const usertoken = Cookies.get("USER");
        if (usertoken === undefined){
            navigate('/login');
        }
    }, [])


    const getElementByRoute = () => {
        const pathname = window.location.pathname;
        if (pathname === '/dashboard') {
            return <SummaryScene />
        } else if (pathname === '/dashboard/symbols') {
            return <Symbols />
        } else if (pathname === '/dashboard/analysis') {
            return <SymbolAnalytics />
        } else if (pathname === '/dashboard/historical') {
            return <h1> Historical </h1>
        } else if (pathname === '/dashboard/support') {
            return <HelpSettings />
        }
    }

    return (
        <div className="bg-teal-100">
            <div className='flex flex-row h-full w-full overscroll-none'>
                <Sidebar />
                <div className='flex flex-col h-screen w-screen overflow-hidden'>
                    <Topbar />
                    {getElementByRoute()}
                </div>
            </div>
        </div>
    )
}

export default PostAuth;