// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Styles for home page

const Home = () => {
  return (
    <div className="home-page container">
      <h1>Welcome to Your Task Manager</h1>
      <p>
        Stay organized and productive. Manage your tasks efficiently,
        track your progress, and never miss a deadline again!
      </p>
      <div className="cta-buttons">
        <Link to="/tasks" className="button-primary">View All Tasks</Link>
        <Link to="/tasks/new" className="button-success">Create New Task</Link>
      </div>
      <div style={{marginTop: '40px'}}>
        <h2>Features:</h2>
        <ul style={{ listStyle: 'disc', paddingLeft: '40px', textAlign: 'left', maxWidth: '400px', margin: '20px auto'}}>
            <li>Create, Edit, and Delete tasks</li>
            <li>Set due dates and priorities</li>
            <li>Track task status (Pending, In Progress, Completed)</li>
            <li>Filter and sort tasks</li>
            <li>Responsive design for all devices</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;