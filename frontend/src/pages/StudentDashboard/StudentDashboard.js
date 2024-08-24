import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';
import StudentSidebar from '../StudentDashboard/StudentSidebar';
import { fetchHash, startPayment } from './paymentService';
import AttendanceGraph from './AttendanceGraph';
import { fetchClasses_id } from '../../services/api'; // Import the function to fetch classes

const StudentPage = () => {
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [student, setStudent] = useState({
    name: 'Student',
    email: 'john.doe@example.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    courses: [
      { id: 1, name: 'Math 101', amount: 1000 },
      { id: 2, name: 'Physics 201', amount: 1500 },
    ],
    registeredClasses: ['Math 101', 'Physics 201'],
  });

  useEffect(() => {
    const fetchStudentClasses = async () => {
      try {
        const studentID = localStorage.getItem('studentID');
        console.log("Got ID", studentID); // Retrieve studentID from localStorage
        if (studentID) {
          const response = await fetchClasses_id(studentID);
          if (response.data) {
            setClasses(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchStudentClasses();

    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (course) => {
    const studentDetails = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      address: student.address,
      city: student.city,
      country: student.country,
    };

    setLoading(true);
    try {
      const hash = await fetchHash(`Order${course.id}`, course.amount, 'LKR');
      await startPayment(course, studentDetails, hash);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalAmountPaid = student.courses.reduce((total, course) => total + course.amount, 0);

  return (
    <div style={{ display: 'flex' }}>
      <StudentSidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {student.name}
        </Typography>

        <Grid container spacing={2}>
          {/* Left side: Your Courses */}
          <Grid item xs={12} sm={6}>
            <Card style={{ marginBottom: '20px', height: '450px' }}>
              <CardContent style={{ overflowY: 'auto', height: '100%' }}>
                <Typography variant="h5" gutterBottom>
                  Your Courses
                </Typography>
                {student.courses.map(course => (
                  <Card key={course.id} style={{ marginBottom: '10px' }}>
                    <CardContent>
                      <Typography variant="h6">{course.name}</Typography>
                      <Typography variant="body2">LKR {course.amount}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => handlePayment(course)} disabled={loading} variant="contained">
                        {loading ? 'Processing...' : 'Pay Now'}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right side: Total Amount Paid and Attendance */}
          <Grid item xs={12} sm={6}>
            <Card style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Total Amount Paid
                </Typography>
                <Typography variant="h6">
                  LKR {totalAmountPaid}
                </Typography>
              </CardContent>
            </Card>

            <Card style={{ marginBottom: '20px', height: '250px' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Attendance
                </Typography>
                <AttendanceGraph />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Below: Class Timetable */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
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
                  {classes.map((entry, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: student.registeredClasses.includes(entry.className)
                          ? 'rgba(0, 123, 255, 0.1)'
                          : 'inherit',
                        '&:hover': {
                          backgroundColor: student.registeredClasses.includes(entry.className)
                            ? 'rgba(0, 123, 255, 0.2)'
                            : 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {entry.schedule?.days?.join(', ') || 'N/A'}
                      </TableCell>
                      <TableCell align="center">{entry.schedule?.time || 'N/A'}</TableCell>
                      <TableCell align="center">{entry.className || 'N/A'}</TableCell>
                      <TableCell align="center">{entry.TeacherID || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPage;
