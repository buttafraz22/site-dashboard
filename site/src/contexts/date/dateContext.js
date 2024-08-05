import { createContext } from 'react';
import getDateManufactured from '../../lib/methods.js'

let initialFromDate = getDateManufactured(); // Get initial from date
let initialToDate = getDateManufactured(); // Get initial to date

const dateContext = createContext({
    fromDate: initialFromDate,
    toDate: initialToDate,
});


export default dateContext;
