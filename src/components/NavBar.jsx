import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
    <nav className='main-nav-bar'>
        <NavLink to='/eisenhower'>EisenHower</NavLink>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/tasks' >Tasks</NavLink>
      <NavLink to='/create'><i className="fa fa-plus"></i>Create</NavLink>

    </nav>
        
    </>
  );
}

export default Navbar;