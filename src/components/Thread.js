import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Thread.css';
import { faTrashCan, faHeart } from '@fortawesome/free-solid-svg-icons';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserAuth } from '../context/AuthContext';
import { forwardRef, useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
const Thread = forwardRef((props,ref)=>{
    const {dark, user} = UserAuth();
    const theme = dark ? "dark" : "light";
    const {data,performDel, ...otherProps} = props;
    const [liked,setLiked] = useState(data.likes.includes(user.uid));
    const [lcount, setLcount] = useState(data.likes.length);
    const [dpname, setDpname] = useState("unavailable");
    const handledelete=()=>{
        performDel(data.id);
    }
    const dname = async ()=>{
        const docsnap = await getDoc(doc(db,"UserData",data.uid));
        if (docsnap.exists()){
            const name = docsnap.get("displayName");
            if (name.length !== 0){
                setDpname(name);
            }
        }
    }
    useEffect(()=>{
        dname();
    },[])
    const handLike=async()=>{
        if(liked){
            setLiked(false);
            setLcount(lcount-1);
            await updateDoc(doc(db,"Notes",data.id),{
                likes: arrayRemove(user.uid)
            })
        }
        else{
            setLiked(true);
            setLcount(lcount+1);
            await updateDoc(doc(db,"Notes",data.id),{
                likes: arrayUnion(user.uid)
            })
        }
    }
    if(data.uid === user.uid){
        return(
            <div className={"post-container-"+theme} ref={ref} {...otherProps}>
                <p className={'post-heading-'+theme}>{data.title}</p>
                <p className={"post-content-"+theme}>{data.content}</p>
                <div className='post-footer'>
                    <div className={'post-likes-'+theme}>
                        <p><FontAwesomeIcon icon={faHeart}/></p><p>{lcount}</p>
                        <FontAwesomeIcon className='user-post-del-icon' icon={faTrashCan} onClick={handledelete}/>
                    </div>
                    <p style={dark ? {color:'white'} : {color:'black'}}>{dpname}</p>
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
                        <IconButton onClick={handLike}  size='small' sx={liked?{ color: 'red' }:{color: 'inherit'}}>{liked ? <FavoriteIcon fontSize='inherit'/> : <FavoriteBorderOutlinedIcon fontSize='inherit'/>}</IconButton>
                        <p className='likes-count'>{lcount}</p>
                    </div>
                    <p style={dark ? {color:'white'} : {color:'black'}}>{""+dpname}</p>
                </div>
            </div>
        )
    }
})

export default Thread;