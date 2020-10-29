import React, { useState } from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import NearEarthObject from './NearEarthObject';
import Error from './Error';
import dates from '../helpers/helper';
import { addDays, isBefore, isAfter } from 'date-fns'
import Loader from './Loader';

export default function Feed({ isLogged }) {
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ data, setData ] = useState([]);
    const [ error, setError ] = useState('');
    const [ wait, setWait ] = useState(false);

    const API_KEY = process.env.REACT_APP_API_KEY

    const handleSubmit = (e) => {
        setWait(true);
        let fStart = formatDate(startDate);
        let fEnd = formatDate(endDate);
        const url = `https://www.neowsapp.com/rest/v1/feed?start_date=${fStart}&end_date=${fEnd}&detailed=true&api_key=${API_KEY}`

        if (isAfter(endDate, addDays(startDate, 7))){
            setError("End date can only be max 7 days more than the start date");
            return;
        } else if (isBefore(endDate, startDate)){
            setError("End date should not be before the startDate");
            return;
        } else {
            setError('');
        }

        fetch(url)
        .then(response => {
            console.log(response);
            if (response.status !== 404){
                return response.json();
            }

            return {};
        })
        .then(response => {
            console.log(response)
            let keys = Object.keys(response.near_earth_objects);
            const sorted = keys.sort((a, b) => dates.compare(b, a))
            
            return response.near_earth_objects[sorted[0]]
        })
        .then(response => {
            console.log(response)
            let sliced = response.slice(0, 10);
            setData(sliced);
            setWait(false);
        })
        .catch((err) => {setError(err.message)})
    }

    // function to format date for api
    // in yyyy-MM-dd
    function formatDate(date) {
        date = new Date(date);

        let month = '' + (date.getMonth() + 1);
        let day = date.getDate() + '';
        let year = date.getFullYear();

        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;

        return `${year}-${month}-${day}`
    }

    return (
        <>
        <br/>
            <Error message={error}/>
            <h5 className="center">Find closest to Earth by date</h5>
            <div className="center">
                <div>
                    Start Date : <DatePicker
                                    className="inputextra" 
                                    selected={startDate}
                                    onChange={date => setStartDate(date)} />
                </div>
                <div>
                    End Date  :   <DatePicker
                                    className="inputextra"
                                    selected={endDate}
                                    onChange={date => setEndDate(date)} />
                </div>
                <button className="feedBtn" onClick={handleSubmit}>Search</button>
                <br />
            </div>
            {data.length > 0 && !wait
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
                            {data.map(obj => <NearEarthObject isLogged={isLogged} key={obj.id} data={obj}/>)}
                        </tbody>
                    </table>
                  </>
                : null}
            {wait
                ?  <>
                    <Loader />
                  </>
                : null}
        </>
    )
}
