import './Settings.css';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
function Settings(){
    const {dark, setDark,changeDarkMode} = UserAuth();
    const [theme, setTheme] = useState(dark ? "dark" : "light");
    const handleSwitch=()=>{
        setDark(dark===true ? false : true);
        const mode = dark===true ? false : true;
        changeDarkMode(mode);
    }
    useEffect(()=>{
        setTheme(dark ? "dark" : "light");
    },[dark])
    return(
        <div className="settings-container">
            <div className={'utility-dmode-'+theme}>
                <button className={"toggle-mode-"+theme} onClick={handleSwitch}>Toggle Dark Mode</button>
            </div>
        </div>
    )
}

export default Settings;