import React, { useContext, useEffect, useState } from "react";
import TaskItem from "./TaskItem";

import { TaskContext } from "../context/taskContext";

function TaskList(){
   
   const {tasks} =useContext(TaskContext);

    if(!tasks){
        return <p>Empty data set</p>
    }
    return (
        <>
        
        {tasks.map((task, index) => {
            
            return < TaskItem key={task.id} task={task} number={index +1}/>
})}
        </>
    )
}

export default TaskList;