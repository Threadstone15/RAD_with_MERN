import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Card,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        const response = await axios.get('http://localhost:5000/manager-dashboard/students');
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
  
    fetchStudents();
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddStudent}
            sx={{ mb: 3 }}
          >
            Add Student
          </Button>

          <Card sx={{ width: "100%", mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Students List
              </Typography>
              <Table>
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
                  {students.map((row) => (
                    <TableRow
                      key={row.StudentID}
                      onClick={() => handleRowClick(row)}
                      sx={{ cursor: "pointer" }}
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
            </CardContent>
          </Card>

          <AddStudentForm
            open={open}
            onClose={handleClose}
            studentData={selectedStudent}
          />
          {detailsOpen && (
            <StudentDetails
              open={detailsOpen}
              onClose={() => setDetailsOpen(false)}
              studentData={selectedStudent}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Students;
