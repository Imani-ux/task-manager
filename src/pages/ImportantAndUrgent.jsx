import React, { useContext } from "react";
import { TaskContext } from "../context/taskContext";
import TaskArticleList from "../components/TaskArticleList";

function ImportantAndUrgent(){
    const {tasks} = useContext(TaskContext);
        const filter = tasks.filter(task => task.type === '#1')
    return(
        <div>
            <h4>Therse are tasks which are urgent and important requiring your immediate action.</h4>
            <p>You must do them, the deadline is near, the consequences are high.</p>
            <p>Your tasks include: </p>
            <TaskArticleList tasks={filter}/>
        </div>
    )
}

export default ImportantAndUrgent;