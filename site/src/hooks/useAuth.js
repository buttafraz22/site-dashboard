import { useContext } from "react";
import authContext from "../contexts/auth/authContext";

export const useAuth = () => {
    return useContext(authContext);
}