import { Routes, Route, Navigate } from 'react-router-dom';
import { Results } from './Results';
import { NotFound } from './NotFound';

export const Router = () => {
    return (
        <div className='p-4'>
            <Routes>
                <Route exact path='/' element={<Navigate to='/google' replace />} />
                <Route path='/google' element={<Results />} />
                <Route path='/google/search_image' element={<Results />} />
                <Route path='/news' element={<Results />} />
                <Route path='/videosearch' element={<Results />} />
                <Route path='/404' element={<NotFound />} />
                <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
        </div>
    );
};
