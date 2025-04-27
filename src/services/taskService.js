
import apiClient from '../api';
import { v4 as uuidv4 } from 'uuid'; 

export const getAllTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await apiClient.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const newTask = {
    ...taskData,
    id: uuidv4(), 
    createdAt: new Date().toISOString(),
    status: taskData.status || 'pending', 
  };
  const response = await apiClient.post('/tasks', newTask);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await apiClient.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  await apiClient.delete(`/tasks/${id}`);
  return id; 
};