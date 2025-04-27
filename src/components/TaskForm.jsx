
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { format } from 'date-fns';
import '../App.css';

const TaskForm = ({ taskToEdit }) => {
  const navigate = useNavigate();
  const { addTask, updateTask, loading, error, setError } = useTasks();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate ? format(new Date(taskToEdit.dueDate), 'yyyy-MM-dd') : '',
        priority: taskToEdit.priority,
        status: taskToEdit.status,
      });
    } else {
      setFormData(prev => ({
        ...prev,
        title: '',
        description: '',
        dueDate: format(new Date(), 'yyyy-MM-dd'),
        priority: 'medium',
        status: 'pending',
      }));
    }
    setError(null);
    setFormErrors({});
  }, [taskToEdit, setError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({...prev, [name]: null}));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required.';
    if (!formData.dueDate) errors.dueDate = 'Due date is required.';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError(null);
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, formData);
        navigate('/tasks'); 
      } else {
        await addTask(formData);
        navigate('/tasks');
      }
    } catch (err) {
      console.error("Form submission error:", err)
      
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
      {error && <p className="error" style={{textAlign: 'center', marginBottom: '15px'}}>{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          aria-invalid={!!formErrors.title}
          aria-describedby={formErrors.title ? "title-error" : undefined}
        />
        {formErrors.title && <p id="title-error" role="alert" style={{color: 'red', fontSize: '0.9em', marginTop: '-10px', marginBottom: '10px'}}>{formErrors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          aria-invalid={!!formErrors.dueDate}
          aria-describedby={formErrors.dueDate ? "dueDate-error" : undefined}
        />
        {formErrors.dueDate && <p id="dueDate-error" role="alert" style={{color: 'red', fontSize: '0.9em', marginTop: '-10px', marginBottom: '10px'}}>{formErrors.dueDate}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="button" className="button-secondary" onClick={() => navigate(-1)} disabled={loading}>
          Cancel
        </button>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? (taskToEdit ? 'Updating...' : 'Saving...') : (taskToEdit ? 'Update Task' : 'Save Task')}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;