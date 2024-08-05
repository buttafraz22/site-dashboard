export const PaginationTable = ({data, getPageRangeString, previousLink, handlePrevious, nextLink, handleNext }) => {
    return(
        <div className='w-full h-full max-w-screen-xl mx-auto px-4 my-6'>
            <div className='flex justify-between mt-4 mb-4'>
                    <div className='relative justify-initial px-4 py-2'>
                        <em className="text-md text-gray-700 dark:text-gray-400">
                            {getPageRangeString()}
                        </em>
                        
                    </div>

                    <div className=' relative justify-initial '>
                        <div className='flex'>
                            {/* Previous Button */}
                            <a className={`flex items-center
                             justify-center
                             px-4 h-10 me-3 
                             text-base 
                             font-medium 
                             text-blue-300 
                             bg-transparent
                             border border-b
                             rounded-lg ${!previousLink ? 'cursor-not-allowed': 'cursor-pointer'}`}
                                onClick={handlePrevious}
                                disabled={!previousLink}>
                                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                                </svg>
                                Previous
                            </a>

                            {/* Next Button */}
                            <a className={`flex items-center
                             justify-center
                             px-4 h-10 me-3 
                             text-base 
                             font-medium 
                             text-blue-300 
                             bg-transparent
                             border border-b
                             rounded-lg ${!nextLink ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={handleNext}
                                disabled={!nextLink}>
                                Next
                                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <table className='table-auto w-full shadow-md border-collapse'>
                    <thead className="text-sm uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className='bg-teal-200'>
                            <th className='px-4 py-2' scope="col">Symbol</th>
                            <th className='px-4 py-2' scope="col">Name</th>
                            <th className='px-4 py-2' scope="col">Market Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.symbol_id} className='odd:bg-white-200 hover:bg-slate even:bg-teal-200'>
                                <td className='px-4 py-2' scope='row'>{item.symbol_code}</td>
                                <td className='px-4 py-2' scope='row'>{item.symbol_name}</td>
                                <td className='px-4 py-2' scope='row'>{item.market_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    );
};