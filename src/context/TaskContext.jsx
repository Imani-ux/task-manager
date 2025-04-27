// src/context/TaskContext.jsx
import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import * as taskService from '../services/taskService';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTask, setCurrentTask] = useState(null); // For editing

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      // Sort by creation date initially, newest first
      setTasks(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError('Failed to load tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const newTask = await taskService.createTask(taskData);
      setTasks((prevTasks) => [newTask, ...prevTasks] // Add to top and re-sort
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      return newTask; // Return for navigation or confirmation
    } catch (err) {
      console.error("Failed to add task:", err);
      setError('Failed to add task.');
      throw err; // Re-throw for form handling
    } finally {
        setLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
      setCurrentTask(null); // Clear current task after update
      return updatedTask;
    } catch (err) {
      console.error("Failed to update task:", err);
      setError('Failed to update task.');
      throw err;
    } finally {
        setLoading(false);
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.deleteTask(id);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError('Failed to delete task. It might have been removed already.');
      
      fetchTasks(); 
    } finally {
            }
  };

  const fetchTaskById = useCallback(async (id) => {
    try {
      setLoading(true);
      const task = await taskService.getTaskById(id);
      setCurrentTask(task);
      return task;
    } catch (err) {
      console.error("Failed to fetch task by ID:", err);
      setError('Failed to load task details.');
      setCurrentTask(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    tasks,
    loading,
    error,
    currentTask,
    fetchTasks,
    addTask,
    updateTask,
    removeTask,
    fetchTaskById,
    setCurrentTask,
    setError, 
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};