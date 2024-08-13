import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Container, ButtonBase, Button } from '@mui/material';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar component is imported
import AddStudentForm from '../popups/AddStudentForm'; // Import the AddStudentForm component
import { ManagerStatistics } from '../services/api';


const drawerWidth = 240;

const ManagerDashboard = () => {
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [stats, setStats] = useState('');

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

  useEffect(() => {
    // Fetch data on component mount
    const fetchData = async () => {
      try {
        const result = await ManagerStatistics();
        console.log(stats);
        setStats(result);
      } catch (error) {

      }
    };

    fetchData();
    console.log(stats);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          display: 'flex',
          flexDirection: 'column', // Added to allow for column layout
          minHeight: '100vh',
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Manager Dashboard
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
            sx={{ flexWrap: 'wrap' }} // Ensure cards wrap properly
          >
            <Grid item xs={12} sm={6} md={3}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleCardClick('Students')}
              >
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">Number of Students</Typography>
                    <Typography variant="h4">{stats.StudentCount}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleCardClick('Tutors')}
              >
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">Number of Tutors</Typography>
                    <Typography variant="h4">{stats.TeacherCount}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleCardClick('Unpaid Students')}
              >
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">Unpaid Students</Typography>
                    <Typography variant="h4">{stats.notPaid}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleCardClick('Fees Generated')}
              >
                <Card sx={{ width: '100%' }}>
                  <CardContent>
                    <Typography variant="h6">Fees Generated</Typography>
                    <Typography variant="h4">{stats.monthlyIncome}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          </Grid>

          {/* Button to trigger AddStudentForm */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddStudent}
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            Add Student
          </Button>
        </Container>
      </Box>

      {/* AddStudentForm Component */}
      <AddStudentForm open={isAddStudentOpen} onClose={handleCloseAddStudent} />
    </Box>
  );
};


export default ManagerDashboard;
