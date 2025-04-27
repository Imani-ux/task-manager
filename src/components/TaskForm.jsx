import React, { useState, useEffect } from 'react';
import { FormContainer, Title, Input, Button } from '../styles';

const TaskForm = ({ onAddTask, initialTask, isEditing, onCancelEdit }) => {
  const [task, setTask] = useState({ title: '', dueDate: '' });

  useEffect(() => {
    if (isEditing && initialTask) {
      setTask({ title: initialTask.title, dueDate: initialTask.dueDate });
    } else {
      setTask({ title: '', dueDate: '' });
    }
  }, [isEditing, initialTask]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onAddTask({
      ...task,
      completed: isEditing ? initialTask.completed : false,
      id: isEditing ? initialTask.id : crypto.randomUUID(), // 👈 Fixed here
    });
    setTask({ title: '', dueDate: '' });
    if (isEditing) {
      onCancelEdit();
    }
  };

  return (
    <FormContainer>
      <Title style={{ color: "white" }}>{isEditing ? 'Edit Task' : 'Add New Task'}</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          required
        />
        <Button type="submit">{isEditing ? 'Save Task' : 'Add Task'}</Button>
        {isEditing && (
          <Button type="button" onClick={onCancelEdit} style={{ backgroundColor: 'gray', marginLeft: '8px' }}>
            Cancel
          </Button>
        )}
      </form>
    </FormContainer>
  );
};

export default TaskForm;