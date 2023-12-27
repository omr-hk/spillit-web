import './Signin.css';
import LogoGoogle from './LogoGoogle';
import LogoApple from './LogoApple';
import LogoSpillit from './LogoSpillit';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin(){

    const navigate = useNavigate();

    const {googleSignIn, user, appleSignIn} = UserAuth();

    const handleGoogleSignIn = async () =>{
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    }

    const handleAppleSignIn = async () =>{
        try {
            await appleSignIn();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user){
            if(Object.keys(user).length !== 0){
                navigate('/homepage');
            }
        }
    },[user]);
    
    return(
        <div className="dialog">
            <LogoSpillit/>

            <button className='gbutton' onClick={handleGoogleSignIn}>
                <div className='bcontent'>
                    <div className='lg'><LogoGoogle fillColor="white" /></div>
                    <div className='con'><p className='gtext'>Sign in with Google</p></div>
                </div>
                </button>
            
                <button className='abutton' onClick={handleAppleSignIn}>
                <div className='bcontent'>
                    <div className='ag'><LogoApple fillColor="black" /></div>
                    <div className='acon'><p className='atext'>Sign in with Apple </p></div>
                </div>
                </button>
        </div>
    )
}

export default Signin;