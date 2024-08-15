import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Container, ButtonBase, Button } from '@mui/material';
<<<<<<< Updated upstream:frontend/src/pages/ManagerDashboard.js
import Sidebar from '../components/Sidebar';
import AddStudentForm from '../popups/AddStudentForm';
import AddTeacherForm from '../popups/AddTutorForm';
import MarkAttendance from '../popups/MarkAttendance';
import { ManagerStatistics } from '../services/api';
=======
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import AddStudentForm from '../../popups/AddStudentForm';
import AddTeacherForm from '../../popups/AddTutorForm';
import MarkAttendance from '../../popups/MarkAttendance';
import { ManagerStatistics } from '../../services/api';
>>>>>>> Stashed changes:frontend/src/pages/ManagerDashboard/ManagerDashboard.js

const drawerWidth = 240;

const ManagerDashboard = () => {
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setAddTeacherOpen] = useState(false);
  const [isMarkAttendanceOpen, setMarkAttendanceOpen] = useState(false);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();  // H

  const handleOpenMarkAttendance = () => setMarkAttendanceOpen(true);
  const handleCloseMarkAttendance = () => setMarkAttendanceOpen(false);

  const handleCardClick = (path) => {
    navigate(path);  // Navigate to the specified path
  };


  const handleOpenAddStudent = () => setAddStudentOpen(true);
  const handleOpenAddTeacher = () => setAddTeacherOpen(true);
  const handleCloseAddStudent = () => setAddStudentOpen(false);
  const handleCloseAddTeacher = () => setAddTeacherOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ManagerStatistics();
        setStats(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Manager Dashboard
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={3}>
              <ButtonBase
                sx={{ width: '100%' }}
                onClick={() => handleCardClick('/manager-dashboard/students')}
              >
                <Card 
                  sx={{ 
                    width: '100%', 
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6
                    }
                  }}
                >
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
                onClick={() => handleCardClick('/manager-dashboard/tutors')}
              >
                <Card 
                  sx={{ 
                    width: '100%', 
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6
                    }
                  }}
                >
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
                <Card 
                  sx={{ 
                    width: '100%', 
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6
                    }
                  }}
                >
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
                <Card 
                  sx={{ 
                    width: '100%', 
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Fees Generated</Typography>
                    <Typography variant="h4">{stats.monthlyIncome}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddStudent}
            >
              Add Student
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddTeacher}
            >
              Add Teacher
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenMarkAttendance}
            >
              Mark Attendance
            </Button>
          </Box>
        </Container>

      {/* Form Components */}
      <AddStudentForm open={isAddStudentOpen} onClose={handleCloseAddStudent} />
      <AddTeacherForm open={isAddTeacherOpen} onClose={handleCloseAddTeacher} />
      <MarkAttendance open={isMarkAttendanceOpen} onClose={handleCloseMarkAttendance} />
    </Box>
    </div>
  );
};

export default ManagerDashboard;
