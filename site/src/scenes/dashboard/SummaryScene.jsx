import React from 'react';
import SummaryTrends from '../../components/SummaryTrends';
import DatePicker from '../../components/DatePicker';
import GridCharting from '../../components/GridCharting';
import { useDate } from '../../hooks/useDate';

const SummaryScene = () => {

    const {initial , setInitial , range, setRange} = useDate();
    const handleChange = (newInitialDate) => {
        // console.log(newDate);
        setInitial(newInitialDate); // Update date state
    };

    const handleChangeSecond = (newDate) => {
        setRange(newDate);
    };


    return (

        <div className="flex h-screen">

            {/* Left column for filters and summary statistics*/}
            <div className="w-1/4 p-4 bg-transparent sm:h-1/2">

                {/* Filters Area */}
                <div className='h-60 border-b'>

                    <h2 className="text-lg font-bold mb-4">Filters</h2>
                    <p className='mt-2'>From Date</p>
                    <DatePicker date={initial} onDateChange={handleChange} />

                    <p className='mt-2'>To Date</p>
                    <DatePicker date={range} onDateChange={handleChangeSecond} />

                </div>

                {/* Stats Area */}
                <SummaryTrends />
            </div>

            {/* Right column for 4 charts*/}
            <div className="w-3/4 bg-cyan p-4 border-l border-gray-300">
                <h2 className="text-lg font-bold mb-4">Brief Graphicals: {initial} - {range}</h2>
                <GridCharting />
            </div>
        </div>

    );
}

export default SummaryScene;