import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,Snackbar,Alert
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { getFeedback } from "../../services/api";
import FeedbackDetails from "../../popups/FeedbackDetails";

const drawerWidth = 240;

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [Feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchData = async () => {
    try {
      const feedbacks = await getFeedback();
      console.log(feedbacks);
      setFeedback(feedbacks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedFeedback(null);
  };

  const handleFeedbackDelete = async (deletedId) => {
    try {
      setFeedbacks(feedbacks.filter(feedback => feedback._id !== deletedId));
      setSnackbarMessage("Feedback deleted successfully.");
      setSnackbarSeverity("success");
      await fetchData() ;
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setSnackbarMessage("Failed to delete feedback.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: `${drawerWidth}px`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom align="center">
            Customer Feedback
          </Typography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Card
                sx={{
                  width: "100%",
                  boxShadow: 3,
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Customer Feedback
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table aria-label="class timetable">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Name</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Message</TableCell>
                          <TableCell align="center">Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Feedback.map((entry, index) => (
                          <TableRow
                          key={entry._id}
                          sx={{ cursor: "pointer" }}
                          onClick={() => handleOpenDetails(entry)}
                        >
                            <TableCell component="th" scope="row">
                              {entry.name}
                            </TableCell>
                            <TableCell align="center">{entry.email}</TableCell>
                            <TableCell align="center">
                              {entry.message}
                            </TableCell>
                            <TableCell align="center">{entry.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {selectedFeedback && (
        <FeedbackDetails
          open={openDetails}
          onClose={handleCloseDetails}
          feedbackData={selectedFeedback}
          onFeedbackDelete={handleFeedbackDelete}
        />
      )}
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
    </div>
  );
};

export default Feedback;
