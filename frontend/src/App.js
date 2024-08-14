import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import TeacherDashboard from './pages/Teacher';
import ManagerDashboard from './pages/ManagerDashboard';
import StudentDashboard from './pages/Student';
import About from './components/About';
import Contact from './components/Contact';
import Tutors from './pages/Tutors';
import Students from './pages/Students';
import BouncingDotsLoader from './BouncingDotsLoader';
import './App.css';

// Component to manage route changes and show loader
function RouteLoader({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the timing to your needs

    return () => clearTimeout(timer);
  }, [location]);

  return loading ? <BouncingDotsLoader /> : children;
}

function App() {
  return (
    <Router>
      <RouteLoader>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/student-dashboard" element={<Students />} />
          <Route path="/payments" element={<StudentDashboard />} />
        </Routes>
      </RouteLoader>
    </Router>
  );
}

export default App;
