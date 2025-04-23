import React from 'react';

function TaskItem({ task }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '0.5rem 0', padding: '0.5rem' }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <small>Due: {task.dueDate}</small>
    </div>
  );
}

export default TaskItem;