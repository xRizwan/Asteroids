import React, { useRef, useState } from 'react';

export default function MainForm(props) {
    let emailRef = useRef();
    let passwordRef = useRef();
    const [ error, setError ] = useState('')
    
    const submitWrapper = (e) => {
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        if (password.length <= 6) {
            console.log('Password is too weak')
            setError("Password must be greater than 6 letters");
            return;
        } else if(email.length < 1) {
            setError("Email Field Must Not Be Empty");
            return;
        } else {
            setError("");
            props.handleSubmit();
        }
    }

    return (
        <>
            <div className="centered form-container">
                <h4 className="center">{props.formText}</h4>
                <div className="error">{error}</div>
                <input
                    type="text"
                    className="form-input"
                    placeholder="Email"
                    onChange={props.handleEmailChange}
                    ref={emailRef}
                />
                <input
                    type="password"
                    className="form-input"
                    placeholder="Password"
                    ref={passwordRef}
                    onChange={props.handlePasswordChange}
                />
                <div className="center form-input">
                    <button
                        onClick={submitWrapper}
                        className="btn">
                            {props.btnText}
                    </button>
                </div>
            </div>
        </>
    )
}