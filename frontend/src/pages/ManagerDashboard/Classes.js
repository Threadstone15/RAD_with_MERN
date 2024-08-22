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
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

const drawerWidth = 240;

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleRowClick = (classData) => {
    setSelectedClass(classData);
    setDetailsOpen(true);
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
                      <TableCell>{row.schedule.days.join(", ")} at {row.schedule.time}</TableCell>
                      <TableCell>{row.studentIds.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Uncomment and create the ClassDetails component when ready */}
          {/* {detailsOpen && (
            <ClassDetails
              open={detailsOpen}
              onClose={() => setDetailsOpen(false)}
              classData={selectedClass}
            />
          )} */}
        </Container>
      </Box>
    </div>
  );
};

export default Classes;
