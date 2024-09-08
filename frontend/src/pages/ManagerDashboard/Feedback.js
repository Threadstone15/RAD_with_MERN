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
  Paper,
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import { getFeedback } from "../../services/api";

const drawerWidth = 240;

const Feedback = () => {
  const [Feedback, setFeedback] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbacks = await getFeedback();
        console.log(feedbacks);
        setFeedback(feedbacks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
                          <TableRow key={index} sx={{ cursor: "pointer" }}>
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
    </div>
  );
};

export default Feedback;
