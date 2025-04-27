// src/pages/EditTask.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TaskContext';
import '../App.css';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { currentTask, fetchTaskById, loading, error, setCurrentTask } = useTasks();

  useEffect(() => {
    fetchTaskById(taskId);
    // Cleanup function to clear currentTask when component unmounts
    return () => {
      setCurrentTask(null);
    };
  }, [taskId, fetchTaskById, setCurrentTask]);

  if (loading && !currentTask) return <p className="loading">Loading task details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!currentTask && !loading) {
    // Could be that task ID is invalid or fetch failed for other reasons
    // setTimeout(() => navigate('/tasks'), 3000); // Redirect after a delay
    return (
        <div className="page-container container">
            <h2>Task Not Found</h2>
            <p>The task you are trying to edit does not exist or could not be loaded.</p>
            <button onClick={() => navigate('/tasks')} className="button-primary">Back to All Tasks</button>
        </div>
    );
  }

  return (
    <div className="page-container">
      {/* <h1>Edit Task</h1> */}
      {currentTask && <TaskForm taskToEdit={currentTask} />}
    </div>
  );
};

export default EditTask;