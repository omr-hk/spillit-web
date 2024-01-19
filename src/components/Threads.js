import './Threads.css';
import Thread from './Thread';
import { useEffect, useRef, useState } from 'react';
import { collection, limit, orderBy, query, getDocs, startAfter, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { UserAuth } from '../context/AuthContext';
function Threads(){
const [lastVisible, setLastVisible] = useState({});
const lastVisibleRef = useRef(null);
const [lastnote, setLastNote] = useState('');
const [state, setState] = useState("");
const [notes, setNotes] = useState([]);
const {dark} = UserAuth();
const [theme, setTheme] = useState(dark ? "dark" : "light");
const [isVisible, setVisible] = useState();
const {user} = UserAuth();
function makeNote(obj, id){
    return {
        id : id,
        title : obj.title,
        content: obj.content,
        uid: obj.uid,
        likes: obj.likes
    }
}
const options={
    root : null,
    rootMargin: "0px",
    threshold: 1.0
}

useEffect(()=>{
    if(Object.keys(user).length !== 0){
        initialFetch();
    }
},[user])



useEffect(()=>{
    setTheme(dark ? "dark" : "light");
},[dark])

useEffect(()=>{
    if(notes.length !== 0){
        setState("loaded");
    }
    else{
        setState("loading");
    }
},[notes])

useEffect(()=>{
    const observer = new IntersectionObserver((entries, observer)=>{
        const entry = entries[0];
        setVisible(entry.isIntersecting);
    },options)
    if(lastVisibleRef.current) observer.observe(lastVisibleRef.current)

    return ()=>{
        if(lastVisibleRef.current) observer.unobserve(lastVisibleRef.current)
    }
},[lastVisibleRef,options])

useEffect(()=>{
    if(isVisible){
        nextFetch();
    }
},[isVisible])

const performDelete = async(id)=>{
    await deleteDoc(doc(db,"Notes",id));
    setNotes(notes.filter((note)=> note.id !== id));
    
}

const initialFetch = async()=>{
    const q = query(collection(db, "Notes"),orderBy("time","desc"),limit(5));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0){
        setState("empty");
    }
    else{
        setState("loading");
        var arr = [];
        querySnapshot.forEach((doc)=>{
            arr.push(makeNote(doc.data(),doc.id));
        })
        setNotes(arr);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        setLastNote(querySnapshot.docs[querySnapshot.docs.length-1].data().id);
    }
}

const nextFetch = async()=>{
    const q = query(collection(db,"Notes"),orderBy("time","desc"),startAfter(lastVisible),limit(5));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size !== 0){
        var arr = notes;
        querySnapshot.forEach((doc)=>{
            if(!(doc.data() in arr)){
                arr.push(makeNote(doc.data(),doc.id));

            }
        })
        setNotes(arr);
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length-1]);
        setLastNote(querySnapshot.docs[querySnapshot.docs.length-1].data().id);
    }
}


if (state === "loading"){
    return (
        <div className='loading-container'>
            <div className={'message-box-'+theme}>
                <p className={'message-'+theme}>Loading ...</p>
            </div>
        </div>
    )
}
else if (state === "empty"){
    return(
        <div className='loading-container'>
            <div className={'message-box-'+theme}>
                <p className={'message-'+theme}>Nothing to see here</p>
            </div>
        </div>
    )
}

else if (state === "loaded"){
    return (
        <div className='thread-container'>
            {notes.map((note)=>{
                return <Thread ref={note.id === lastnote ? lastVisibleRef : null} key={note.id} data={note} performDel={performDelete}/>
            })}
        </div>
    )
}
else{
    return(
        <div className='loading-container'>
            <div className={'message-box-'+theme}>
                <p className='error'>An error might have occured.</p>
            </div>
        </div>
    )
}

}

export default Threads;