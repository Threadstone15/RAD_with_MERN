import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import AddStudentForm from '../popups/AddStudentForm';
import StudentDetails from '../popups/StudentDetails'; // Import the StudentDetails component
import { Box, Button, Typography, Container, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const Students = () => {
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openStudentDetails, setOpenStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleOpenAddStudent = () => setOpenAddStudent(true);
  const handleCloseAddStudent = () => setOpenAddStudent(false);

  const handleOpenStudentDetails = () => setOpenStudentDetails(true);
  const handleCloseStudentDetails = () => setOpenStudentDetails(false);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    handleOpenStudentDetails(); // Open the StudentDetails modal on single click
  };

  const handleRowDoubleClick = (student) => {
    setSelectedStudent(student);
    handleOpenAddStudent(); // Open the AddStudentForm modal on double click
  };

  const handleAddStudent = () => {
    setSelectedStudent(null); // Clear selected student to add a new student
    handleOpenAddStudent();
  };

  const handleDeleteStudent = (studentId) => {
    console.log(`Deleting student with ID: ${studentId}`);
    // Add delete logic here
  };

  // Dummy data for the table
  const dummyData = [
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john.doe@example.com', 
      dateOfBirth: '1980-01-15', 
      telephone: '123-456-7890', 
      medium: 'English', 
      school: 'Springfield High', 
      address: '123 Main St', 
      parentsName: 'Jane Doe', 
      parentsContact: '987-654-3210', 
    },
    { 
      id: 2, 
      name: 'Jane Smith', 
      email: 'jane.smith@example.com', 
      dateOfBirth: '1990-05-22', 
      telephone: '987-654-3210', 
      medium: 'Sinhala', 
      school: 'Riverside School', 
      address: '456 Elm St', 
      parentsName: 'John Smith', 
      parentsContact: '555-555-5555', 
    },
    { 
      id: 3, 
      name: 'Jim Brown', 
      email: 'jim.brown@example.com', 
      dateOfBirth: '1985-09-30', 
      telephone: '555-555-5555', 
      medium: 'Tamil', 
      school: 'Greenfield Academy', 
      address: '789 Oak St', 
      parentsName: 'Mary Brown', 
      parentsContact: '123-456-7890', 
    },
  ];

  return (
    <div>
      <Sidebar/>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`, // Offset the main content to make space for the sidebar
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center items horizontally
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Student Management
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddStudent} // Open form for adding a student
            sx={{ mb: 3 }}
          >
            Add Student
          </Button>
          
          {/* Card containing the table */}
          <Card sx={{ width: '100%', mb: 3 }}>
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
                  {dummyData.map((row) => (
                    <TableRow 
                      key={row.id} 
                      onClick={() => handleRowClick(row)} // Single click opens StudentDetails
                      onDoubleClick={() => handleRowDoubleClick(row)} // Double click opens AddStudentForm
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.dateOfBirth}</TableCell>
                      <TableCell>{row.telephone}</TableCell>
                      <TableCell>{row.medium}</TableCell>
                      <TableCell>{row.school}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.parentsName}</TableCell>
                      <TableCell>{row.parentsContact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AddStudentForm Modal */}
          <AddStudentForm open={openAddStudent} onClose={handleCloseAddStudent} studentData={selectedStudent} />

          {/* StudentDetails Modal */}
          <StudentDetails 
            open={openStudentDetails} 
            onClose={handleCloseStudentDetails} 
            studentData={selectedStudent} 
            onDelete={handleDeleteStudent} 
          />
        </Container>
      </Box>
    </div>
  );
}

export default Students;
