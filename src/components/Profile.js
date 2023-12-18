import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import './Profile.css';
import { Dialog, Alert, Collapse, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
function Profile(){

    const {user,logout, deleteAccount,checkDisplayName, displayName, changeDisplayName,dark} = UserAuth();

    const [open, setOpen] = useState(false);
    const [alopen, setAlopen] = useState(false);
    const [dname, setDname] = useState("");
    const theme = dark ? "dark" : "light";

    const handleOpen = ()=>{
        setOpen(true);
    }

    const handleClose = ()=>{
        setOpen(false);
    }

    const checkUnique = async()=>{
        if(dname.length != 0){
            const q = query(collection(db,"DisplayNames"), where("name","==",dname));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.exists){
                setAlopen(true);
            }
            else{
                changeDisplayName(user,{
                    name:dname
                });
                setDname("");
                setAlopen(false);
                setOpen(false);
            }
        }
    }


    const handleLogOut = async ()=>{
        try {
            await logout();
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteAccount = async ()=>{
        try {
            await deleteAccount();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(Object.keys(user).length !==0){
            checkDisplayName(user);
        }
    },[user]);

    return(
        <div className="profile-canvas">
            <div className="info">
                <p className="heading">Name</p>
                <p className={"values-"+theme}>{user.displayName}</p>

                <p className="heading">Display Name</p>
                <div className="edit-box">
                    <p className={"values-"+theme}>{displayName.name}</p>
                    <FontAwesomeIcon className={"edit-pencil-"+theme} icon={faPencil} onClick={handleOpen}/>
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <p className={"edit-heading"}>Enter display name</p>
                <input type="text" value={dname} onChange={e=> setDname(e.target.value)} className={"edit-input"}/>
                <button className="edit-submit" onClick={checkUnique}>Update</button>
                <Collapse in={alopen}>
                    <Alert action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlopen(false);
                            }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }} severity="error">Display-name is already in use</Alert>
                </Collapse>
            </Dialog>
            <div className="utilities">
                <button className="pbut" onClick={handleLogOut}>Logout</button>
                <button className="pbut" onClick={handleDeleteAccount}>Delete</button>
            </div>
        </div>
    )
}
export default Profile;