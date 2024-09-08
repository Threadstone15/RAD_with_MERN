import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, MenuItem } from '@mui/material';
import TutorSidebar from "./TutorSidebar"; // Import Sidebar
import { fetchTutorData } from '../../services/api'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TutorPage = () => {

  const navigate = useNavigate();
  const tutorID = localStorage.getItem('teacherID');
  if(!tutorID) {
    navigate('/login');
  }

  const [tutor, setTutor] = useState({
    profile: { Name: '' },
    classIds: [],
    registeredClasses: [],
  });

  const [classes, setClasses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [classTimetable, setClassTimetable] = useState([]);
  const [stats, setStats] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {

        console.log('Started Fetching');
        const classResponse = await axios.get("http://localhost:5000/tutor-dashboard/classes-with-teachers");

        const classData = classResponse.data;

        const formattedTimetable = classData.map((classEntry) => {
          return classEntry.schedule.days.map((day) => ({
            day,
            time: classEntry.schedule.time,
            subject: classEntry.className,
            teacher: classEntry.TeacherID?.profile?.name || 'Unknown',
          }));
        }).flat();

        setClassTimetable(formattedTimetable);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
        <Grid item xs={12}>
          <Card
            sx={{
              width: '100%',
              boxShadow: 3,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Class Timetable
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="class timetable">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Subject</TableCell>
                      <TableCell align="center">Teacher</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classTimetable.map((entry, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          backgroundColor: entry.day === currentDay ? 'rgba(0, 123, 255, 0.1)' : 'inherit',
                          '&:hover': {
                            backgroundColor: entry.day === currentDay ? 'rgba(0, 123, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
                          },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {entry.day}
                        </TableCell>
                        <TableCell align="center">{entry.time}</TableCell>
                        <TableCell align="center">{entry.subject}</TableCell>
                        <TableCell align="center">{entry.teacher}</TableCell>
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
