import React from "react";

function TaskArticle({task, number}){
    return (
        <article>
            <p>{number}</p>
            <h2>{task.title}</h2>
        </article>
    )
}

export default TaskArticle;