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
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AddClassForm from "../../popups/AddClassForm"; // Import the AddClassForm component
import ClassDetails from "../../popups/ClassDetails"; // Import the ClassDetails component
import axios from "axios";

const drawerWidth = 240;

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRowClick = (classData) => {
    setSelectedClass(classData);
    setDetailsOpen(true);
  };

  const handleAddClass = () => {
    setSelectedClass(null);
    handleOpen();
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/manager-dashboard/classes-with-teachers');
        setClasses(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Container>
          <Typography variant="h4" gutterBottom align="center">
            Classes Management
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddClass}
            sx={{ mb: 3 }}
          >
            Add Class
          </Button>

          <Card sx={{ width: "100%", mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Classes List
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class ID</TableCell>
                    <TableCell>Class Name</TableCell>
                    <TableCell>Teacher Name</TableCell>
                    <TableCell>Fee</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((row) => (
                    <TableRow
                      key={row.classId}
                      onClick={() => handleRowClick(row)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{row.classId}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>{row.TeacherID?.profile?.name || 'Unknown'}</TableCell>
                      <TableCell>{row.fee}</TableCell>
                      <TableCell>{row.schedule.days.join(", ")} at {row.schedule.time}</TableCell>
                      <TableCell>{row.studentIds.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <AddClassForm
            open={open}
            onClose={handleClose}
            classData={selectedClass}
          />
          {detailsOpen && (
            <ClassDetails
              open={detailsOpen}
              onClose={() => setDetailsOpen(false)}
              classData={selectedClass}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Classes;
