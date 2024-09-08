
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Snackbar,
  Alert
} from "@mui/material";
import { useNavigate } from 'react-router-dom'; // Add useNavigate to handle redirection
import TutorSidebar from "./TutorSidebar"; // Import Sidebar
import ChangePasswordPopup from "../../popups/ChangePasswordTeacher";
import { fetchTutorData } from "../../services/api";

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const TutorProfile = () => {
  const [tutorData, setTutor] = useState({
    profile: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    subjects: [], // Ensure subjects is initialized as an array
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const teacherID = localStorage.getItem('teacherID'); // Get the tutorID from localStorage
  const navigate = useNavigate(); // Declare navigate for redirection

  // Redirect to login if tutorID is not found
  useEffect(() => {
    if (!teacherID) {
      navigate("/"); // Redirect to login page if no tutorID
    }
  }, [teacherID, navigate]);


  // Fetch tutor details
  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        if (teacherID) {
          const response = await fetchTutorData(teacherID);
          console.log("Response from fetchTutorData:", response);
          if (response) {
            // Ensure that subjects is an array
            setTutor({
              ...response,
              subjects: Array.isArray(response.classIds) ? response.classIds : [], // Handle non-array subjects
            });
          }
        }
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      }
    };

    fetchTutorDetails();
  }, [teacherID]);

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  const handleCloseChangePassword = (message, severity) => {
    setIsChangePasswordOpen(false);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <TutorSidebar />
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
            Tutor Profile
          </Typography>

          <Card
            sx={{
              width: "100%",
              mb: 3,
              "&:hover": {
                boxShadow: 6, // Add hover effect for the card
              },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Name: {tutorData.profile.name}</Typography>
                  <Typography variant="body1">
                    Address: {tutorData.profile.address}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {tutorData.profile.phone}
                  </Typography>
                  <Typography variant="body1">
                    Email: {tutorData.profile.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Classes Taught:
                    <ul>
                      {
                        Array.isArray(tutorData.subjects) && tutorData.subjects.length > 0 ? (
                          tutorData.subjects.map((subject, index) => (
                            <li key={index}>{subject.className}</li>
                          ))
                        ) : (
                          <li>No subjects assigned</li> // Handle no subjects case
                        )}
                    </ul>
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleOpenChangePassword} // Open the change password popup
          >
            Change Password
          </Button>
        </Container>

        {/* Change Password Popup */}
        <ChangePasswordPopup
          open={isChangePasswordOpen}
          handleClose={handleCloseChangePassword}
        />

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
      </Box>
    </div>
  );
};

export default TutorProfile;
