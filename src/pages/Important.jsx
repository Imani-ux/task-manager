import React, { useContext } from "react";
import { TaskContext } from "../context/taskContext";
import TaskArticleList from "../components/TaskArticleList";

function Important(){
    const {tasks} = useContext(TaskContext);
    const filter = tasks.filter(task => task.type === '#2')
    return(
        <div>
            <p>These are very important tasks but they are not urgent.</p>
            <p>You can schedule them as they contribute to long time success.</p>
            <p>Your tasks include: </p>
            <TaskArticleList tasks={filter}/>
        </div>
    )
}

export default Important;