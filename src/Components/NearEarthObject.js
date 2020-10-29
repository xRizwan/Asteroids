import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebaseconfig/config';
import findSaved from '../Services/findSaved';
import toggleSave from '../Services/toggleSave';

export default function NearEarthObject({ data, isLogged, saveFilter }) {
    
    const db = firebase.firestore();
    const auth = firebase.auth();

    const [ isSaved, setIsSaved ] = useState(false);
    
    useEffect(() => {
        const abortController = new AbortController();

        if (isLogged) {
            findSaved(db, auth, data, setIsSaved, saveFilter);
        }

        if (!isLogged) {
            setIsSaved(false);
        }

        return () => {
            console.log('aborting NEO');
            abortController.abort();
        };

    }, [isLogged, db, auth, data, saveFilter])

    return (
        <>
            <tr>
                <td>
                    <Link to={`/asteroid/${!!saveFilter ? data.asteroid_id : data.id}`}>
                        {!!saveFilter ? data.asteroid_id : data.id}
                    </Link>
                </td>
                <td>{data.name}</td>
                <td>{data.absolute_magnitude_h}</td>
                <td>{data.is_potentially_hazardous_asteroid ? "Yes" : "No"}</td>
                <td>
                    <i className="material-icons saveBtn" onClick={() => toggleSave(isLogged, db, auth, data, isSaved, setIsSaved, saveFilter)}>
                        {isSaved ? 'favorite' : 'favorite_bordered'}
                    </i>
                </td>
            </tr>
        </>
    )
}