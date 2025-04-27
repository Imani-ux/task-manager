// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllTasks from './pages/AllTasks';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import DailyTasks from './pages/DailyTasks';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/tasks/new" element={<CreateTask />} />
          <Route path="/tasks/edit/:taskId" element={<EditTask />} />
          <Route path="/tasks/daily" element={<DailyTasks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer>
        "Built by Sam with passion, refined by Imani with care, strengthened by Ian with vision, and polished by Brenda with heart."
      </footer>
    </>
  );
}

export default App;
