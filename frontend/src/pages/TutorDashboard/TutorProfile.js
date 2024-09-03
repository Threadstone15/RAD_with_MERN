import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import TutorSidebar from "./TutorSidebar"; // Import Sidebar
import ChangePasswordPopup from "../../popups/ChangePassword"; // Import ChangePasswordPopup component

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const tutorData = {
  name: "John Doe",
  dob: "1980-03-10",
  address: "123 Main St",
  phone: "123-456-7890",
  email: "john.doe@example.com",
  subjects: ["Math", "Physics", "Chemistry"],
};

const TutorProfile = () => {
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

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
                boxShadow: 6, // Add hover effect for the card
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
                      {tutorData.subjects.map((subject, index) => (
                        <li key={index}>{subject}</li>
                      ))}
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
