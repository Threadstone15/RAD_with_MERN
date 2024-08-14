import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import TeacherDashboard from './pages/Teacher'; // Corrected path after moving it inside src/
import ManagerDashboard from './pages/ManagerDashboard';
import StudentDashboard from './pages/Student'; // Corrected path after moving it inside src/
import './App.css';
import About from './components/About';
import Contact from './components/Contact'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> {/* Route for teacher dashboard */}
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
