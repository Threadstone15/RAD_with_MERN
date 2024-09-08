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
import Sidebar from "../../components/Sidebar";
import { fetchAllPaymentsData } from "../../services/api"; // Adjust the import based on your actual API service

const drawerWidth = 240; // Assuming the width of the sidebar is 240px

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [uniqueMonths, setUniqueMonths] = useState([]);
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        console.log("Fetching all payments");
        const response = await fetchAllPaymentsData(); // Call the API to fetch all payments
        console.log("Response from fetchAllPaymentsData:", response);
    
        // Process the payments data
        const convertedPayments = response.map(payment => ({
          ...payment,
          className: payment.classID ? payment.classID.className : 'N/A', // Extract class name
          studentName: payment.studentID && payment.studentID.profile ? payment.studentID.profile.Name : 'N/A', // Extract student name
          formattedDate: new Date(payment.date).toLocaleDateString() // Format the date
        }));
    
        // Extract unique values for filtering
        const months = [...new Set(convertedPayments.map(payment => payment.month))];
        const classes = [...new Set(convertedPayments.map(payment => payment.className))];
    
        setPayments(convertedPayments);
        setUniqueMonths(months);
        setUniqueClasses(classes);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    

    fetchPayments();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleTutorChange = (event) => {
    setSelectedTutor(event.target.value);
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(event.target.value);
  };

  const filteredPayments = payments.filter(payment => {
    return (
      (searchTerm === "" || payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || payment.tutorName.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedMonth === "" || payment.month === selectedMonth) &&
      (selectedTutor === "" || payment.tutorName === selectedTutor) &&
      (selectedStudent === "" || payment.studentName === selectedStudent)
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
            Payments Management
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
                  <InputLabel>Tutor</InputLabel>
                  <Select
                    value={selectedTutor}
                    onChange={handleTutorChange}
                    label="Tutor"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Mr. Smith">Mr. Smith</MenuItem>
                    <MenuItem value="Ms. Johnson">Ms. Johnson</MenuItem>
                    <MenuItem value="Mr. Clark">Mr. Clark</MenuItem>
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
              </Box>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Class Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Paid By</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow>
                      <TableCell>{payment.formattedDate}</TableCell>
                      <TableCell>{payment.className}</TableCell> {/* Displaying className */}
                      <TableCell>{payment.amount}</TableCell>
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

export default Payments;
