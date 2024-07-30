import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Navbar from './components/Navbar'; // Import the Navbar component

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post('/create', formData);
      console.log('Response:', data);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
    }
  };

  const getFetchData = async () => {
    try {
      const data = await axios.get('/');
      console.log('Fetch Data:', data);
      if (data.data.success) {
        setDataList(data.data.data);
        alert(data.data.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  return (
    <Router>
      <Navbar /> {/* Include the Navbar */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/"
          element={
            <div className="container">
              <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
              {addSection && (
                <div className="addContainer">
                  <div className="close-btn" onClick={() => setAddSection(false)}><MdClose /></div>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" id="name" onChange={handleOnChange} value={formData.name} />

                    <label htmlFor="email">Email :</label>
                    <input type="email" name="email" id="email" onChange={handleOnChange} value={formData.email} />

                    <label htmlFor="mobile">Mobile :</label>
                    <input type="number" name="mobile" id="mobile" onChange={handleOnChange} value={formData.mobile} />

                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
