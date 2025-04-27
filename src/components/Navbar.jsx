import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../App.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        TaskManager
      </Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/tasks">All Tasks</NavLink></li>
        <li><NavLink to="/tasks/new">Create Task</NavLink></li>
        <li><NavLink to="/tasks/daily">Daily View</NavLink></li>
        
      </ul>
    </nav>
  );
};

export default Navbar;