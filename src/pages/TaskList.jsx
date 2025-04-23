import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from '../components/TaskItem';

const TaskList = () => {
  const { tasks } = useContext(TaskContext);
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div>
      <h1>All Tasks</h1>
      {pendingTasks.length === 0 ? (
        <p>No pending tasks.</p>
      ) : (
        pendingTasks.map(task => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;