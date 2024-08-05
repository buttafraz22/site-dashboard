const ErrorComponent = () => {
    return (
        <div role="alert">
            <div class="bg-red-500 text-white-100 font-bold rounded-t px-4 py-2">
                Oops!
            </div>
            <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <h6>It's not you, it's us.</h6>
                <hr className='h-1 mx-auto my-4 bg-teal-400 border-0 rounded dark:bg-teal-500'/>
                <p>Data is not available for this range.</p>
            </div>
        </div>
    );
}

export default ErrorComponent;