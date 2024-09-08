import React, { useState, useEffect } from "react";
import {
  Box,
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
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import Sidebar from "./StudentSidebar";
import axios from "axios"; // For fetching data from the server

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const StudentPayment = ({ studentID }) => {
  const [payments, setPayments] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  useEffect(() => {
    // Fetch payments data from the server
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`/api/payments/${studentID}`);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments", error);
      }
    };

    fetchPayments();
  }, [studentID]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      (selectedMonth === "" || payment.month === selectedMonth) &&
      (selectedClass === "" || payment.class === selectedClass)
    );
  });

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
            Payments List
          </Typography>

          <Card sx={{ width: "100%", mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payments List
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Month</InputLabel>
                  <Select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    label="Month"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="July">July</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Class</InputLabel>
                  <Select
                    value={selectedClass}
                    onChange={handleClassChange}
                    label="Class"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Math">Math</MenuItem>
                    <MenuItem value="Science">Science</MenuItem>
                    <MenuItem value="English">English</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Month</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment._id}>
                      {" "}
                      {/* Assuming _id or a similar unique identifier */}
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.class}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </div>
  );
};

export default StudentPayment;
