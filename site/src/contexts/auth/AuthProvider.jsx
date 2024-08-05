import authContext from './authContext';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

const AuthProvider = ({ children }) => {
    const {userToken, username} = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState(false); // null represents the initial loading state

    useEffect(() => {
        // Simulate an asynchronous check for authentication
        const checkAuthStatus = () => {
          const token = localStorage.getItem('token');
          setIsAuthenticated(!!token); // Update the authentication status based on the presence of a token
        };
    
        checkAuthStatus();
      }, []);

    const setCredentials = (newToken, newUser) => {
        Cookies.set("USER", newToken);
        Cookies.set("username", newUser);
        setIsAuthenticated(true);
    }
    
    const getRequestHeaders = () => {
        const usertoken = Cookies.get("USER");
        if(!usertoken){
            setIsAuthenticated(false);
            return;
        }
        const headers = {
            'Authorization': `Bearer ${usertoken}`,
            'Accept': '*/*'
        };

        return headers;
    }
    const handleLogout = () => {
        Cookies.remove("USER");
        Cookies.remove("username");
        setIsAuthenticated(false);
    }
    return (
        <authContext.Provider value={{ setCredentials, getRequestHeaders, handleLogout, isAuthenticated }}>
            {children}
        </authContext.Provider>
    );
};

export default AuthProvider;