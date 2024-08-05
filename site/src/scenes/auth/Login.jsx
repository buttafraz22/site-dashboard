import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { TOAST_OPTIONS } from '../../lib/constants/toast';
import { LoadingArrowAnimation } from '../../components/loader';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(FaEyeSlash);

    const navigate = useNavigate();

    const { setCredentials } = useAuth();

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleToggle = () => {
        if (type==='password'){
           setIcon(FaEyeSlash);
           setType('text')
        } else {
           setIcon(FaEye)
           setType('password')
        }
     }

    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (password === '' || username === ''){
            toast.error('Missing Credentials. Try again', TOAST_OPTIONS);
            return;
        }

        setRequestSent(true);

        const data = {
            username: username,
            password: password
        }

        
        try {
            await axios.post( `/api/auth/login/`,
                    data).then( (response) => {

                        toast.success('Login Successful', TOAST_OPTIONS);
                        setCredentials(response.data.token, response.data.username);
                        setRequestSent(false);
                        navigate('/dashboard');

                    }).catch( (error) => {
                        if (error.response.status === 401)
                            toast.error('Wrong Credentials', TOAST_OPTIONS);
                        else
                            toast.info('Something went wrong. Try again later.', TOAST_OPTIONS);

                        setRequestSent(false);
                    });
        } catch (error) {
            toast.error(error, TOAST_OPTIONS);
        }

    }

    const handleForgetPassword = (e) => {
        e.preventDefault();
        if(username === ''){
            toast.error('Please Enter username.', TOAST_OPTIONS);
            
            return;
        }
        // console.log('empty password');
        toast.info('Please wait while we facilitate you.', TOAST_OPTIONS);
        navigate(`/forget-password/:${username}`);
    }


    return (
        <div className='flex
     flex-row
     min-h-screen
     justify-center
     items-center
     bg-transparent
     stock-bg'
        >
            <ToastContainer autoClose={5000} />
            {/* Add Card for Login Component */}

            { !requestSent ? <div className="w-full max-w-sm p-4 bg-transparent border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6">
                    <h5 className="text-xl text-gray-900 dark:text-white">Sign in to our platform</h5>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                        <input type="text"
                            name="username"
                            id='username'
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

                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <div className='flex flex-row mb-4'>
                            <input type={type}
                                name="password"
                                id='password'
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
                                <span className="flex justify-around items-center ml-2" onClick={handleToggle}>
                                    {icon}
                                </span>
                        </div>
                    </div>


                    <div className="items-start">
                        <a className="ms-auto text-sm text-blue-300 hover:underline dark:text-blue-500" onClick={handleForgetPassword}>
                            Forgot Password?
                        </a>
                    </div>


                    <button type="submit"
                        className="w-full text-white-100 bg-blue-400
                     hover:bg-blue-600 focus:ring-4 focus:outline-none
                     focus:ring-blue-300 font-medium rounded-lg text-sm
                     px-5 py-2.5 text-center dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={onFormSubmit}
                    >

                        Login to your account

                    </button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <a href={'/register'} className="text-blue-300 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div> : <>
                <LoadingArrowAnimation />
                </>
            }
        </div>
    );
}
