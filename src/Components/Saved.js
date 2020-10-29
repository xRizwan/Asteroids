import React, { useEffect, useState } from 'react';
import firebase from '../firebaseconfig/config';
import NearEarthObject from './NearEarthObject';
import Loader from './Loader';

export default function Saved({ isLogged }) {
    const auth = firebase.auth()
    const db = firebase.firestore();

    const [ saved, setSaved ] = useState([]);
    const [ wait, setWait ] = useState(true);

    useEffect(() => {
        const abortController = new AbortController();
        setWait(true);

        if (isLogged) {
            let ref = db.collection('savedAsteroids').where('by', '==', auth.currentUser.uid);
            ref
            .get()
            .then(snapshot => {
                setSaved(snapshot.docs)
                setWait(false);
            })
        } else {
            setSaved([]);
        }

        return () => {
            console.log('aborting Save');
            abortController.abort();
        }
    }, [isLogged, auth, db])

    return (
        <>
        {saved.length > 0 && !wait
            ? <>
                <h5 className="center">Saved Asteroids</h5>
                <table className="objectTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Magnitude</th>
                            <th>isHazardous?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saved.map(obj => <NearEarthObject saveFilter={true} isLogged={isLogged} key={obj.id} data={obj.data()}/>)}
                    </tbody>
                </table>
              </>
            : null}

            {saved.length === 0 && !wait
                ? <div className="center">
                    <h5>It seems like you have not saved any Asteroids yet!</h5>
                 </div>
            : null}

            {wait
                ? <>
                    <br />
                    <Loader />
                  </>
                : null}
        </>
    )
}