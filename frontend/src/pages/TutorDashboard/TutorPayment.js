import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
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
import Sidebar from "./TutorSidebar";

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const TutorPayment = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  // Dummy data for payments
  const dummyData = [
    {
      paymentId: 1,
      paymentDate: "2024-08-15",
      month: "August",
      class: "Math",
      amount: "$150",
      paidBy: "John Doe",
      studentName: "Alice Johnson",
    },
    {
      paymentId: 2,
      paymentDate: "2024-08-16",
      month: "August",
      class: "Science",
      amount: "$200",
      paidBy: "Jane Smith",
      studentName: "Bob Brown",
    },
    {
      paymentId: 3,
      paymentDate: "2024-07-20",
      month: "July",
      class: "English",
      amount: "$120",
      paidBy: "Alice Johnson",
      studentName: "Charlie Davis",
    },
  ];

  useEffect(() => {
    // Simulate data fetching
    setPayments(dummyData);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const filteredPayments = payments.filter(payment => {
    return (
      (searchTerm === "" || payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedMonth === "" || payment.month === selectedMonth) &&
      (selectedStudent === "" || payment.studentName === selectedStudent) &&
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
            Tutor Payments Management
          </Typography>

          <Card sx={{ width: "100%", mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Payments List
              </Typography>

              <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                <TextField
                  label="Search"
                  variant="outlined"
                  onChange={handleSearch}
                  value={searchTerm}
                  sx={{ flex: 1 }}
                />
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
                  <InputLabel>Student</InputLabel>
                  <Select
                    value={selectedStudent}
                    onChange={handleStudentChange}
                    label="Student"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
                    <MenuItem value="Bob Brown">Bob Brown</MenuItem>
                    <MenuItem value="Charlie Davis">Charlie Davis</MenuItem>
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
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Month</TableCell>
                    <TableCell>Class</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Paid By</TableCell>
                    <TableCell>Student Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.paymentId}>
                      <TableCell>{payment.paymentId}</TableCell>
                      <TableCell>{payment.paymentDate}</TableCell>
                      <TableCell>{payment.month}</TableCell>
                      <TableCell>{payment.class}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.paidBy}</TableCell>
                      <TableCell>{payment.studentName}</TableCell>
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

export default TutorPayment;
