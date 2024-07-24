import { createContext, useContext, useState, useCallback } from "react";
import { API_KEY, API_URL_1,API_URL_2 } from '../../config.js';
import axios from "axios";

const ResultContext = createContext();

export const ResultContextProvider = ({ children }) => {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError] = useState(null);
    const [searchItem, setSearchItem] = useState('');

    const cache = new Map();

    const getResults = useCallback(async (type, query) => {
        const cacheKey = `${type}_${query}`;
        if (cache.has(cacheKey)) {
            setResults(cache.get(cacheKey));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            let url, options;
            if (type === '/news') {
                url = `${API_URL_2}/`;
                options = {
                    method: 'POST',
                    url,
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': `${API_KEY}`,
                        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
                    },
                    data: {
                        text: query,
                        safesearch: 'off',
                        timelimit: '',
                        duration: '',
                        resolution: '0',
                        region: 'wt-wt',
                        max_results: 25,
                    }
                };
            } else if (type === '/videosearch') {
                url = `${API_URL_2}/videosearch`;
                options = {
                    method: 'POST',
                    url,
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': `${API_KEY}`,
                        'X-RapidAPI-Host': 'google-api31.p.rapidapi.com',
                    },
                    data: {
                        text: query,
                        safesearch: 'off',
                        timelimit: '',
                        duration: '',
                        resolution: '0',
                        region: 'wt-wt',
                        max_results: 15,
                    }
                };
            } else {
                url = `${API_URL_1}${type}`;
                options = {
                    method: 'GET',
                    url,
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': 'e3ccb5b4femsh1fa4ab762633606p165556jsnaaf5e53ca18b',
                        'X-RapidAPI-Host': 'google-search83.p.rapidapi.com',
                    },
                    params: {
                        query,
                        start: '0',
                        num: '10',
                        gl: 'us',
                        lr: 'en',
                        sort: 'relevance'
                    }
                };
            }

            const response = await axios.request(options);
            const data = response.data.results || response.data.result || response.data;

            cache.set(cacheKey, data);
            setResults(data);
        } catch (error) {
            console.error('API error:', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <ResultContext.Provider value={{ getResults, results, searchItem, setSearchItem, isLoading,error }}>
            {children}
        </ResultContext.Provider>
    );
};

export const useResultContext = () => useContext(ResultContext);
