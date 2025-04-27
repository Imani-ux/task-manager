import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { format, parseISO } from 'date-fns';
import '../App.css';

const EditIcon = () => <span role="img" aria-label="edit">✏️</span>;
const DeleteIcon = () => <span role="img" aria-label="delete">🗑️</span>;

const TaskTable = ({ tasks }) => {
  const { removeTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await removeTask(id);
    }
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    await updateTask(task.id, { ...task, status: newStatus });
  };

  if (!tasks || tasks.length === 0) {
    return <p className="task-list-empty">No tasks to display in table view.</p>;
  }

  return (
    <div className="task-table-container">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className={task.status === 'completed' ? 'completed' : ''}>
              <td className={`task-title-table ${task.status === 'completed' ? 'completed' : ''}`}>
                {task.title}
              </td>
              <td>
                {task.dueDate ? format(parseISO(task.dueDate), 'MMM d, yyyy') : 'N/A'}
              </td>
              <td>
                <span className={`priority-badge priority-${task.priority}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <span
                  className={`status-badge status-${task.status}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleToggleStatus(task)}
                  title={`Click to toggle status (current: ${task.status})`}
                >
                  {task.status.replace('-', ' ')}
                </span>
              </td>
              <td className="actions-cell">
                <button
                  onClick={() => navigate(`/tasks/edit/${task.id}`)}
                  className="button-secondary button-icon"
                  title="Edit Task"
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(task.id, task.title)}
                  className="button-danger button-icon"
                  title="Delete Task"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;