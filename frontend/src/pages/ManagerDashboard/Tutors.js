import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Container, Card, CardContent, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import AddTutorForm from '../../popups/AddTutorForm'; // Import the AddTutorForm component
import TutorDetails from '../../popups/TutorDetails'; // Import the TutorDetails component
import Sidebar from '../../components/Sidebar';
import { AllTutors } from '../../services/api';

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const Tutors = () => {
  const [open, setOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false); // State to control the TutorDetails modal

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (tutor) => {
    setSelectedTutor(tutor);
    setDetailsOpen(true); // Open the TutorDetails modal
  };

  const handleAddTutor = () => {
    setSelectedTutor(null);
    handleOpen();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await AllTutors();
        setTutors(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setTutors(dummyData);
      }
    };

    fetchData();
  }, []);

  // Dummy data for the table
  const dummyData = [
    { id: 1, name: 'John Doe', subject: 'Math', email: 'john.doe@example.com', telephone: '123-456-7890', address: '123 Main St', subjects: 'Algebra' },
    { id: 2, name: 'Jane Smith', subject: 'Science', email: 'jane.smith@example.com', telephone: '987-654-3210', address: '456 Elm St', subjects: 'Physics' },
    { id: 3, name: 'Jim Brown', subject: 'English', email: 'jim.brown@example.com', telephone: '555-555-5555', address: '789 Oak St', subjects: 'Literature' },
  ];

  return (
    <div>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`, // Corrected string interpolation
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column', // Stack items vertically
          alignItems: 'center', // Center items horizontally
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Tutors Management
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAddTutor} // Open form for adding a tutor
            sx={{ mb: 3 }}
          >
            Add Tutor
          </Button>
          
          {/* Card containing the table */}
          <Card sx={{ width: '100%', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tutors List
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Telephone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Subjects Teaching</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tutors.map((row) => (
                    <TableRow key={row.id} onClick={() => handleRowClick(row)} sx={{ cursor: 'pointer' }}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.telephone}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.subjects}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* AddTutorForm Modal */}
          <AddTutorForm open={open} onClose={handleClose} tutorData={selectedTutor} />
          {/* TutorDetails Modal */}
          {detailsOpen && (
            <TutorDetails open={detailsOpen} onClose={() => setDetailsOpen(false)} tutorData={selectedTutor} />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Tutors;