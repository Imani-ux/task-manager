import React from "react";

function TaskItem({task, number}){
    // function to handle delete
    function handleDelete(id){
        console.log('You want to to delete', id);
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error(err))         
    }
    
    const date = new Date();
    return (
        <tr>
            <td>{number++}</td>
            <td>{task.title}</td>            
            <td>{task.dueDate}</td>
            <td>{task.completed ? "Done": "Pending"}</td>
            <td>
                <i className="fa fa-edit" style={{padding: '5px'}} ></i>
                <i className="fa fa-trash" onClick={() => handleDelete(task.id)} ></i>                
            </td>
        </tr>
    )
}

export default TaskItem;