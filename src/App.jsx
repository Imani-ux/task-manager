<<<<<<< HEAD
import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container } from './styles';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <Container>
      <h2 className="text-white text-2xl font-bold mb-4">Task Manager</h2>
      <div className="formaandlist">
        <TaskForm onAddTask={handleAddTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />
      </div>
    </Container>
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import CreateTask from './pages/CreateTask';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </>
>>>>>>> 62ec26cc49834a909b3652548f49a092adde058d
  );
}

export default App;
