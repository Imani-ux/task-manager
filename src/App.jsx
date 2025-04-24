import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container } from './styles';
import './App.css';
import CreateTask from './components/CreateTask';

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
    
   
  );
}

export default App;
