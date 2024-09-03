import React , {useState} from "react";
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
import ChangePasswordPopup from "../../popups/ChangePassword";
import { fetchStudentProfile } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const drawerWidth = 240;


const Profile = () => {


  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false);
  };

  const navigate = useNavigate();
  const studentID = localStorage.getItem('studentID');
  if (!studentID) {
    navigate('/login');
  }

  const [student, setStudent] = useState({
    'profile': {
      'name': '',
    },
    'classes': [],
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        console.log("This happens before the error");
        if (studentID) {
          const response = await fetchStudentProfile(studentID);
          if (response) {
            setStudent(response);
            console.log(student);
          }
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchStudentDetails();
  }, []);



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
                  {console.log(student)}
                  <Typography variant="h6">Name: {student.profile.Name}</Typography>
                  <Typography variant="body1">
                    Date of Birth: {student.profile.DOB}
                  </Typography>
                  <Typography variant="body1">
                    Address: {student.profile.Address}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {student.profile.phone}
                    {console.log("Here")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1">
                    Parent's Name: {student.profile.PName}
                  </Typography>
                  <Typography variant="body1">
                    Parent's Phone: {student.profile.PContact}
                  </Typography>
                  <Typography variant="body1">
                    Classes Attending:
                    <ul>
                    {student.classes.map((className, index) => (
                        <li key={index}>{className.className}</li>
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
            onClick={handleOpenChangePassword} // Add change password functionality here
          >
            Change Password
          </Button>
        </Container>
        <ChangePasswordPopup
  open={isChangePasswordOpen}
  handleClose={handleCloseChangePassword}
/>

      </Box>
    </div>
  );
};

export default Profile;
