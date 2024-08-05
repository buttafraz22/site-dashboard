import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import SearchComponent from '../../components/SearchSymbolBar';
import { PaginationTable } from '../../components/PaginationTable';
import { useSelector } from 'react-redux';
import { LoadingArrowAnimation } from '../../components/loader';
import { toast, ToastContainer } from 'react-toastify';
import { TOAST_OPTIONS } from '../../lib/constants/toast';
// import useSearchStore from '../../stores/searchStore';

export const Symbols = () => {
    const [data, setData] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [previousLink, setPreviousLink] = useState('');
    const [nextLink, setNextLink] = useState('');
    const [itemsCount, setItemsCount] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const valueForSearch = useSelector(state => state.searchTerm);
    const { getRequestHeaders } = useAuth();

    // const { valueForSearch } = useSearchStore();

    const fetchData = async (uri) => {
        /* fetches the data from the backend URI according to pagination controls.
           Default page size is 10.
        */
        try {
            const headers = getRequestHeaders();

            await axios.get(uri, { headers }).then((response) => {
                setData(response.data.results);
                setPreviousLink(response.data.previous);
                setNextLink(response.data.next);
                setItemsCount(response.data.count);
                setHasLoaded(true);
            }).catch( (error) => {
                toast.info(`It's not you, its us. Something went wrong.`, TOAST_OPTIONS);
            });

        } catch (error) {
            console.log(error);
        }
    }

    const getPageRangeString = () => {
        const beginItem = (currentPage - 1) * pageSize + 1;
        const endItem = Math.min(currentPage * pageSize, itemsCount);
        return `Item ${beginItem}-${endItem} out of ${itemsCount}`;
    }

    const toggleDropdown = () => {
        setIsDropDownOpen(!isDropDownOpen);
    };

    const handlePrevious = () => {
        if (previousLink !== null) {
            setCurrentPage(currentPage - 1);
            fetchData(previousLink);
        }
    };

    const handleNext = () => {
        if (nextLink !== null) {
            setCurrentPage(currentPage + 1);
            fetchData(nextLink);
        }
    };

    const handlePageSizeChange = (size) => {
        setPageSize(size);
        setIsDropDownOpen(false);
    };

    useEffect(() => {
        fetchData(`/api/worker/symbol/?page_size=${pageSize}&name=${valueForSearch}`);
    }, [valueForSearch, pageSize])


    return (
        <div className='flex flex-col overflow-y-scroll mb-3'>
            <ToastContainer autoClose={5000}/>
            <div className='flex justify-between mt-4'>
                <div className='mr-auto px-4 py-2'>
                    <SearchComponent placeholder={'Search By Name...'} isSearchIcon={true} />
                </div>

                {/** Page Size DropDown */}
                <div className=' relative flex-none items-center justify-center mr-6'>
                    <div className="relative mt-3">
                        <button
                            id="dropdownDelayButton"
                            className="bg-transparent hover:bg-slate focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            onClick={toggleDropdown}
                        >
                            Items Per Page ({pageSize})
                            <svg
                                className={`w-2.5 h-2.5 ms-3 ${isDropDownOpen ? 'transform rotate-180' : ''}`}
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        {/* Dropdown menu */}
                        {isDropDownOpen && (
                            <div
                                id="dropdownDelay"
                                className="z-10 absolute mt-1 bg-white-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                            onClick={() => handlePageSizeChange(10)}
                                        >
                                            10
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                            onClick={() => handlePageSizeChange(25)}
                                        >
                                            25
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                            onClick={() => handlePageSizeChange(50)}
                                        >
                                            50
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
                                            onClick={() => handlePageSizeChange(100)}
                                        >
                                            100
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/** Pagination tables * */}

            {hasLoaded ? <PaginationTable data={data}
                getPageRangeString={getPageRangeString}
                previousLink={previousLink}
                handlePrevious={handlePrevious}
                nextLink={nextLink}
                handleNext={handleNext}
            />
                : <div className='flex items-center justify-center min-h-screen'>
                    <LoadingArrowAnimation />
                </div>}
        </div>
    );
};