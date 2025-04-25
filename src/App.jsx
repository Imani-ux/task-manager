import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Container } from './styles';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [editingTask, setEditingTask] = useState(null);

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
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add task');
        }
        return res.json();
      })
      .then((newTask) => {
        setTasks([...tasks, newTask]);
      })
      .catch((error) => console.error('Error adding task:', error));
  };

  const handleEditSave = (updatedTask) => {
    fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update task');
        }
        return res.json();
      })
      .then((updatedTaskFromServer) => {
        setTasks(tasks.map(task =>
          task.id === updatedTaskFromServer.id ? updatedTaskFromServer : task
        ));
        setEditingTask(null);
      })
      .catch((error) => console.error('Error updating task:', error));
  };

  const handleToggleStatus = (id, newStatus) => {
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

  const sortTasks = (criteria) => {
    let sortedTasks = [...tasks];

    switch (criteria) {
      case 'dueDate':
        sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'pending':
        sortedTasks.sort((a, b) => (a.completed ? 1 : -1) - (b.completed ? 1 : -1));
        break;
      case 'done':
        sortedTasks.sort((a, b) => (a.completed ? -1 : 1) - (b.completed ? -1 : 1));
        break;
      case 'createdTime':
        sortedTasks.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
        break;
      case 'title':
        sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    setTasks(sortedTasks);
    setSortBy(criteria);
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
  };

  return (
    <Container>
      <h2 className="text-white text-2xl font-bold mb-4">Task Manager</h2>
      <div className="flex justify-between items-center mb-4">
        {editingTask === null ? (
          <TaskForm onAddTask={handleAddTask} />
        ) : (
          <TaskForm
            onAddTask={handleEditSave}
            initialTask={editingTask}
            isEditing={true}
            onCancelEdit={() => setEditingTask(null)}
          />
        )}
        <div className="flex items-center">
          <label htmlFor="sortBy" className="mr-2 text-white">Sort By:</label>
          <select id="sortBy" value={sortBy} onChange={(e) => sortTasks(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="dueDate">Due Date</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="createdTime">Time Created</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div className="formaandlist">
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditClick}
        />
      </div>
    </Container>
  );
}

export default App;