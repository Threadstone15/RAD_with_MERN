import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import StudentSidebar from "../StudentDashboard/StudentSidebar"; // Import Sidebar

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const studentData = {
  name: "John Doe",
  dob: "2005-01-15",
  address: "123 Main St",
  phone: "123-456-7890",
  parentName: "Jane Doe",
  parentPhone: "987-654-3210",
  classes: ["Math", "Science", "English"],
};

const Profile = () => {
  return (
    <div>
      <StudentSidebar />
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
            Student Profile
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
                  <Typography variant="h6">Name: {studentData.name}</Typography>
                  <Typography variant="body1">
                    Date of Birth: {studentData.dob}
                  </Typography>
                  <Typography variant="body1">
                    Address: {studentData.address}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {studentData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Parent's Name: {studentData.parentName}
                  </Typography>
                  <Typography variant="body1">
                    Parent's Phone: {studentData.parentPhone}
                  </Typography>
                  <Typography variant="body1">
                    Classes Attending:
                    <ul>
                      {studentData.classes.map((className, index) => (
                        <li key={index}>{className}</li>
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
            onClick={() => alert("Change Password Clicked")} // Add change password functionality here
          >
            Change Password
          </Button>
        </Container>
      </Box>
    </div>
  );
};

export default Profile;
