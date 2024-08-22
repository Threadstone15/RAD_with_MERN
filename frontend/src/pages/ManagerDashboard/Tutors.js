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
import AddTutorForm from "../../popups/AddTutorForm";
import TutorDetails from "../../popups/TutorDetails";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const drawerWidth = 240;

const Tutors = () => {
  const [open, setOpen] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (tutor) => {
    setSelectedTutor(tutor);
    setDetailsOpen(true);
  };

  const handleAddTutor = () => {
    setSelectedTutor(null);
    handleOpen();
  };

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manager-dashboard/teachers');
        setTutors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching tutors:', error);
      }
    };
  
    fetchTutors();
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
            Tutors Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTutor}
            sx={{ mb: 3 }}
          >
            Add Tutor
          </Button>

          <Card sx={{ width: "100%", mb: 3 }}>
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
                    <TableRow
                      key={row.TeacherID}
                      onClick={() => handleRowClick(row)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{row.TeacherID}</TableCell>
                      <TableCell>{row.profile.name}</TableCell>
                      <TableCell>{row.subjects}</TableCell>
                      <TableCell>{row.profile.email}</TableCell>
                      <TableCell>{row.profile.phone}</TableCell>
                      <TableCell>{row.profile.address}</TableCell>
                      <TableCell>{row.subjects}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <AddTutorForm
            open={open}
            onClose={handleClose}
            tutorData={selectedTutor}
          />
          {detailsOpen && (
            <TutorDetails
              open={detailsOpen}
              onClose={() => setDetailsOpen(false)}
              tutorData={selectedTutor}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Tutors;
