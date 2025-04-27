
import React from 'react';
import '../App.css';

const Filters = ({ filterValues, onFilterChange, onClearFilters }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="searchTerm">Search Tasks</label>
        <input
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="Search by title or description..."
          value={filterValues.searchTerm}
          onChange={handleInputChange}
        />
      </div>
      <div className="filter-group">
        <label htmlFor="statusFilter">Status</label>
        <select
          id="statusFilter"
          name="statusFilter"
          value={filterValues.statusFilter}
          onChange={handleInputChange}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="priorityFilter">Priority</label>
        <select
          id="priorityFilter"
          name="priorityFilter"
          value={filterValues.priorityFilter}
          onChange={handleInputChange}
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="filter-group">
        <label htmlFor="sortOrder">Sort By</label>
        <select
          id="sortOrder"
          name="sortOrder"
          value={filterValues.sortOrder}
          onChange={handleInputChange}
        >
          <option value="createdAt_desc">Created Date (Newest)</option>
          <option value="createdAt_asc">Created Date (Oldest)</option>
          <option value="dueDate_asc">Due Date (Soonest)</option>
          <option value="dueDate_desc">Due Date (Latest)</option>
          <option value="priority_desc">Priority (High to Low)</option>
          <option value="priority_asc">Priority (Low to High)</option>
        </select>
      </div>
      <button onClick={onClearFilters} className="button-secondary">Clear Filters</button>
    </div>
  );
};

export default Filters;