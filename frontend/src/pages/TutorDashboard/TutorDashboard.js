import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, MenuItem } from '@mui/material';
import TutorSidebar from "./TutorSidebar"; // Import Sidebar
import { fetchTutorData } from '../../services/api'; 
import { useNavigate } from 'react-router-dom';

const TutorPage = () => {

  const navigate = useNavigate();
  const tutorID = localStorage.getItem('teacherID');
  if(!tutorID) {
    navigate('/login');
  }

  const [tutor, setTutor] = useState({
    profile: {Name: '',},
    classIds: [],
    registeredClasses: [],
  });

  useEffect(() => {
    const fetchTutorDetails = async () => {
      console.log("Fetching tutor details for tutorID:", tutorID);
      try {
        if (tutorID) {
          const response = await fetchTutorData(tutorID);
          console.log("Response from fetchTeacherData:", response);
          if (response) {
            setTutor(response);
            console.log("Student state updated:", tutor);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchTutorDetails();

    
  }, []);

  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    // Simulating API calls with dummy data
    const dummyClasses = [
      { schedule: { days: ['Monday', 'Wednesday'], time: '10:00 AM - 12:00 PM' }, className: 'Math 101', classID: 'C1' },
      { schedule: { days: ['Tuesday', 'Thursday'], time: '2:00 PM - 4:00 PM' }, className: 'Physics 201', classID: 'C2' },
    ]

    const dummyPayments = [
      { date: '2024-08-01', student: 'John Doe', amount: 15000, class: 'Math 101' },
      { date: '2024-08-05', student: 'Jane Smith', amount: 15000, class: 'Physics 201' },
      // Add more dummy data as needed
    ];

    setClasses(dummyClasses);
    setPayments(dummyPayments);
  }, []);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const filteredPayments = payments.filter(payment => {
    return (
      (!selectedMonth || payment.date.startsWith(selectedMonth)) &&
      (!selectedStudent || payment.student === selectedStudent) &&
      (!selectedClass || payment.class === selectedClass)
    );
  });

  return (
    <div style={{ display: 'flex' }}>
      <TutorSidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Tutor
        </Typography>

      

          {/* Right side: Class Timetable */}
          <Grid item xs={12} sm={6} md={8}>
            <Card style={{ marginBottom: '20px', height: '450px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Class Timetable
                </Typography>
                <TableContainer component={Paper} style={{ maxHeight: '350px' }}>
                  <Table stickyHeader aria-label="class timetable">
                    <TableHead>
                      <TableRow>
                        <TableCell>Day</TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Subject</TableCell>
                        <TableCell align="center">Class</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classes.map((entry, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            backgroundColor: 'rgba(0, 123, 255, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {entry.schedule?.days?.join(', ') || 'N/A'}
                          </TableCell>
                          <TableCell align="center">{entry.schedule?.time || 'N/A'}</TableCell>
                          <TableCell align="center">{entry.className || 'N/A'}</TableCell>
                          <TableCell align="center">{entry.classID || 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Filter Options */}
          <Grid item xs={12}>
            <Card style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Filter Payments
                </Typography>
                <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Month"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                      fullWidth
                    >
                      <MenuItem value="">All Months</MenuItem>
                      <MenuItem value="2024-08">August 2024</MenuItem>
                      <MenuItem value="2024-09">September 2024</MenuItem>
                      {/* Add more months as needed */}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Student"
                      value={selectedStudent}
                      onChange={handleStudentChange}
                      fullWidth
                    >
                      <MenuItem value="">All Students</MenuItem>
                      {payments.map((payment, index) => (
                        <MenuItem key={index} value={payment.student}>
                          {payment.student}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      select
                      label="Class"
                      value={selectedClass}
                      onChange={handleClassChange}
                      fullWidth
                    >
                      <MenuItem value="">All Classes</MenuItem>
                      {classes.map((entry, index) => (
                        <MenuItem key={index} value={entry.className}>
                          {entry.className}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                {/* Payment Table */}
                <TableContainer component={Paper}>
                  <Table aria-label="payments table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell align="center">Student</TableCell>
                        <TableCell align="center">Class</TableCell>
                        <TableCell align="center">Amount (LKR)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredPayments.map((payment, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {payment.date}
                          </TableCell>
                          <TableCell align="center">{payment.student}</TableCell>
                          <TableCell align="center">{payment.class}</TableCell>
                          <TableCell align="center">{payment.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
      </div>
    </div>
  );
};

export default TutorPage;
