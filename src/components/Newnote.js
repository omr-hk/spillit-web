import { useEffect, useState } from 'react';
import './Newnote.css';
import { collection, doc, setDoc, serverTimestamp} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserAuth } from '../context/AuthContext';
function Newnote(){
    const {user, displayName, dark,checkDisplayName} = UserAuth();
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState(dark ? "dark" : "light");
    useEffect(()=>{
        setTheme(dark ? "dark" : "light");
    },[dark]);
    useEffect(()=>{
        if(Object.keys(user).length !==0){
            checkDisplayName(user);
        }
    },[user])
    const note = (title, content, displayName,userid,id)=>{
        return {
            id: id,
            title: title,
            content: content,
            displayName: displayName.name,
            likes: [],
            userid: userid,
            time: serverTimestamp()
        }
    }

    const handleSubmit = async()=>{
        if(content.length!==0 && title.length!==0){
            const newNoteRef = doc(collection(db,"Notes"));
            await setDoc(newNoteRef,note(title,content,displayName,user.uid,newNoteRef.id)).then(()=>{
                setContent("");
                setTitle("");
            });
        }
    }
    return(
        <div className="newnote-canvas">
            <div className='newnote-container'>
               <textarea className={'newnote-input-'+theme} placeholder='Enter content here..' value={content} onChange={e => setContent(e.target.value)}></textarea>
               <input className={'newnote-title-'+theme} placeholder='Enter title here..' value={title} onChange={e => setTitle(e.target.value)} maxLength={30}></input>
               <button className='newnote-submit' onClick={handleSubmit}>Add note</button>
            </div>
        </div>
    )
}

export default Newnote;