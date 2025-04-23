import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem' }}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tasks">All Tasks</Link></li>
        <li><Link to="/create">Create Task</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;