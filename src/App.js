import React, { useEffect, useState } from 'react';
import Navbar from './Component/Navbar';
import List from './Component/List';
import './App.css';
import Searchbox from './Component/Searchbox';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  const getMovies = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=41592587`;

    const response = await fetch(url);
    const responseJson = await response.json();
    console.log(responseJson)

    if (responseJson.Search) {
      setMovies(responseJson.Search)

    }

  };

  useEffect(() => {
    getMovies(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className='container'>
        <Navbar heading="MIDB" />
        <Searchbox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='container'>
        <div className='movieList'>
          <List movies={movies} />
        </div>
      </div>

    </>
  )
}
