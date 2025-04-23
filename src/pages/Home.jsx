import React, { useEffect, useState } from 'react';
import { getTasks } from '../api';
import TaskList from '../components/TaskList';

function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>All Tasks</h2>
      <TaskList tasks={tasks} />
    </div>
  );
}

export default AllTasks;