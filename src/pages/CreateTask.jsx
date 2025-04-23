import React, { useState } from 'react';
import TaskForm from '../components/TaskForm';
import { addTask } from '../api';
import { useNavigate } from 'react-router-dom';

function CreateTask() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleAdd = async (task) => {
    try {
      await addTask(task);
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Create New Task</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TaskForm onAdd={handleAdd} />
    </div>
  );
}

export default CreateTask;