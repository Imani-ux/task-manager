import React from "react";
import Navbar from "./components/NavBar";
import './App.css';
import { Outlet } from "react-router-dom";

function App(){
  return (
    <>
    <header>
      < Navbar/>
      
      <div>
        <h2 className="main-heading">Task Manager</h2>
      </div>      
    </header>
      <Outlet/>

    </>
  )
}

export default App;