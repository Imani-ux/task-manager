import React from "react";
import Navbar from "./components/NavBar";
import './App.css';
import { Outlet } from "react-router-dom";

function App(){

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
    <>
    <header>
      < Navbar/>
      
      <div>
        <h2 className="main-heading">Task Manager</h2>
      </div>      
    </header>
      <Outlet/>

    </>
  )
}

export default App;