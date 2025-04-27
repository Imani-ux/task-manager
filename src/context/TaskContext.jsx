import React from "react";
import { useState, useEffect } from "react";

// Creating the context
const TaskContext = React.createContext();

// Creating a provider component
function TaskProvider({children}){
    const [tasks, setTasks] = useState([]);
        useEffect(() => {
            fetch('http://localhost:3000/tasks')
            .then(res => res.json())
            .then(data => {            
                setTasks(data);
                
            })
            .catch(err => console.error(err))
        
               
        }, [tasks])

    return <TaskContext.Provider value={{tasks, setTasks}}>{children}</TaskContext.Provider>
}

export {TaskContext, TaskProvider};