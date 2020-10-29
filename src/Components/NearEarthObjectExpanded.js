import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import asteroid from '../images/asteroid.png';
import firebase from '../firebaseconfig/config';
import findSaved from '../Services/findSaved';
import toggleSave from '../Services/toggleSave';
import Loader from './Loader';

export default function NearEarthObjectExpanded() {
    let params = useParams();
    const [ data, setData ] = useState(null);
    const [ wait, setWait ] = useState(true);
    const [ isSaved, setIsSaved ] = useState(false);
    const url = `https://api.nasa.gov/neo/rest/v1/neo/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`;
    const db = firebase.firestore();
    const auth = firebase.auth();

    useEffect(() => {
        const abortController = new AbortController();
        setWait(true)

        fetch(url)
        .then(result => {
            if (result.status !== 404){
                return result.json()
            } else {
                return null
            }
        })
        .then(result => {

            if (!!result) {
                setData(result);
            } else {
                setData(null)
            }
            setWait(false);
        })
        .catch(() => {
            setWait(false)
        })

        return () => abortController.abort();
    }, [params, url])

    useEffect(() => {
        const abortController = new AbortController();

        if (!!data && !!auth.currentUser) {
            console.log('searching')
            findSaved(db, auth, data, setIsSaved, false);
        }

        return () => abortController.abort();

    }, [auth, data, db])

    const toggleSaveWrapper = (e) => {
        let isLogged = !!auth.currentUser;
        toggleSave(isLogged, db, auth, data, isSaved, setIsSaved, false)
    }

    return(
        <>
            <div className="extended-container">
                <br />
                {!!data && !wait
                    ? <>
                        <div className="center">
                            <i
                                onClick={toggleSaveWrapper}
                                className="material-icons saveBtn saveBtnExtended">
                                {isSaved ? "favorite" : "favorite_bordered"}
                            </i>
                            <br />
                            <img src={asteroid} width="200px" alt='asteroid'/>
                            <div>
                                Name : {data.name}
                            </div>
                            <div>
                                Magnitude : {data.absolute_magnitude_h}
                            </div>
                            <div>
                                Estimated Diameter : {!!data.estimated_diameter ? `${data.estimated_diameter.kilometers.estimated_diameter_max} km` : null}
                            </div>
                            <div>
                                Potentially Hazardous : {data.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                            </div>
                            <div>
                                First Observed : {!!data.orbital_data ? data.orbital_data.first_observation_date  : null}
                            </div>
                            <div>
                                Last Observed : {!!data.orbital_data ? data.orbital_data.last_observation_date  : null}
                            </div>
                            <div>
                                <a href={data.nasa_jpl_url}>NASA-JPL-URL</a>
                            </div>
                        </div>
                    </>
                    : null}
                
                {!wait && !(!!data)
                ? <>
                    <h3 className="center">No Asteroid Found With Id: {params.id}</h3>
                </>
                : null}
                
                {wait
                    ? <>
                        <Loader />
                    </>
                    : null}
            </div>
        </>
    )
}