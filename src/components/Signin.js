import './Signin.css';
import LogoGoogle from './LogoGoogle';
import LogoApple from './LogoApple';
import LogoSpillit from './LogoSpillit';
import { UserAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin(){

    const navigate = useNavigate();

    const {googleSignIn, user} = UserAuth();

    const handleGoogleSignIn = async () =>{
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user != null){
            navigate('/homepage');
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
            
                <button className='abutton'>
                <div className='bcontent'>
                    <div className='ag'><LogoApple fillColor="black" /></div>
                    <div className='acon'><p className='atext'>Sign in with Apple </p></div>
                </div>
                </button>
        </div>
    )
}

export default Signin;