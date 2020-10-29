import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDspr5TUYwsHQJNgCQC6A7TaIV-aJkZGDw",
    authDomain: "asteroids-66599.firebaseapp.com",
    databaseURL: "https://asteroids-66599.firebaseio.com",
    projectId: "asteroids-66599",
    storageBucket: "asteroids-66599.appspot.com",
    messagingSenderId: "472640520274",
    appId: "1:472640520274:web:716a1f0390c7146636df8b"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire