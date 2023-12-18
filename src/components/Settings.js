import './Settings.css';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
function Settings(){
    const {dark, setDark} = UserAuth();
    const [theme, setTheme] = useState(dark ? "dark" : "light");
    const handleSwitch=()=>{
        setDark(dark===true ? false : true);
    }
    useEffect(()=>{
        setTheme(dark ? "dark" : "light");
    },[dark])
    return(
        <div className="settings-container">
            <div className={'utility-'+theme}>
                <p>Toggle Appearance: </p>
                <button className={"toggle-mode-"+theme} onClick={handleSwitch}>switch</button>
            </div>
        </div>
    )
}

export default Settings;