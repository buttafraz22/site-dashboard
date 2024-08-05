import React, { useCallback } from 'react';
// import useSearchStore from '../stores/searchStore';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../actions/searchActions.js'
import  debounce  from 'lodash.debounce';


const classNames = 'block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'


const SearchComponent = ({ placeholder, isSearchIcon }) => {
    // const { valueForSearch, setValueForSearch } = useSearchStore();
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.searchTerm);
    const PERFORMANCE_DELAY = 50;


    const debouncedSetSearchTerm = useCallback(
        debounce((value) => dispatch(setSearchTerm(value)), PERFORMANCE_DELAY), // 300ms debounce delay
        [dispatch]
    );

    const handleSearchChange = (e) => {
        debouncedSetSearchTerm(e.target.value); 
    };

    return (
        <form className="max-w-lg ml-3">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                {isSearchIcon? <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-8 h-8 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div> : <></>}
                
                <input type="text"
                    id="default-search"
                    className={classNames}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleSearchChange} />
            </div>
        </form>
    );
};

export default SearchComponent;
