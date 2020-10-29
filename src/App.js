import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import firebase from './firebaseconfig/config';
import Login from './Components/Login';
import Register from './Components/Register';
import Navbar from './Components/Navbar';
import Browse from './Components/Browse';
import Feed from './Components/Feed';
import Saved from './Components/Saved';
import NearEarthObjectExpanded from './Components/NearEarthObjectExpanded';

function App() {
  let auth = firebase.auth();
  const [ isLogged, setIsLogged ] = useState(() => {
    return !!firebase.auth().currentUser ? true : false
  });

  useEffect(() => {

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("logged in")
        setIsLogged(true);
      }
      else {
        console.log("logged out")
        setIsLogged(false);
      }
    })

  }, [auth])

  return (
    <Router>
      <Navbar isLogged={isLogged}/>
      <Switch>
        
        <Route exact path="/login">
          <Login />
        </Route>

        <Route exact path="/register">
          <Register />
        </Route>

        <Route exact path="/saved">
          <Saved isLogged={isLogged}/>
        </Route>

        <Route exact path="/">
          <Browse isLogged={isLogged}/>
        </Route>

        <Route exact path="/asteroid/:id">
          <NearEarthObjectExpanded />
        </Route>

        <Route exact path="/feed">
          <Feed isLogged={isLogged} />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
