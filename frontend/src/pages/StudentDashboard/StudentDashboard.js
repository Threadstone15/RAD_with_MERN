import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import StudentSidebar from "../StudentDashboard/StudentSidebar";
import { fetchHash, startPayment } from "./paymentService";
import AttendanceGraph from "./AttendanceGraph";
import { fetchStudentData } from "../../services/api"; // Import the function to fetch classes
import { useNavigate } from "react-router-dom";

const StudentPage = () => {
  const navigate = useNavigate();
  const studentID = localStorage.getItem("studentID");
  if (!studentID) {
    navigate("/login");
  }

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    profile: { Name: "" },
    classIds: [],
    registeredClasses: [],
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      console.log("Fetching student details for student ID:", studentID);
      try {
        if (studentID) {
          const response = await fetchStudentData(studentID);
          console.log("Response from fetchStudentData:", response);
          if (response) {
            setStudent(response);
          }
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      }
    };

    fetchStudentDetails();

    const script = document.createElement("script");
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async (course) => {
    console.log("handlePayment called with course:", course);

    const { Name, email, phone, Address } = student.profile;

    if (!Name || !email || !phone || !Address) {
      console.error(
        "Student profile is missing required fields:",
        student.profile
      );
      return;
    }

    const studentDetails = {
      id: student._id,
      name: Name,
      email: email,
      phone: phone,
      address: Address,
    };

    console.log("Student details:", studentDetails);

    setLoading(true);
    try {
      console.log("Fetching hash for payment");
      const hash = await fetchHash(`Order${course._id}`, course.fee, "LKR");
      console.log("Hash fetched:", hash);
      console.log("Starting payment for course:", course);
      await startPayment(course, studentDetails, hash);
      console.log("Payment completed successfully");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
      console.log("Loading state reset to false");
    }
  };

  const totalAmountPaid = student.classIds.reduce(
    (total, course) => total + course.amount,
    0
  );

  return (
    <div style={{ display: "flex" }}>
      <StudentSidebar />
      <div style={{ flexGrow: 1, padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {student.profile.Name}
        </Typography>

        <Grid container spacing={2}>
          {/* Left side: Your Courses */}
          <Grid item xs={12} sm={6}>
            <Card style={{ marginBottom: "20px", height: "450px" }}>
              <CardContent style={{ overflowY: "auto", height: "100%" }}>
                <Typography variant="h5" gutterBottom>
                  Your Courses
                </Typography>
                {student.classIds.map((course) => (
                  <Card key={course.classId} style={{ marginBottom: "10px" }}>
                    <CardContent>
                      <Typography variant="h6">{course.className}</Typography>
                      <Typography variant="body2">LKR {course.fee}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() => handlePayment(course)}
                        disabled={loading}
                        variant="contained"
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Right side: Total Amount Paid and Attendance */}
          <Grid item xs={12} sm={6}>
            <Card style={{ marginBottom: "20px", height: "250px" }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Attendance
                </Typography>
                <AttendanceGraph />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Below: Class Timetable */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Class Timetable
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="class timetable">
                <TableHead>
                  <TableRow>
                    <TableCell>Day</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Subject</TableCell>
                    <TableCell align="center">Fee</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {student.classIds.map((entry, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: "rgba(0, 123, 255, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(0, 123, 255, 0.2)",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {entry.schedule?.days?.join(", ") || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {entry.schedule?.time || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {entry.className || "N/A"}
                      </TableCell>
                      <TableCell align="center">
                        {("LKR " + entry.fee).replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentPage;
