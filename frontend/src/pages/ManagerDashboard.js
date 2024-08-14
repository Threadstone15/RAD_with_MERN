import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Container, ButtonBase, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AddStudentForm from '../popups/AddStudentForm';
import AddTeacherForm from '../popups/AddTutorForm';
import MarkAttendance from '../popups/MarkAttendance';
import { ManagerStatistics } from '../services/api';

const drawerWidth = 240;

const ManagerDashboard = () => {
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setAddTeacherOpen] = useState(false);
  const [isMarkAttendanceOpen, setMarkAttendanceOpen] = useState(false);
  const [stats, setStats] = useState('');

  const handleOpenMarkAttendance = () => {
    setMarkAttendanceOpen(true);
  };
  
  const handleCloseMarkAttendance = () => {
    setMarkAttendanceOpen(false);
  };
  const handleCardClick = (type) => {
    console.log(`${type} card clicked`);
  };

  const handleOpenAddStudent = () => {
    setAddStudentOpen(true);
  };

  const handleOpenAddTeacher = () => {
    setAddTeacherOpen(true);
  };

  const handleCloseAddStudent = () => {
    setAddStudentOpen(false);
  };

  const handleCloseAddTeacher = () => {
    setAddTeacherOpen(false);
  };

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
          flexDirection: 'column',
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
            sx={{ flexWrap: 'wrap' }}
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

          {/* Buttons to trigger forms */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddStudent}
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            Add Student
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddTeacher}
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            Add Teacher
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenMarkAttendance}
            sx={{ mt: 4, alignSelf: 'center' }}
          >
            Mark Attendance
          </Button>
        </Container>
      </Box>

      {/* Form Components */}
      <AddStudentForm open={isAddStudentOpen} onClose={handleCloseAddStudent} />
      <AddTeacherForm open={isAddTeacherOpen} onClose={handleCloseAddTeacher} />
      <MarkAttendance open={isMarkAttendanceOpen} onClose={handleCloseMarkAttendance} />
    </Box>
  );
};

export default ManagerDashboard;
