<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import TaskTable from './TaskTable';
import { TableContainer, SearchBar, SearchInput } from '../styles';

const TaskList = ({ tasks, onDeleteTask }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchTerm]);

  return (
    <TableContainer>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>
      <TaskTable tasks={filteredTasks} onDeleteTask={onDeleteTask} />
    </TableContainer>
  );
};

export default TaskList;
=======
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
>>>>>>> 62ec26cc49834a909b3652548f49a092adde058d
