import { useState } from "react";
import { NavLink } from "react-router-dom"

const links = [
    { url: '/google', text: '🔎 All'},
    { url: '/news', text: '📰 News'},
    { url: '/google/search_image', text: '📸 Images'},
    { url: '/videosearch', text: '📺 Videos'},
];

const NavLinkWrapper = ({ to, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <NavLink 
            to={to} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`m-2 text-blue-700 dark:text-blue-300 pb-2 ${isHovered && 'border-b-2 border-blue-700'}`}
        >
            {children}
        </NavLink>
    );
};

export const Links = () => {
    return (
        <div className="flex sm:justify-around justify-between items-center mt-4">
            {links.map(({ url,text }) => (
                <NavLinkWrapper key={text} to={url}>
                    {text}
                </NavLinkWrapper>
            ))}
        </div>
    );
};