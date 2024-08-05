import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDate } from '../hooks/useDate';
import { useAuth } from '../hooks/useAuth';

const SummaryTrends = () => {
    const { initial } = useDate();
    const { getRequestHeaders } = useAuth();
    const [data, setData] = useState([]);

    const getLcdp = (arr, mode) => {
        if (!Array.isArray(arr) || arr.length === 0) {
            return null; // Handle case where arr is not an array or empty
        }
        return mode === 'max' ? Math.max(...arr.map(item => item.lcdp)) :  Math.min(...arr.map(item => item.lcdp));
    }

    const getHigh = (arr, mode) => {
        if (!Array.isArray(arr) || arr.length === 0) {
            return null; // Handle case where arr is not an array or empty
        }
        return mode === 'max' ? Math.max(...arr.map(item => item.high)) :  Math.min(...arr.map(item => item.high));
    }

    const getLow = (arr, mode) => {
        if (!Array.isArray(arr) || arr.length === 0) {
            return null; // Handle case where arr is not an array or empty
        }
        return mode === 'max' ? Math.max(...arr.map(item => item.low)) :  Math.min(...arr.map(item => item.low));
    }

    const fetchData = async () => {
        const headers = getRequestHeaders();

        try {
            const response = await axios.get(`/api/worker/symbol/stats/?date=${initial}`, { headers });
            // console.log(response.data);
            setData(response.data);
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    useEffect(() => {
        fetchData();
    }, [initial]);

    return (
        <div>
            <h2 className='text-xl font-bold mt-2'>Overview</h2>
                <div className='bg-transparent w-full max-w-sm p-4 border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'> 
                    <span>
                        <p className='mb-2'> Date: {initial} </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Count of Stocks:</i> {data? data.count : 'Loading'}
                        </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Max LCDP:</i> {data ? getLcdp(data.results, 'max') : 0}
                        </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Min LCDP:</i> {data ? getLcdp(data.results, 'min') : 0}
                        </p>
                    </span>

                    <span>
                        <p className='mb-2'> 
                            <i>Max HI:</i> {data ? getHigh(data.results, 'max') : 0}
                        </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Min HI:</i> {data ? getHigh(data.results, 'min') : 0}
                        </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Max LO:</i> {data ? getLow(data.results, 'max') : 0}
                        </p>
                    </span>
                    <span>
                        <p className='mb-2'> 
                            <i>Min LO:</i> {data ? getLow(data.results, 'min') : 0}
                        </p>
                    </span>
                </div>
         </div>
    );

};

export default SummaryTrends;