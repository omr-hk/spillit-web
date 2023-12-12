import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Thread.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '../context/AuthContext';
function Thread(props){
    const {dark} = UserAuth();
    const theme = dark ? "dark" : "light";
    return(
        <div className={"post-container-"+theme}>
            <p className={'post-heading-'+theme}>{props.title}</p>
            <p className={"post-content-"+theme}>{props.content}</p>
            <div className='post-footer'>
                <div className={'post-likes-'+theme}>
                    <p><FontAwesomeIcon icon={faHeart}/></p><p>{props.likes}</p>
                </div>
                <p style={dark ? {color:'white'} : {color:'black'}}>{props.dname}</p>
            </div>
        </div>
    )
}

export default Thread;