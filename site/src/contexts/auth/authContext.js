import { createContext, useContext } from "react";


const authContext = createContext({
    userToken: '',
    username: '',
});

export default authContext;
