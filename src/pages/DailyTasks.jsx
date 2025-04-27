//This is the DailyTasks component that fetches and displays tasks due today.
import React, { useState, useEffect } from 'react';
import { getTasks } from '../api';
import { useNavigate } from 'react-router-dom';

function DailyTasks() {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(data => {
        const daily = data.filter(task => task.dueDate === today);
        setDailyTasks(daily);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [today]);

  const handleDone = async (taskId) => {
    try {
      const taskToUpdate = dailyTasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ completed: true }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task status');
        }

        // Update the local state
        setDailyTasks(dailyTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        ));
      }
    } catch (error) {
      console.error('Error marking task as done:', error);
      setError(error.message);
    }
  };

  const handleLater = async (taskId) => {
    try {
      const taskToUpdate = dailyTasks.find(task => task.id === taskId);
      if (taskToUpdate) {
        // Set the due date to the end of the current day (you can adjust the time as needed)
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const laterDueDate = endOfDay.toISOString().split('T')[0];

        const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dueDate: laterDueDate }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task due date');
        }


        setDailyTasks(dailyTasks.map(task =>
          task.id === taskId ? { ...task, dueDate: laterDueDate } : task
        ));
      }
    } catch (error) {
      console.error('Error marking task as later:', error);
      setError(error.message);
    }
  };

  const handlePostponed = (taskId) => {
    console.log(`Task ${taskId} marked as postponed`);
  };

  if (loading) return <p>Loading daily tasks...</p>;
  if (error) return <p>Error: {error}</p>;
  if (dailyTasks.length === 0) return <p>No tasks for today.</p>;

  return (
    <div>
      <h2>Daily Tasks for {today}</h2>
      {dailyTasks.map(task => (
        <div key={task.id} style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
          <h3>{task.title}</h3>
          <p>Due Date: {task.dueDate}</p>
          <button onClick={() => handleDone(task.id)}>Done</button>
          <button onClick={() => handleLater(task.id)}>Later</button>
          <button onClick={() => handlePostponed(task.id)}>Postponed</button>
        </div>
      ))}
      <button onClick={() => navigate('/')}>Back to All Tasks</button>
    </div>
  );
}

export default DailyTasks;