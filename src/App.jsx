import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container } from './styles';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from db.json when component mounts
  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (task) => {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => setTasks([...tasks, data]))
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleToggleStatus  = (id, newStatus) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: newStatus })
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(tasks.map(task =>
          task.id === id ? { ...task, completed: updatedTask.completed } : task
        ));
      })
      .catch(err => console.error('Error updating task status:', err));
  };

  const handleDeleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <Container>
      <h2 className="text-white text-2xl font-bold mb-4">Task Manager</h2>
      <div className="formaandlist">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onToggleStatus={handleToggleStatus}/>
      </div>
    </Container>
  );
}

export default App;