import React, { useState } from 'react';
import { FormContainer, Title, Input, Button } from '../styles';

const TaskForm = ({ onAddTask }) => {
  const [task, setTask] = useState({ title: '', dueDate: '' });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onAddTask({ ...task, completed: false });
    setTask({ title: '', dueDate: '' });
  };

  return (
    <FormContainer>
      <Title style={{ color: "white" }}>Add New Task</Title>
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
        <Button type="submit">Add Task</Button>
      </form>
    </FormContainer>
  );
};

export default TaskForm;
