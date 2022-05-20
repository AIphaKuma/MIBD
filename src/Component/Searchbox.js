import React from 'react';
import "./global.css";

export default function Searchbox(props) {
    return (
        <div className='inputDiv'>
            <input
                className='input'
                value={props.value}
                onChange={(event) => props.setSearchValue(event.target.value)}
                placeholder='Rechercher'>
            </input>
        </div>
    )
}
