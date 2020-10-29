import React, { useState } from 'react';
import firebase from '../firebaseconfig/config'
import MainForm from './MainForm';
import { useHistory } from 'react-router-dom';

export default function Register(props) {
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
        console.log("Attempting to Register")
        const auth = firebase.auth();
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log("Registered")
            history.push('/');
        })
        .catch(err => {
            console.log("Error Occurred:", err)
        })
    }

    return (
        <>
            <MainForm
                formText="Register"
                btnText="Register"
                handlePasswordChange={handlePasswordChange}
                handleEmailChange={handleEmailChange}
                handleSubmit={handleSubmit}
                />
        </>
    )
}