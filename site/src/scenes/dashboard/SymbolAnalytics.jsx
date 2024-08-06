import { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import SearchSymbolBar from '../../components/SearchSymbolBar';
import { useSelector, useDispatch } from "react-redux";
// import { setSearchTerm } from '../../actions/searchActions.js'
import axios from 'axios';
import DatePicker from "../../components/DatePicker";
import { FaSearch } from "react-icons/fa";
import Chart from "react-google-charts";
import { LoadingArrowAnimation } from "../../components/loader";
import { toast, ToastContainer } from 'react-toastify';
import { TOAST_OPTIONS } from '../../lib/constants/toast';
import { useDate } from "../../hooks/useDate";
import ErrorComponent from "../../components/Error";
import ChartElement from "../../components/Chart";

/*
const BellCurveChart = ({ data, titles }) => {
    return (
        <div className="h-3/4 md:h-65 overflow-y-scroll grid grid-cols-2 gap-4">
            {data.map((chartData, index) => (
                <Chart
                    key={index}
                    chartType="LineChart"
                    loader={<Loader />}
                    data={chartData}
                    height="400px"
                    options={{
                        title: `${titles[index]} Performance`,
                        curveType: 'function',
                        legend: { position: 'top' },
                        hAxis: { title: 'Observation' },
                        vAxis: { title: 'Point' },
                        backgroundColor: { fill: 'transparent' },
                        zoomLevel: 19
                    }}
                />
            ))}
            {data.length === 0 && (
                <div className="flex items-center justify-center h-full">
                    <p>No Data for the Range available.</p>
                </div>
            )}
        </div>
    );
};
*/

export const SymbolAnalytics = () => {
    const { initial, setInitial, range, setRange } = useDate();
    const { getRequestHeaders } = useAuth();

    const [deviation, setDeviation] = useState(null);
    const [chartTitles, setChartTitles] = useState([]);
    const [loading, setLoading] = useState(false);


    const [showHighSeries, setShowHighSeries] = useState(true);
    const [showLowSeries, setShowLowSeries] = useState(true);
    const [showLCDPSeries, setShowLCDPSeries] = useState(true);

    const dispatch = useDispatch();
    const valueForSearch = useSelector(state => state.searchTerm);

    const handleInitialChange = (newInitialDate) => {
        setInitial(newInitialDate);
    };

    const handleRangeChange = (newRangeDate) => {
        setRange(newRangeDate);
    }

    const fetchData = async () => {
        /* Get the request standard deviation from the backend.
                Format of the expected response:

                [Array(7), Array(7)...] where the first element 
                is the header and the rest are corresponding
                data points. (Kind of like a spreadsheet.)
                
                The tooltip is generated by the backend.

            This is extensible for both single and double responses.
        */

        const headers = getRequestHeaders();
        setLoading(true);

        if(valueForSearch === ''){
            toast.error('Please Enter the Value For Search.', TOAST_OPTIONS);
            return;
        }

        const defaultOrEncodedName = valueForSearch.includes(',') ?
            encodeURIComponent(valueForSearch) : valueForSearch;
        const singleValuePresent = valueForSearch.includes(',') ? false : true;

        if (range < initial) {
            toast.error('TO Date can not be earlier than FROM date.', TOAST_OPTIONS);
            return;
        }

        const uri = `/api/worker/symbol/deviation/?name=${defaultOrEncodedName}&from=${initial}&to=${range}`;

        try {
            await axios.get(uri, { headers }).then((response) => {
                setDeviation(response.data);

                if(singleValuePresent){
                    setChartTitles([valueForSearch]) ;
                    setShowHighSeries(true);
                    setShowLowSeries(true);
                    setShowLCDPSeries(true);
                }
                else
                    setChartTitles(valueForSearch.split(','));

                setLoading(false);
            }).catch((error) => {
                toast.info("It's not you, it's us. Please try again.", TOAST_OPTIONS);
                setLoading(false);
            });
        } catch (error) {
            console.error('Error fetching deviation:', error);
            setDeviation([]);
        }
    }


    const handleSearchClick = (event) => {
        event.preventDefault();
        fetchData();
    }


    const toggleSeries = (series) => {
        switch (series) {
            case 'High':
                setShowHighSeries(!showHighSeries);
                break;
            case 'Low':
                setShowLowSeries(!showLowSeries);
                break;
            case 'LCDP':
                setShowLCDPSeries(!showLCDPSeries);
                break;
            default:
                break;
        }
    };


    const filterData = (data, showHighSeries, showLowSeries, showLCDPSeries) => {
        return data.map(row => {
            const filteredRow = [row[0]]; // Preserve header
            if (showHighSeries) {
                filteredRow.push(row[1], row[2]);
            }
            if (showLowSeries) {
                filteredRow.push(row[3], row[4]);
            }
            if (showLCDPSeries) {
                filteredRow.push(row[5], row[6]);
            }
            return filteredRow;
        });
    };

    const bellCurveData = useMemo(() => {
        if (!deviation) return [];
        return filterData(deviation, showHighSeries, showLowSeries, showLCDPSeries);
    }, [deviation, showHighSeries, showLowSeries, showLCDPSeries]);




    return (
        <div className="flex h-screen flex-col">
            <ToastContainer autoClose={5000} />
            <div className="h-1/2 p-4 border-b border-gray-300 md:h-1/4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative w-full h-full">
                        <p>From Date</p>
                        <DatePicker date={initial} onDateChange={handleInitialChange} />
                    </div>
                    <div className="relative w-full h-full">
                        <p>To Date</p>
                        <DatePicker date={range} onDateChange={handleRangeChange} />
                    </div>
                    <form className="relative h-full flex items-center" onSubmit={handleSearchClick}>
                        <div className="w-full py-4">
                            <SearchSymbolBar placeholder={'Search Symbol Details...'} isSearchIcon={false} />
                        </div>
                        <div className="ml-2">
                            {!loading? <FaSearch onClick={handleSearchClick} className="cursor-pointer" /> : <></> }
                        </div>
                        {/* <button type="submit" className="hidden">Submit</button> */}
                    </form>
                </div>
            </div>

            {valueForSearch.includes(',') && (
                <div className="p-4 md:h-20">
                    <div className="p-9">
                        <div className="flex items-center space-x-4">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showHighSeries}
                                    className="mr-2 w-4 h-4 text-blue-600 bg-gray border-gray rounded focus:ring-blue-500"
                                    onChange={() => toggleSeries('High')}
                                />
                                Highs
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showLowSeries}
                                    className="mr-2 w-4 h-4 text-blue-600 bg-gray border-gray rounded focus:ring-blue-500"
                                    onChange={() => toggleSeries('Low')}
                                />
                                Lows
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={showLCDPSeries}
                                    className="mr-2 w-4 h-4 text-blue-600 bg-gray border-gray rounded focus:ring-blue-500"
                                    onChange={() => toggleSeries('LCDP')}
                                />
                                LCDPs
                            </label>
                        </div>
                    </div>
                </div>
            )}

            <BellCurveChart data={bellCurveData} chartTitles={chartTitles} loading={loading} />
        </div>
    );
};

const BellCurveChart = ({ data, chartTitles, loading }) => {
    const chartEvents = [
        {
            eventName: "select",
            callback({ chartWrapper }) {
                console.log("Selected ", chartWrapper.getChart());
            }
        }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full mt-5">
                <LoadingArrowAnimation />
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full mt-5">
                <ErrorComponent />
            </div>
        );
    }

    return (
        <div className="h-3/4 md:h-65 overflow-y-scroll mt-5">
            <ChartElement
                type="LineChart"
                data={data}
                chartOptions={{
                    title: `${chartTitles} Distribution`,
                    curveType: 'function',
                    legend: { position: 'top' },
                    hAxis: { title: 'Deviation Values' },
                    vAxis: { title: 'Scale' },
                    backgroundColor: 'transparent',
                    zoomLevel: 19,
                    tooltip: { isHtml: true }
                }}
            />
        </div>
    );
};