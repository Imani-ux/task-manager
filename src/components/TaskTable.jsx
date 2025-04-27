import React from "react";
import TaskList from "./TaskList";

function TaskTable(){
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>                        
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>                        
                    </tr>
                </thead>
                <tbody>                   
                    < TaskList/>
                </tbody>
            </table>
        </div>
    )
}

export default TaskTable;