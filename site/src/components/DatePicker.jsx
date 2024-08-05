import { useState } from "react";

/**
 * 
 * @param {*} date The date state which would act as the initial state value for the
 * date component.
 * @param {*} onDateChange The change handler for this date function component. 
 * Typically, is a set Handler of useState. 
 * @returns 
 */


const DatePicker = ({ date, onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(date);

    const propagateChange = (e) => {
        setSelectedDate(e.target.value);
        onDateChange(e.target.value);
        // console.log(date);
    }

    return (
        <div className="relative max-w-sm">
            <input
                //  datepicker
                //  data-twe-inline="true" 
                //  datepicker-format="yyyy-mm-dd"
                type="date"
                className='bg-slate border border-gray-300
              text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" 
              placeholder="Select date'
                value={selectedDate}
                onChange={propagateChange}
            />
        </div>
    );
}

export default DatePicker;