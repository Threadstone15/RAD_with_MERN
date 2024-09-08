import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import TutorSidebar from "./TutorSidebar";
import ChangePasswordPopup from "../../popups/ChangePasswordTeacher";
import { fetchTutorData } from "../../services/api";

const drawerWidth = 240;

const TutorProfile = () => {
  const [tutorData, setTutor] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    subjects: [],
  });

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const tutorID = localStorage.getItem("teacherID");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tutorID) {
      navigate("/login");
    }
  }, [tutorID, navigate]);
  console.log(tutorID);

  // Fetch tutor details
  useEffect(() => {
    const fetchTutorDetails = async () => {
      console.log("Fetching tutor details for tutorID:", tutorID);
      try {
        if (tutorID) {
          const response = await fetchTutorData(tutorID);
          console.log("Response from fetchTutorData:", response);
          if (response) {
            // Ensure that subjects is an array
            setTutor({
              ...response,
              subjects: Array.isArray(response.subjects)
                ? response.subjects
                : [], // Handle non-array subjects
            });
            console.log("Tutor state updated:", response);
          }
        }
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      }
    };

    fetchTutorDetails();
  }, [tutorID]);

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
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
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6">Name: {tutorData.name}</Typography>
                  <Typography variant="body1">
                    Date of Birth: {tutorData.dob}
                  </Typography>
                  <Typography variant="body1">
                    Address: {tutorData.address}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {tutorData.phone}
                  </Typography>
                  <Typography variant="body1">
                    Email: {tutorData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Subjects Taught:
                    <ul>
                      {/* Check if subjects is an array before mapping */}
                      {Array.isArray(tutorData.subjects) &&
                      tutorData.subjects.length > 0 ? (
                        tutorData.subjects.map((subject, index) => (
                          <li key={index}>{subject}</li>
                        ))
                      ) : (
                        <li>No subjects assigned</li>
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
      </Box>
    </div>
  );
};

export default TutorProfile;
