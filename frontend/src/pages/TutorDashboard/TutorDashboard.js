import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, MenuItem } from '@mui/material';
import TutorSidebar from "./TutorSidebar";
import axios from 'axios';

const TutorPage = () => {

  const [classes, setClasses] = useState([]);
  const [classTimetable, setClassTimetable] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(''); // New state for teacher filter

  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  useEffect(() => {

    const fetchData = async () => {
      try {
        const classResponse = await axios.get('http://localhost:5000/teacher-dashboard/classes-with-teachers');
        console.log('Class Response Data:', classResponse.data);
 
        const classData = classResponse.data;
        setClasses(classData);
    
        const formattedTimetable = classData.map((classEntry) => {
          return classEntry.schedule?.days?.map((day) => ({
            day,
            time: classEntry.schedule.time,
            subject: classEntry.className,
            teacher: classEntry.TeacherID?.profile?.name || 'Unknown',
          })) || [];
        }).flat();
    
        console.log('Formatted Timetable:', formattedTimetable);
    
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

  const handleTeacherChange = (event) => {
    setSelectedTeacher(event.target.value); // Update the teacher filter
  };

  // Filter the timetable based on the selected teacher
  const filteredTimetable = classTimetable.filter((entry) => {
    return !selectedTeacher || entry.teacher === selectedTeacher;
  });

  // Get unique teacher names for the filter dropdown
  const uniqueTeachers = [...new Set(classTimetable.map((entry) => entry.teacher))];

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

              {/* Teacher Filter */}
              <TextField
                select
                label="Filter by Teacher"
                value={selectedTeacher}
                onChange={handleTeacherChange}
                fullWidth
                style={{ marginBottom: '20px' }}
              >
                <MenuItem value="">All Teachers</MenuItem>
                {uniqueTeachers.map((teacher, index) => (
                  <MenuItem key={index} value={teacher}>
                    {teacher}
                  </MenuItem>
                ))}
              </TextField>

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
                    {filteredTimetable.map((entry, index) => (
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
      </div>
    </div>
  );
};

export default TutorPage;
