// src/pages/DailyTasks.jsx
import React, { useMemo, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import { isToday, isThisWeek, parseISO, startOfToday } from 'date-fns';
import '../App.css';

const DailyTasks = () => {
  const { tasks, loading, error } = useTasks();
  const [view, setView] = useState('today'); // 'today', 'week', 'upcoming'

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    const today = startOfToday();

    return tasks.filter(task => {
        if (task.status === 'completed') return false; // Exclude completed tasks
        if (!task.dueDate) return false; // Exclude tasks without due date

        const dueDate = parseISO(task.dueDate);
        if (view === 'today') return isToday(dueDate);
        if (view === 'week') return isThisWeek(dueDate, { weekStartsOn: 1 }); // Monday start
        // if (view === 'upcoming') return !isPast(dueDate) || isToday(dueDate); // Could add more complex logic for upcoming
        return true; // Default or if view is not matched (though UI limits this)
    }).sort((a,b) => parseISO(a.dueDate) - parseISO(b.dueDate)); // Sort by due date
  }, [tasks, view]);

  if (loading) return <p className="loading">Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

  const getTitle = () => {
      if (view === 'today') return "Tasks Due Today";
      if (view === 'week') return "Tasks Due This Week";
      return "Upcoming Tasks";
  }

  return (
    <div className="page-container">
      <div className="flex-between page-header">
        <h1>{getTitle()} ({filteredTasks.length})</h1>
        <div className="view-selector">
            <button onClick={() => setView('today')} className={`button-secondary ${view === 'today' ? 'active' : ''}`} style={{marginRight:'5px'}}>Today</button>
            <button onClick={() => setView('week')} className={`button-secondary ${view === 'week' ? 'active' : ''}`}>This Week</button>
            {/* <button onClick={() => setView('upcoming')} className={`button-secondary ${view === 'upcoming' ? 'active' : ''}`}>Upcoming</button> */}
        </div>
      </div>
      <TaskList tasks={filteredTasks} />
    </div>
  );
};

export default DailyTasks;