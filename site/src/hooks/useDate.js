import { useContext } from "react";
import dateContext from '../contexts/date/dateContext';

export const useDate = () => {
    return useContext(dateContext);
}