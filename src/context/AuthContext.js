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
        await deleteDoc(doc(db,"UserData",auth.currentUser.uid));
        auth.currentUser.delete().then(()=>{
            console.log("User deleted successfully");
        }).catch((error)=>{
            console.log(error);
        });
    }

    const checkDisplayName = async ()=>{
        const docSnap = await getDoc(doc(db,"UserData",user.uid));
        if (docSnap.exists()){
            console.log("document exists");
            setDisplayName(docSnap.data().displayName);
            setDark(docSnap.data().darkm);
        }
        else{
            await setDoc(doc(db,"UserData",user.uid),{
                colorPreference: "beige",
                displayName: user.displayName,
                darkm: dark
            })
            setDisplayName(user.displayName)
        }
    }

    const changeDarkMode = async(mode)=>{
        await updateDoc(doc(db,"UserData",user.uid),{
            darkm: mode
        });
        setDark(mode);
    }

    const changeDisplayName = async(data)=>{
        await updateDoc(doc(db,"UserData",user.uid),{
            displayName:data
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
        <AuthContext.Provider value={{googleSignIn,logout,user,deleteAccount, checkDisplayName,displayName, changeDisplayName, dark, setDark,changeDarkMode, appleSignIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = ()=> {
    return (useContext(AuthContext))
}