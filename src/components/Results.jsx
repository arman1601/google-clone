import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { useResultContext } from "../contexts/ResultContextProvider";
import { useDebounce } from "../hooks/useDebounce";
import { Loading } from "./Loading";
import { Error } from "./Error";

export const Results = () => {
    const { results, isLoading, getResults, searchItem,error } = useResultContext();
    const location = useLocation(); 
    const debouncedSearchItem = useDebounce(searchItem, 300);

    useEffect(() => {
        if (debouncedSearchItem) {
            getResults(location.pathname, debouncedSearchItem);
        }
    }, [debouncedSearchItem, location.pathname, getResults]);

    if (isLoading) return <Loading />;
    if (error) return <Error error={error} />;

    switch (location.pathname) {
        case '/google':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
                    {Array.isArray(results) && results.map(({ url, title }, index) => (
                        <div key={index} className="md:w-2/5 2-full">
                            <Link to={url} target="_blank" rel="noreferrer">
                                <p className="text-sm">
                                    {url?.length > 30 ? url.substring(0, 30) : url}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </Link>
                        </div>
                    ))}
                </div>
            );
        case '/google/search_image':
            return (
                <div className="flex flex-wrap justify-between px-8">
                    {Array.isArray(results) && results.map(({ origin, url, id }) => (
                        <Link
                            to={origin?.website?.url} target="_blank"
                            key={id} rel="noreferrer" style={{ maxWidth: '33.33%' }}
                            className="w-full md:w-1/3 p-2"
                        >
                            <div className="w-full h-48 flex items-center justify-center overflow-hidden">
                                <img
                                    src={url} alt={origin?.title || 'Image'} loading="lazy"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="sm:w-36 w-36 break-words text-sm mt-2">{origin?.title || 'No Title'}</p>
                        </Link>
                    ))}
                </div>
            );
        case '/news':
            return (
                <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
                    {Array.isArray(results.news) && results.news.map(({ url, source, title }, index) => (
                        <div key={index} className="md:w-2/5 2-full">
                            <Link to={url} target="_blank" rel="noreferrer">
                                <p className="text-lg dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </Link>
                            <div className="flex gap-4">
                                <Link to={url} target="_blank" rel="noreferrer" className="hover:underline">
                                    {source}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case '/videosearch':
            return (
                <div className="flex flex-wrap justify-between px-8">
                    {Array.isArray(results) && results.map((video, index) => (
                        <div key={index} className="p-2">
                            {video.content && <ReactPlayer url={video.content} controls width='355px' height='200px' />}
                        </div>
                    ))}
                </div>
            );
        default:
            return 'ERROR!';
    }
};
