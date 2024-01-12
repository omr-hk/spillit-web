import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged, OAuthProvider, getRedirectResult} from "firebase/auth";
import {auth} from "../firebaseConfig";
import {doc, setDoc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [displayName, setDisplayName] =useState("");
    const [dark, setDark] = useState(true);
    const [bg, setBg] = useState("beige");
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth,provider);
    }

    const appleSignIn = ()=>{
        const provider = new OAuthProvider('apple.com');
        signInWithRedirect(auth, provider);
    }

    const logout = ()=>{
        signOut(auth);
    }

    const deleteAccount = async()=>{
        await deleteDoc(doc(db,"DisplayNames",auth.currentUser.uid));
        auth.currentUser.delete().then(()=>{
            console.log("User deleted successfully");
        }).catch((error)=>{
            console.log(error);
        });
    }

    const checkDisplayName = async ()=>{
        const docSnap = await getDoc(doc(db,"DisplayNames",user.uid));
        if (docSnap.exists()){
            console.log("document exists");
            setDisplayName(docSnap.data().name);
            setDark(docSnap.data().darkm);
        }
        else{
            await setDoc(doc(db,"DisplayNames",user.uid),{
                name: user.displayName,
                darkm: dark,
                bgc: bg
            })
            setDisplayName(user.displayName)
        }
    }

    const changeDarkMode = async(mode)=>{
        await updateDoc(doc(db,"DisplayNames",user.uid),{
            darkm: mode
        });
        setDark(mode);
    }

    const changeBg = async(col)=>{
        await updateDoc(doc(db,"DisplayNames",user.uid),{
            bgc: col
        });
        setBg(col);
    }

    const changeDisplayName = async(data)=>{
        await updateDoc(doc(db,"DisplayNames",user.uid),{
            name:data
        });
        setDisplayName(data);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser);
            
        });
        return()=>{
            unsubscribe();
        };
    });


    return (
        <AuthContext.Provider value={{googleSignIn,logout,user,deleteAccount, checkDisplayName,displayName, changeDisplayName, dark, setDark,changeDarkMode, appleSignIn,bg, setBg}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = ()=> {
    return (useContext(AuthContext))
}