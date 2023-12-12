import './HomePage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faGear, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Routes, Route, useResolvedPath, Link} from "react-router-dom";
import { UserAuth } from '../context/AuthContext';
import Threads from "./Threads";
import Profile from "./Profile";
import Settings from "./Settings";
import Newnote from './Newnote';
function HomePage(){
    const {dark} = UserAuth();
    const theme = dark ? "dark" : "light";
    const url = "/homepage/";
    return (
        <div className="mainPage">
           <div className={"navBar-"+theme}>
            <Link to={url}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faHouse} /></Link>
            <Link to={url+"new-note"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faCirclePlus} /></Link>
            <Link to={url+"profile"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faUser} /></Link>
            <Link to={url+"settings"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faGear} /></Link>
           </div>
           <div className={"content-"+theme}>
                <Routes>
                    <Route exact path="/" element={<Threads/>}/>
                    <Route exact path="/new-note" element={<Newnote/>}/>
                    <Route exact path="/profile" element={<Profile/>}/>
                    <Route exact path="/settings" element={<Settings/>}/>
                </Routes>
                <div className={"bottomNav-"+theme}>
                    <Link to={url}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faHouse} /></Link>
                    <Link to={url+"new-note"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faCirclePlus} /></Link>
                    <Link to={url+"profile"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faUser} /></Link>
                    <Link to={url+"settings"}><FontAwesomeIcon className={"nav-icon-"+theme} icon={faGear} /></Link>
                </div>
           </div>
        </div>
    );
}
export default HomePage;