// src/pages/CreateTask.jsx
import React from 'react';
import TaskForm from '../components/TaskForm';
import '../App.css';

const CreateTask = () => {
  return (
    <div className="page-container">
      {/* You can add a header here if needed */}
      {/* <h1>Create a New Task</h1> */}
      <TaskForm />
    </div>
  );
};

export default CreateTask;