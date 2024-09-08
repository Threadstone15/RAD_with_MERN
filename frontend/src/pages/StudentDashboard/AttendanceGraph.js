import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { fetchStudentAttendance } from "../../services/api";
import { useNavigate } from "react-router-dom";

const ClassGraph = () => {
  const navigate = useNavigate();
  const studentID = localStorage.getItem("studentID");
  if (!studentID) {
    navigate("/");
  }

  const [animated, setAnimated] = useState(false);
  const [classData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      console.log("Fetching student Attendance for studentID:", studentID);
      try {
        if (studentID) {
          const response = await fetchStudentAttendance(studentID);
          console.log("Response from fetchStudentAttendance:", response);
          if (response) {
            setAttendanceData(response);
          }
        }
      } catch (error) {
        console.error("Error fetching Attendance:", error);
      }
    };
    fetchAttendance();

    setAnimated(true); // Trigger the animation when the component mounts
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h6" gutterBottom>
        Class Performance
      </Typography>
      <Box
        sx={{
          position: "relative",
          height: "300px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {/* Y-axis */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "1px",
            backgroundColor: "#000",
          }}
        />
        {/* X-axis */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1px",
            backgroundColor: "#000",
          }}
        />

        {/* Bars */}
        <Grid container spacing={2} sx={{ height: "100%" }}>
          {classData.map((data, index) => (
            <Grid
              item
              xs
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column-reverse",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "50px",
                  height: animated ? `${data.value}%` : "0%",
                  backgroundColor: "primary.main",
                  transition: "height 1s ease",
                }}
              />
              <Typography variant="body2">{data.name}</Typography>
            </Grid>
          ))}
        </Grid>

        {/* Y-axis labels */}
        {[100, 75, 50, 25, 0].map((value, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              position: "absolute",
              left: "-30px",
              bottom: `${value}%`,
              transform: "translateY(50%)",
            }}
          >
            {value}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ClassGraph;
