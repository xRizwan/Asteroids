import React from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebaseconfig/config';
import { useHistory } from 'react-router-dom';
import Search from './Search';

export default function Navbar({ isLogged }) {
    const history = useHistory();

    const logout = () => {
        const auth = firebase.auth();
        auth
        .signOut()
        .then(() => {
            console.log("Logged out")
            history.push({pathname: '/', state: {response: "Logged Out"}});
        })
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-wrapper">
                <Link to="/" className="brand-logo right">Asteroids</Link>
                <ul id="nav-mobile" className="left">
                    {isLogged
                        ? <>
                            <li onClick={logout}><Link to="/">Logout</Link></li>
                            <li><Link to="/saved">Favorite</Link></li>
                        </>
                        : <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>}
                    <li><Link to="/feed">Closest By Date</Link></li>
                    <li className="hide-on-small-only">
                        <Search />
                    </li>
                </ul>
                </div>
            </nav>
            <br />
                <div className="hide-on-med-and-up">
                    <Search />
                </div>
        </>
    )
}
