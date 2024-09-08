import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableCell, TextField, MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AddStudentForm from "../../popups/AddStudentForm";
import StudentDetails from "../../popups/StudentDetails";
import axios from "axios";

const drawerWidth = 240;

const Students = () => {
  const [open, setOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mediumFilter, setMediumFilter] = useState("");
  const [refresh, setRefresh] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setRefresh((prev) => !prev);
  };

  const handleStudentUpdate = () => {
    setRefresh((prev) => !prev);
    setOpen(false);
    setDetailsOpen(false)
    setSnackbarMessage("Student updated successfully!");
      setSnackbarSeverity("success");
    setSnackbarOpen(true);

  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const handleAddStudent = () => {
    setSelectedStudent(null);
    handleOpen();
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        console.log("Fetching data")
        const response = await axios.get('http://localhost:5000/manager-dashboard/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [refresh]);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const tableContainerRef = useRef(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tableContainerRef.current.offsetLeft);
    setScrollLeft(tableContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tableContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiply for faster scroll
    tableContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.profile.Name.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    const matchesMedium =
      mediumFilter === "" || student.profile.Medium === mediumFilter;

    return matchesSearch && matchesMedium;
  });


  return (
    <div>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Student Management
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              width: "100%",
            }}>
            <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
              <TextField
                label="Search by Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 2, height: "56px" }}
              />

              <TextField
                select
                label="Filter by Medium"
                value={mediumFilter}
                onChange={(e) => setMediumFilter(e.target.value)}
                sx={{ flexGrow: 1, height: "56px" }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Sinhala">Sinhala</MenuItem>
              </TextField>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddStudent}
              sx={{ ml: 1, width: "15%", height: "56px" }}
            >

              Add Student
            </Button>
          </Box>


              <Card
                sx={{
                  width: "100%",
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.005)",
                    boxShadow: 6,
                  },
                }}
              >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Students List
              </Typography>
              <TableContainer component={Paper} sx={{ overflowX: "auto" }} ref={tableContainerRef} onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ cursor: isDragging ? "grabbing" : "grab" }}>
                <Table aria-label="students table" sx={{ minWidth: 1200  }}>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Date of Birth</TableCell>
                      <TableCell>Telephone</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>School</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Parents Name</TableCell>
                      <TableCell>Parents Contact</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredStudents.map((row) => (
                      <TableRow
                        key={row.StudentID}
                        onClick={() => handleRowClick(row)}
                        sx={{ cursor: "pointer" ,
                        "&:hover": {
                          backgroundColor
                              : "rgba(0, 0, 0, 0.04)",
                        },}}
                      >
                        <TableCell>{row.studentID}</TableCell>
                        <TableCell>{row.profile.Name}</TableCell>
                        <TableCell>{row.profile.email}</TableCell>
                        <TableCell>{row.profile.DOB}</TableCell>
                        <TableCell>{row.profile.phone}</TableCell>
                        <TableCell>{row.profile.Medium}</TableCell>
                        <TableCell>{row.profile.School}</TableCell>
                        <TableCell>{row.profile.Address}</TableCell>
                        <TableCell>{row.profile.PName}</TableCell>
                        <TableCell>{row.profile.PContact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <AddStudentForm
            open={open}
            onClose={handleClose}
            studentData={selectedStudent}
          />
          {detailsOpen && (
            <StudentDetails
              open={detailsOpen}
              onClose={() => {
                setRefresh((prev) => !prev);
                setOpen(false);
                setDetailsOpen(false);
              }}
              onUpdate={handleStudentUpdate}
              studentData={selectedStudent}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Students;
