import './Threads.css';
import Thread from './Thread';
function Threads(){
    const cont = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac lacus neque. Nam a viverra diam, ut dignissim purus. Nulla facilisi. Proin malesuada accumsan est, ut accumsan erat fermentum a. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent interdum mauris lacinia mi dignissim, eget porta augue lobortis. Nam cursus tortor urna, non semper nisl euismod eu. Nunc venenatis nibh sed tincidunt semper. Donec egestas vitae orci id tempus. Duis ultricies, eros in sagittis gravida, mi purus aliquet ipsum, vel viverra purus lorem id arcu. Nunc sed leo metus. Nunc mi purus, elementum eu sem eu, elementum bibendum eros. Morbi ac imperdiet nulla, non posuere velit. In eleifend lectus tellus, ut mattis dui venenatis quis. In porttitor eleifend posuere.Etiam congue vehicula congue. Vivamus id nisl sit amet eros mollis facilisis. In suscipit purus vitae gravida bibendum. Morbi orci dui, finibus nec cursus ut, iaculis quis massa. Proin eget magna a mauris venenatis convallis sit amet nec mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque eget leo lorem. Mauris tristique sodales risus id mollis. Aliquam quis purus a libero vehicula pretium. Proin rhoncus aliquet commodo. Praesent ut magna porttitor, pretium enim sit amet, scelerisque magna. Nullam non orci eu dui tincidunt tempor vel non velit. In at tellus id dolor hendrerit interdum. Integer eget ultrices turpis.";
    const likes = "124";
    const dname="Omar Hassan";
    const title="Lorem ipsum dolor"

    return(
        <div className='thread-container'>
            <Thread title={title} content={cont} likes={likes} dname={dname}/>
            <Thread title={title} content={cont} likes={likes} dname={dname}/>
            <Thread title={title} content={cont} likes={likes} dname={dname}/>
        </div>
    )
}

export default Threads;