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
  TextField,
  MenuItem,
  Snackbar,
  Alert
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
  const [refresh, setRefresh] = useState(false);
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () =>{
    setOpen(false);
    setRefresh((prev) => !prev);
  } 

  const handleRowClick = (tutor) => {
    setSelectedTutor(tutor);
    setDetailsOpen(true);
  };

  const handleAddTutor = () => {
    setSelectedTutor(null);
    handleOpen();
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/manager-dashboard/teachers"
        );
        setTutors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, [refresh]);

  const filteredTutors = tutors.filter(
    (tutor) =>
      tutor.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (subjectFilter === "" || tutor.subjects.includes(subjectFilter))
  );

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
              <TextField
                label="Search by Name"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flexGrow: 2, height: "56px" }} // Match button height
              />
              <TextField
                select
                label="Filter by Subject"
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                sx={{ flexGrow: 1, height: "56px" }} // Match button height
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Math">Math</MenuItem>
                <MenuItem value="Science">Science</MenuItem>
                <MenuItem value="English">English</MenuItem>
              </TextField>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTutor}
              sx={{ ml: 1, height: "56px", width: "15%" }} // Same height as input fields
            >
              Add Tutor
            </Button>
          </Box>

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
                  {filteredTutors.map((row) => (
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
          <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

          <AddTutorForm
            open={open}
            onClose={handleClose}
            tutorData={selectedTutor}
          />
          {detailsOpen && (
            <TutorDetails
              open={detailsOpen}
              onDelete={(message, severity) => {
                setSnackbarMessage(message);
                setSnackbarSeverity(severity);
                setSnackbarOpen(true);
                setDetailsOpen(false);
                setRefresh((prev)=> !prev);
              }}
              tutorData={selectedTutor}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Tutors;
