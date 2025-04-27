import React from 'react';
import TaskItem from './TaskItem';
import '../App.css';

const TaskList = ({ tasks }) => {
  if (!tasks || tasks.length === 0) {
    return <p className="task-list-empty">No tasks found. Try adjusting your filters or create a new task!</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;