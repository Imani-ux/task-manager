import React, { useContext, useState } from "react";
import { Form } from "react-router-dom";
import { TaskContext } from "../context/taskContext";

function TaskForm() {
    const {tasks, setTasks} = useContext(TaskContext);
    // function handling creation of a new form
    const [newTask, setNewTask] = useState('');
    const [deadline, setDeadline]  = useState('');
    const [type, setType] = useState('');

    // handling the submit
    function handleSubmit(event){
        event.preventDefault();
        console.log(newTask, deadline, type)
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "title": newTask,
                "dueDate": deadline,
                "completed": false,
                "type": type
            })
        })
        .then(res => res.json())
        .then(data => setTasks(tasks => [...tasks, data]))
        .catch(err => console.error(err))
    }
    return (
        <div className="form-container" onSubmit={handleSubmit}>
            <h2>Add New Task</h2>

            <form  >
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={newTask}
                    onChange={(event) => setNewTask(event.target.value)}
                    required
                />
                <br />
                <input
                    type="date"
                    name="dueDate"
                    value={deadline}
                    onChange={(event) => setDeadline(event.target.value)}
                    required
                />
                <br />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="#1">Important and urgent</option>
                    <option value="#2">Important and not urgent</option>
                    <option value="#3">Urgent and not important</option>
                    <option value="#4">Not Urgent and not important</option>
                </select>
                <button type="submit">Add Task</button>

            </form>
        </div>
    )
}


export default TaskForm;