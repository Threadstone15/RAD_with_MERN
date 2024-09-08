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
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Sidebar from "./StudentSidebar";
import { fetchPaymentData } from "../../services/api";

// Mapping of month numbers to month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const drawerWidth = 240;

const StudentPayment = () => {
  const [payments, setPayments] = useState([]);
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [studentID, setStudentID] = useState("");

  useEffect(() => {
    const storedStudentID = localStorage.getItem("studentID");
    if (storedStudentID) {
      setStudentID(storedStudentID);
    } else {
      console.error("Student ID not found in local storage");
    }
  }, []);

  useEffect(() => {
    if (studentID) {
      // Fetch payments data from the server
      const fetchPayments = async () => {
        try {
          console.log("Fetching payments for student ID:", studentID);
          const response = await fetchPaymentData(studentID);
          console.log("Response from fetchPaymentData:", response);

          // Convert month numbers to month names and extract unique months and classes
          const convertedPayments = response.map((payment) => ({
            ...payment,
            month: monthNames[payment.month - 1], // Convert month number to name
          }));

          const months = [
            ...new Set(convertedPayments.map((payment) => payment.month)),
          ];
          const classes = [
            ...new Set(
              convertedPayments.map((payment) => payment.classID?.className)
            ),
          ];

          setPayments(convertedPayments);
          setUniqueMonths(months);
          setUniqueClasses(classes);
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      };

      fetchPayments();
    }
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
      (selectedClass === "" ||
        (payment.classID && payment.classID.className === selectedClass))
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
                    {uniqueMonths.map((month) => (
                      <MenuItem key={month} value={month}>
                        {month}
                      </MenuItem>
                    ))}
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
                    {uniqueClasses.map((className) => (
                      <MenuItem key={className} value={className}>
                        {className}
                      </MenuItem>
                    ))}
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
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>
                        {payment.classID ? payment.classID.className : "N/A"}
                      </TableCell>
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
