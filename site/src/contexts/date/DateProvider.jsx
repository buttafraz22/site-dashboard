import { useDate } from '../../hooks/useDate';
import { useState } from 'react';
import dateContext from './dateContext';

const DateProvider = ({ children }) => {
    const {fromDate, toDate} = useDate();
    const [initial, setInitial] = useState(fromDate);
    const [range, setRange] = useState(toDate);
    
    return (
        <dateContext.Provider value={{ initial, setInitial, range, setRange }}>
            {children}
        </dateContext.Provider>
    );
};

export default DateProvider;