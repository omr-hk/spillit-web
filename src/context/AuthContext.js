import { useContext, createContext, useEffect, useState } from "react";
import {GoogleAuthProvider, signInWithRedirect, signOut, onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebaseConfig";
import {doc, setDoc, getDoc, updateDoc, deleteDoc} from "firebase/firestore";
import { db } from "../firebaseConfig";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [displayName, setDisplayName] =useState({});
    const [dark, setDark] = useState(true);
    const googleSignIn = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth,provider);
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

    const checkDisplayName = async (user)=>{
        const docSnap = await getDoc(doc(db,"DisplayNames",user.uid));
        if (docSnap.exists()){
            console.log("document exists");
            setDisplayName(docSnap.data());
        }
        else{
            await setDoc(doc(db,"DisplayNames",user.uid),{
                name: user.displayName
            })
            setDisplayName({
                name: user.displayName
            })
        }
    }

    const changeDisplayName = async(user,data)=>{
        await updateDoc(doc(db,"DisplayNames",user.uid),{
            name:data.name
        });
        checkDisplayName(user);
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
        <AuthContext.Provider value={{googleSignIn,logout,user,deleteAccount, checkDisplayName,displayName, changeDisplayName, dark, setDark}}>
            {children}
        </AuthContext.Provider>
    );
}

export const UserAuth = ()=> {
    return (useContext(AuthContext))
}