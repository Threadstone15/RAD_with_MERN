import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  ButtonBase,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import AddStudentForm from "../../popups/AddStudentForm";
import AddTeacherForm from "../../popups/AddTutorForm";
import MarkAttendance from "../../popups/MarkAttendance";
import axios from "axios";

const drawerWidth = 240;

const ManagerDashboard = () => {
  const [isAddStudentOpen, setAddStudentOpen] = useState(false);
  const [isAddTeacherOpen, setAddTeacherOpen] = useState(false);
  const [isMarkAttendanceOpen, setMarkAttendanceOpen] = useState(false);
  const [stats, setStats] = useState({});
  const [classTimetable, setClassTimetable] = useState([]);
  const navigate = useNavigate();

  const handleOpenMarkAttendance = () => setMarkAttendanceOpen(true);
  const handleCloseMarkAttendance = () => setMarkAttendanceOpen(false);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleOpenAddStudent = () => setAddStudentOpen(true);
  const handleOpenAddTeacher = () => setAddTeacherOpen(true);
  const handleCloseAddStudent = () => setAddStudentOpen(false);
  const handleCloseAddTeacher = () => setAddTeacherOpen(false);

  const currentDay = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classResponse = await axios.get(
          "http://localhost:5000/manager-dashboard/classes-with-teachers"
        );
        const ManagerStatistics = await axios.get(
          "http://localhost:5000/manager-dashboard/"
        );
        setStats(ManagerStatistics.data);

        const classData = classResponse.data;

        const formattedTimetable = classData
          .map((classEntry) => {
            return classEntry.schedule.days.map((day) => ({
              day,
              time: classEntry.schedule.time,
              subject: classEntry.className,
              teacher: classEntry.TeacherID?.profile?.name || "Unknown",
            }));
          })
          .flat();

        setClassTimetable(formattedTimetable);
      } catch (error) {
        console.error("Error fetching data:", error);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
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
                sx={{ width: "100%" }}
                onClick={() => handleCardClick("/manager-dashboard/students")}
              >
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
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
                sx={{ width: "100%" }}
                onClick={() => handleCardClick("/manager-dashboard/tutors")}
              >
                <Card
                  sx={{
                    width: "100%",
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Number of Tutors</Typography>
                    <Typography variant="h4">{stats.TeacherCount}</Typography>
                  </CardContent>
                </Card>
              </ButtonBase>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  width: "100%",
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
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
                              backgroundColor:
                                entry.day === currentDay
                                  ? "rgba(0, 123, 255, 0.1)"
                                  : "inherit",
                              "&:hover": {
                                backgroundColor:
                                  entry.day === currentDay
                                    ? "rgba(0, 123, 255, 0.2)"
                                    : "rgba(0, 0, 0, 0.04)",
                              },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {entry.day}
                            </TableCell>
                            <TableCell align="center">{entry.time}</TableCell>
                            <TableCell align="center">
                              {entry.subject}
                            </TableCell>
                            <TableCell align="center">
                              {entry.teacher}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}
          >
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
        <AddStudentForm
          open={isAddStudentOpen}
          onClose={handleCloseAddStudent}
        />
        <AddTeacherForm
          open={isAddTeacherOpen}
          onClose={handleCloseAddTeacher}
        />
        <MarkAttendance
          open={isMarkAttendanceOpen}
          onClose={handleCloseMarkAttendance}
        />
      </Box>
    </div>
  );
};

export default ManagerDashboard;
