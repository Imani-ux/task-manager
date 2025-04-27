import React, { useContext, useEffect, useState } from "react";
import TaskArticle from "./TaskArticle";
import { TaskContext } from "../context/taskContext";


function TaskArticleList({tasks}){
    
    if(!tasks){
        return <p>Loading...</p>
    }
    return (
        <>
           {tasks.map((task, index) => {
               return <TaskArticle key={task.id} task={task} number={index + 1}/>
            })}
        </>
    )
}

export default TaskArticleList;