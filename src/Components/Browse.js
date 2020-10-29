import React, { useEffect, useState } from 'react';
import NearEarthObject from './NearEarthObject';
import Loader from './Loader';

export default function Browse({ isLogged }) {
    const [ nearObjects, setNearObjects ] = useState([]);
    const [ wait, setWait ] = useState(false);

    useEffect(() => {
        const abortController = new AbortController();

        setWait(true);
        const apiLink = `https://api.nasa.gov/neo/rest/v1/neo/browse?page=1&size=10&api_key=${process.env.REACT_APP_API_KEY}`
        fetch(apiLink)
        .then(result => {
            return result.json();
        })
        .then(result => {
            return result.near_earth_objects;
        })
        .then(result => {
            setNearObjects(result);
            setWait(false);
        })

        return () => abortController.abort();
    }, [])

    return (
        <>
            <h5 className="center">Near Earth Objects Data</h5>
            {!!nearObjects.length > 0
                ? <>
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
                            {nearObjects.map(obj => <NearEarthObject isLogged={isLogged} key={obj.id} data={obj}/>)}
                        </tbody>
                    </table>
                 </>
                : null}
            
            {wait
                ? <Loader />
                : null}
        </>
    )
}