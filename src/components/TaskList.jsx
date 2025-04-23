import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks }) {
  if (!tasks.length) return <p>No tasks available.</p>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;