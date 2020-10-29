import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'

export default function Search() {
    const [ query, setQuery ] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSubmit = (e) => {
        setQuery("");
        history.push({pathname: `/asteroid/${query}`})
    }

    return (
        <div className="search-container">
            <input className="query" type="text" onChange={handleChange} placeholder="Search" value={query} />
            <i className="material-icons search-icon" onClick={handleSubmit}>search</i>
        </div>
    )
}