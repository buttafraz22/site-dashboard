import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { TOAST_OPTIONS } from '../../lib/constants/toast';


export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState('');

    {/** Icon Mangaement States */}
    const [type, setType] = useState('password');
    const [type2, setType2] = useState('password');
    const [icon1, setIcon1] = useState(FaEye);
    const [icon2, setIcon2] = useState(FaEye);

    const navigate = useNavigate();

    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onPasswordMatchChange = (e) => {
        setPasswordsMatch(e.target.value);
    }

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

    const onFormSubmit = async(e) => {
        e.preventDefault();

        if(!password || !username){
            toast.error('Missing Credentials', TOAST_OPTIONS);
            return;
        }
        if(password !== passwordsMatch){
            // raise a toast notification to alert of the wrong passwords;
            toast.error('Passwords do not match.', TOAST_OPTIONS);
            return;
        }
        const data = {
            username: username,
            password : password
        }
        // console.log(data);
        // on successful response, hit the login screen, else toast to fail the application;
        
        try {
            
            await axios.post( `/api/auth/register/`,
                    data).then( (response) => {
                        toast.success('Register Successful', TOAST_OPTIONS);
                        navigate('/login');

                    }).catch( (error) => {
                        if (error.response.status === 400)
                            toast.error('Credentials Already Exist.', TOAST_OPTIONS);
                        else
                            toast.info('Something went wrong. Try again later.', TOAST_OPTIONS);
                    });
        } catch (error) {
            toast.error(error, TOAST_OPTIONS);
        }
    }

    return (
        <div className='flex
        flex-row
        min-h-screen
        justify-center
        items-center
        bg-transparent stock-bg'>
            
            <ToastContainer autoClose={5000}/>
            {/* Add Card for Register Component */}

            <div className="w-full max-w-sm p-4 bg-transparent border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6">
                    <h5 className="text-xl text-gray-900 dark:text-white">Register for our platform</h5>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="text"
                         name="username"
                         className="bg-gray-50 border border-gray-300
                         text-gray-900 text-sm rounded-lg focus:ring-blue-500
                         focus:border-blue-500 block w-full p-2.5
                         dark:bg-gray-600 dark:border-gray-500
                         dark:placeholder-gray-400 dark:text-white-100" 
                         placeholder="myawesome_username" 
                         value={username}
                         onChange={onUsernameChange}
                         required />
                    </div>

                    {/* Password and Confirm Password */}
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
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                     onClick={onFormSubmit}
                     >
                        
                        Register
                    
                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Already registered? <a href={'/login'} className="text-blue-300 hover:underline dark:text-blue-500">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
