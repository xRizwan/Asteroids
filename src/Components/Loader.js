import React from 'react';
import asteroid from '../images/asteroid.png';


export default function Loader() {

    return (
        <div className="center">
            <img className="loader" width={"100px"} src={asteroid} alt="asteroid" />
        </div>
    )
}
