import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Container, ButtonBase, Button } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar component is imported
import AddStudentForm from '../popups/AddStudentForm'; // Import the AddStudentForm component

const drawerWidth = 240;

const ManagerDashboard = () => {
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);

  const handleCardClick = (type) => {
    // Handle card click event
    console.log(`${type} card clicked`);
  };

  const handleOpenAddStudent = () => {
    setAddStudentOpen(true);
  };

  const handleCloseAddStudent = () => {
    setAddStudentOpen(false);
  };

  // Dummy data for the dashboard
  const stats = {
    students: 200,
    tutors: 50,
    unpaidStudents: 30,
    feesGenerated: '$50,000',
  };

  return (
<div><Sidebar/>
<Box
    component="main"
    sx={{
    flexGrow: 1,
    p: 3,
    ml: `${drawerWidth}px`, // Offset the main content to make space for the sidebar
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center', // Center horizontally
}}
>
<Container>
      <Typography variant="h4" gutterBottom align="center">
        Student Management
      </Typography>
      <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddStudent}
          sx={{ mt: 4 }}>
          Add Student
        </Button>
      <AddStudentForm open={isAddStudentOpen} onClose={handleCloseAddStudent} />
</Container>
</Box>
</div>

);
};
export default ManagerDashboard;

