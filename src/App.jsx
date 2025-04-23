import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import CreateTask from './pages/CreateTask';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/create" element={<CreateTask />} />
      </Routes>
    </>
  );
}

export default App;
