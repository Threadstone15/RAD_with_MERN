import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes ,useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import TeacherDashboard from './pages/Tutor'; // Corrected path after moving it inside src/
import ManagerDashboard from './pages/ManagerDashboard';
import StudentDashboard from './pages/Student'; // Corrected path after moving it inside src/
import './App.css';
import About from './components/About';
import Contact from './components/Contact'
<<<<<<< Updated upstream
import Tutors from './pages/Tutor';
import Students from './pages/Student'
=======
import Tutors from './pages/ManagerDashboard/Tutors';
import Students from './pages/ManagerDashboard/Student'
import Classes from './pages/ManagerDashboard/Classes';
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/students" element={<Students />} />
=======
        
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 
        <Route path="/manager-dashboard/tutors" element={<Tutors />} />
        <Route path="/manager-dashboard/students" element={<Students />} />
        <Route path="/manager-dashboard/classes" element={<Classes />} />
        
>>>>>>> Stashed changes
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} /> {/* Route for teacher dashboard */}
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
      </RouteLoader>
    </Router>
  );
}

export default App;
