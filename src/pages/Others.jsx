import React, { useContext } from "react";
import { TaskContext } from "../context/taskContext";
import TaskArticleList from "../components/TaskArticleList";

function Others(){
    const {tasks} = useContext(TaskContext);
    const filter = tasks.filter(task => task.type === '#4')
    return(
        <div>
            <p>These taks are neither important nor urgent</p>
            <p>You can delete them, they are distractions and unnecessary tasks</p>
            <p>Your tasks include: </p>
            <TaskArticleList tasks={filter}/>
            <p></p>
        </div>
    )
}

export default Others;