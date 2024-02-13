import React, { useState } from 'react'

const Header = () =>{
    const [darkMode, setDarMode] = useState(false);

    const handleClic = () =>{
        setDarMode(!darkMode);
    }

    return(
        <div className="Header">
            <h1>React hooks</h1>
            <button type='button' onClick={handleClic}>
                {darkMode ? "DarkMode" : "LightMode"}
            </button>
            <button type='button' onClick={handleClic}>
                {darkMode ? "DarkMode 2" : "LightMode 2"}
            </button>
        </div>

    );
}


export default Header;