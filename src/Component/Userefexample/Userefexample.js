import React, { useRef } from 'react';

function Userefexample(props) {
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = () =>{
        emailRef.current.focus();
        nameRef.current.style.backgroundColor='red'
    }
    return (
        <div>
            <input ref={nameRef} name='name' id='name' placeholder='Name'/><br/>
            <input ref={emailRef} name='email' id='email' placeholder='Email'/><br/>
            
            <button onClick={()=>handleSubmit()}>Submit</button>
        </div>
    );
}

export default Userefexample;