import './LogoSpillit.css';
import Typewriter from "typewriter-effect";
function LogoSpillit(){
    return(
        <div className='outer'>
            <div className='inner-text'>
                <Typewriter  onInit={(typewriter)=>{
                    typewriter
                    .typeString("Spilkir")
                    .pauseFor(90)
                    .deleteAll()
                    .typeString("Sopillt")
                    .pauseFor(90)
                    .deleteAll()
                    .typeString("Spillit")
                    .pauseFor(1000)
                    .callFunction((state)=>{
                        state.elements.cursor.style.display = 'none';
                    })
                    .start();
                }}></Typewriter>
            </div>
        </div>
    );
}
export default LogoSpillit;