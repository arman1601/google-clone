import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Router } from "./components/Router";

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);
    const location = useLocation();

    return (
        <div className={darkTheme ? 'dark' : ''}>
            <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 min-h-screen">
                {!location.pathname.includes('/404','/google') && <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />}
                    <Router />
                {!location.pathname.includes('/404') && <Footer />}
            </div>
        </div>
    );
};

export default App;
