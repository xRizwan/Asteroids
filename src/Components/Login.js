import React, { useState } from 'react';
import MainForm from './MainForm';
import firebase from '../firebaseconfig/config';
import { useHistory } from 'react-router-dom';

const auth = firebase.auth();

export default function Login(props) {
    const history = useHistory();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log("Attempting to Log in");
        auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Logged in")
            history.push('/');
        })
        .catch(err => console.log("Error Occurred:", err))
    }

    return (
        <>
            <MainForm
                formText="Login"
                btnText="Login"
                handlePasswordChange={handlePasswordChange}
                handleEmailChange={handleEmailChange}
                handleSubmit={handleSubmit}
                />
        </>
    )
}