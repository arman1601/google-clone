import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ResultContextProvider } from './contexts/ResultContextProvider';
import './index.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ResultContextProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ResultContextProvider>
    </React.StrictMode>,
);
