import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import ManagerDashboard from './pages/ManagerDashboard/ManagerDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import './App.css';
import About from './components/About';
import Contact from './components/Contact'
import Tutors from './pages/ManagerDashboard/Tutors';
import Students from './pages/ManagerDashboard/Student'
import Classes from './pages/ManagerDashboard/Classes';
import BouncingDotsLoader from './BouncingDotsLoader';

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
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />  
        <Route path="/manager-dashboard/tutors" element={<Tutors />} />
        <Route path="/manager-dashboard/students" element={<Students />} />
        <Route path="/manager-dashboard/classes" element={<Classes />} />
        
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 

      </Routes>
      </RouteLoader>
    </Router>
  );
}

export default App;