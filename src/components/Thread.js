import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Thread.css';
import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { UserAuth } from '../context/AuthContext';
import { forwardRef } from 'react';

const Thread = forwardRef((props,ref)=>{
    const {dark, user} = UserAuth();
    const theme = dark ? "dark" : "light";
    const {data,performDel, ...otherProps} = props;
    const handledelete=()=>{
        performDel(data.id);
    }
    if(data.userid === user.uid){
        return(
            <div className={"post-container-"+theme} ref={ref} {...otherProps}>
                <p className={'post-heading-'+theme}>{data.title}</p>
                <p className={"post-content-"+theme}>{data.content}</p>
                <div className='post-footer'>
                    <div className={'post-likes-'+theme}>
                        <p><FontAwesomeIcon icon={faHeart}/></p><p>{data.likes.length}</p>
                        <FontAwesomeIcon className='user-post-del-icon' icon={faTrashCan} onClick={handledelete}/>
                    </div>
                    <p style={dark ? {color:'white'} : {color:'black'}}>{data.displayName}</p>
                </div>
            </div>
        )
    }
    else{
        return(
            <div className={"post-container-"+theme} ref={ref} {...otherProps}>
                <p className={'post-heading-'+theme}>{data.title}</p>
                <p className={"post-content-"+theme}>{data.content}</p>
                <div className='post-footer'>
                    <div className={'post-likes-'+theme}>
                        <p><FontAwesomeIcon icon={faHeart}/></p><p>{data.likes.length}</p>
                    </div>
                    <p style={dark ? {color:'white'} : {color:'black'}}>{data.displayName}</p>
                </div>
            </div>
        )
    }
})

export default Thread;