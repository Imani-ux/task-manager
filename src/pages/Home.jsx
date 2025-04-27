import React from "react";
import TaskTable from "../components/TaskTable";
import TaskArticleList from "../components/TaskArticleList";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Home(){
   

    return (
        <div>
           <nav className="side-nav-bar">
                < NavLink to='/home/importantAndUrgent'>To Do</NavLink>
                <NavLink to='/home/important'>Important</NavLink>
                <NavLink to='/home/urgent'>Urgent</NavLink>
                <NavLink to='/home/others'>Others</NavLink>
            </nav>       
            <hr />     
            
            <Outlet/>
        </div>
    )
}

export default Home;