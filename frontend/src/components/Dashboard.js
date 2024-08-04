import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="dashboard-content">
        <Outlet /> {/* This will render the nested routes */}
      </main>
    </div>
  );
};

export default Dashboard;
