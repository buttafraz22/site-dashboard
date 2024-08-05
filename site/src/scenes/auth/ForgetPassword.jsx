import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { TOAST_OPTIONS } from '../../lib/constants/toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';


export default function ForgetPassword() {
    const { username } = useParams();
    const [useremail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState('');
    const [onLinkRecieved, setOnLinkRecieved] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const navigate = useNavigate();

     /* Icon Management States */
    const [type, setType] = useState('password');
    const [type2, setType2] = useState('password');
    const [icon1, setIcon1] = useState(FaEye);
    const [icon2, setIcon2] = useState(FaEye);

    const handleToggle1 = () => {
        if (type==='password'){
           setIcon1(FaEyeSlash);
           setType('text')
        } else {
           setIcon1(FaEye)
           setType('password')
        }
    }
    const handleToggle2 = () => {
        
        if (type2==='password'){
           setIcon2(FaEyeSlash);
           setType2('text')
        } else {
           setIcon2(FaEye)
           setType2('password')
        }
     }

    /* End Icon Management States */

    const onUserEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onPasswordMatchChange = (e) => {
        setPasswordsMatch(e.target.value);
    }

    const onForgetPasswordClick = async() => {
        if (useremail === ''){
            toast.error('Enter Recovery Mail', TOAST_OPTIONS);
        }

        const data = {
            username : username.replace(':', ''),
            email: useremail
        }

        await axios.post(
            `/api/auth/forget-password/`,
            data
        ).then( (response) => {
            setIsClicked(true);
            setOnLinkRecieved(response.data.uri);
        }).catch((err) => {
            console.log(err)
        });
    }

    const handleSendResetPassword = async() => {
        if(password !== passwordsMatch){
            toast.error('Passwords do not match. Try again.', TOAST_OPTIONS);
            return;
        }

        const data = {
            password: password
        };

        await axios.patch(
            `/api${onLinkRecieved}`,
            data
        ).then( (response) => {
            toast.success('Password Reset', TOAST_OPTIONS);
            navigate('/login'); 
        }).catch((err) => {
            toast.error('Something went wrong. Try again.', TOAST_OPTIONS);
        });

        
    }

    return (
        <div className='flex
    flex-row
    min-h-screen
    justify-center
    items-center
    bg-transparent
    stock-bg'>
            <ToastContainer autoClose={5000} />

            {/** Forget Password Card */}
            <div className="w-full max-w-lg p-4 bg-transparent
         border border-gray-200 rounded-lg shadow sm:p-6
         md:p-8 dark:bg-gray-800 dark:border-gray-700"
            >
                <form className='space y-6'>
                    <h5 className="text-xl text-gray-900 dark:text-white">Enter Recovery email for: {username.replace(':', '')}</h5>

                    <div className='mt-5 mb-5'>
                        <label htmlFor="useremail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="email"
                            name="useremail"
                            className="bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500
                            focus:border-blue-500 block w-full p-2.5
                            dark:bg-gray-600 dark:border-gray-500
                            dark:placeholder-gray-400 dark:text-white-100"
                            placeholder="john.doe@gmail.com"
                            value={useremail}
                            onChange={onUserEmailChange}
                            required />
                    </div>


                    <button type="button"
                     className="w-full text-white-100 bg-blue-400
                     hover:bg-blue-600 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm
                     px-5 py-2.5 text-center dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800
                     max-w-sm ml-10"
                     onClick={onForgetPasswordClick}
                     disabled={isClicked}
                     >
                        
                        Send Recovery Email
                    
                    </button>

                    <hr className='w-80 h-1 mx-auto my-4 bg-teal-400 border-0 rounded md:my-10 dark:bg-teal-500'/>

                    {onLinkRecieved? <>
                        <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className='flex flex-row mb-4'>
                            <input type={type}
                                name="password"
                                placeholder="••••••••"
                                className="bg-gray-50
                                border border-gray-300
                                text-gray-900 
                                text-sm rounded-lg
                                focus:ring-blue-500
                                focus:border-blue-500 
                                block w-full p-2.5 
                                dark:bg-gray-600 
                                dark:border-gray-500
                                dark:placeholder-gray-400
                                dark:text-white"
                                value={password}
                                onChange={onPasswordChange}
                                required />
                                <span className="flex justify-around items-center ml-2" onClick={handleToggle1}>
                                    {icon1}
                                </span>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <div className='flex flex-row mb-4'>
                            <input type={type2}
                                name="password"
                                placeholder="••••••••"
                                className="bg-gray-50
                                border border-gray-300
                                text-gray-900 
                                text-sm rounded-lg
                                focus:ring-blue-500
                                focus:border-blue-500 
                                block w-full p-2.5 
                                dark:bg-gray-600 
                                dark:border-gray-500
                                dark:placeholder-gray-400
                                dark:text-white"
                                value={passwordsMatch}
                                onChange={onPasswordMatchChange}
                                required />
                                <span className="flex justify-around items-center ml-2" onClick={handleToggle2}>
                                    {icon2}
                                </span>
                        </div>
                    </div>

                    <button type="button"
                     className="w-full text-white-100 bg-blue-400
                     hover:bg-blue-600 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm
                     px-5 py-2.5 text-center dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800
                     max-w-sm ml-10"
                     onClick={handleSendResetPassword}
                     >
                        
                        Reset Password
                    </button>
                    </> : <></>}
                    {/* Password and Confirm Password */}
                    
                </form>
            </div>

        </div>
    )
}
