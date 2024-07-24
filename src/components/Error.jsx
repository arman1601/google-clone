export const Error = ({ error }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-5 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
            <h1 className="text-6xl font-bold mb-3">Error</h1>
            <p className="text-lg mb-3">{error.response.data.message || error.message || 'An unknown error occurred'}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300">
                Try Again
            </button>
        </div>
    );
};

