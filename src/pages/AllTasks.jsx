import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const AllTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  // Fetch from backend and update localStorage
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
      localStorage.setItem('tasks', JSON.stringify(res.data));
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskAdded = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTaskDeleted = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${taskId}`, { completed });
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed } : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Tasks</h2>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleTaskDeleted}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default AllTasks;