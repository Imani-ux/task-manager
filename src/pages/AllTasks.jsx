// src/pages/AllTasks.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList'; // The component that renders items
import TaskTable from '../components/TaskTable';
import Filters from '../components/Filters';
import { parseISO } from 'date-fns';
import '../App.css';

const priorityOrder = { high: 3, medium: 2, low: 1 };

const AllTasks = () => {
  const { tasks, loading, error } = useTasks();
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'table'
  const [filters, setFilters] = useState({
    searchTerm: '',
    statusFilter: '',
    priorityFilter: '',
    sortOrder: 'createdAt_desc',
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: '',
      priorityFilter: '',
      sortOrder: 'createdAt_desc',
    });
  };

  const filteredAndSortedTasks = useMemo(() => {
    let processedTasks = [...tasks];

    // Filtering
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      processedTasks = processedTasks.filter(task =>
        task.title.toLowerCase().includes(term) ||
        (task.description && task.description.toLowerCase().includes(term))
      );
    }
    if (filters.statusFilter) {
      processedTasks = processedTasks.filter(task => task.status === filters.statusFilter);
    }
    if (filters.priorityFilter) {
      processedTasks = processedTasks.filter(task => task.priority === filters.priorityFilter);
    }

    // Sorting
    const [sortBy, sortDir] = filters.sortOrder.split('_');
    processedTasks.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'createdAt' || sortBy === 'dueDate') {
        valA = a[sortBy] ? parseISO(a[sortBy]).getTime() : (sortDir === 'asc' ? Infinity : -Infinity);
        valB = b[sortBy] ? parseISO(b[sortBy]).getTime() : (sortDir === 'asc' ? Infinity : -Infinity);
      } else if (sortBy === 'priority') {
        valA = priorityOrder[a.priority] || 0;
        valB = priorityOrder[b.priority] || 0;
      } else { // title
        valA = a.title.toLowerCase();
        valB = b.title.toLowerCase();
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return processedTasks;
  }, [tasks, filters]);


  if (loading) return <p className="loading">Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="page-container">
      <div className="flex-between page-header">
        <h1>All Tasks ({filteredAndSortedTasks.length})</h1>
        <div>
            <button
                onClick={() => setViewMode(viewMode === 'list' ? 'table' : 'list')}
                className="button-secondary"
                style={{marginRight: '10px'}}
            >
                Switch to {viewMode === 'list' ? 'Table' : 'List'} View
            </button>
            <Link to="/tasks/new" className="button-primary">Add New Task</Link>
        </div>
      </div>

      <Filters
        filterValues={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
      />

      {viewMode === 'list' ? (
        <TaskList tasks={filteredAndSortedTasks} />
      ) : (
        <TaskTable tasks={filteredAndSortedTasks} />
      )}
    </div>
  );
};

export default AllTasks;