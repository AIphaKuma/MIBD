import React from 'react';
import RegistrerForm from './RegistrerForm';
import Home from './Home';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import '../App.css';


export default function Navbar(props) {

  return (
    <>
      <BrowserRouter>
        <div className='navbar'>
          <h1> {props.heading} </h1>
          <h3 className='home'> <Link to="/"> Home</Link> </h3>
          <ul>
            <li> <Link to="/RegistrerForm"> Sign Up</Link> </li>
            <li> <Link to="/RegistrerForm"> Sign In</Link> </li>
          </ul>
        </div>

        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/RegistrerForm' element={<RegistrerForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
