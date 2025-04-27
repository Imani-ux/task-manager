import React, { useContext } from "react";
import { TaskContext } from "../context/taskContext";
import TaskArticleList from "../components/TaskArticleList";

function Urgent(){
    const {tasks} = useContext(TaskContext);
    const filter = tasks.filter(task => task.type === '#3')
    return(
        <div>
            <p>These are taks which are not important but urgent. </p>
            <p>You can delegate them as they do not require a specific skill set</p>
            <p>Your tasks include: </p>
            <TaskArticleList tasks={filter}/>
        </div>
    )
}

export default Urgent;