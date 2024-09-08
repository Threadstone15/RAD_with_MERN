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
} from "@mui/material";
import Sidebar from "../../components/Sidebar";
import AddClassForm from "../../popups/AddClassForm";
import ClassDetails from "../../popups/ClassDetails";
import axios from "axios";

const drawerWidth = 240;

const Classes = () => {
  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classes, setClasses] = useState([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");

  const [classOptions, setClassOptions] = useState([]);
  const [teacherOptions, setTeacherOptions] = useState([]);

  const handleOpen = () => {
    setOpen(true);
    setRefresh((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
    setDetailsOpen(false);
    setRefresh((prev) => !prev);
  };
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
        const response = await axios.get(
          "http://localhost:5000/manager-dashboard/classes-with-teachers"
        );
        setClasses(response.data);

        const uniqueClassNames = [
          ...new Set(response.data.map((classData) => classData.className)),
        ];
        setClassOptions(uniqueClassNames);
        const uniqueTeachers = [
          ...new Set(
            response.data
              .map((classData) => classData.TeacherID?.profile?.name)
              .filter((name) => name)
          ),
        ];
        setTeacherOptions(uniqueTeachers);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, [refresh]);

  const filteredClasses = classes.filter(
    (classData) =>
      classData.className.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (teacherFilter === "" ||
        classData.TeacherID?.profile?.name.includes(teacherFilter)) &&
      (classFilter === "" || classData.className.includes(classFilter))
  );

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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: 3,
              width: "100%",
              alignItems: "flex-start",
            }}
          >
            <TextField
              label="Search by Class Name"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: "100%", height: "56px" }}
            />
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                alignItems: "center",
              }}
            >
              <TextField
                select
                label="Filter by Teacher"
                value={teacherFilter}
                onChange={(e) => setTeacherFilter(e.target.value)}
                sx={{ flexGrow: 1, height: "56px" }}
              >
                <MenuItem value="">All</MenuItem>
                {teacherOptions.map((teacherName) => (
                  <MenuItem key={teacherName} value={teacherName}>
                    {teacherName}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Filter by Class"
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                sx={{ flexGrow: 1, height: "56px" }}
              >
                <MenuItem value="">All</MenuItem>
                {classOptions.map((className) => (
                  <MenuItem key={className} value={className}>
                    {className}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddClass}
                sx={{ height: "56px", width: "15%" }}
              >
                Add Class
              </Button>
            </Box>
          </Box>

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
                  {filteredClasses.map((row) => (
                    <TableRow
                      key={row.classId}
                      onClick={() => handleRowClick(row)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{row.classId}</TableCell>
                      <TableCell>{row.className}</TableCell>
                      <TableCell>
                        {row.TeacherID?.profile?.name || "Unknown"}
                      </TableCell>
                      <TableCell>{row.fee}</TableCell>
                      <TableCell>
                        {row.schedule.days.join(", ")} at {row.schedule.time}
                      </TableCell>
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
              onUpdate={handleClose}
            />
          )}
        </Container>
      </Box>
    </div>
  );
};

export default Classes;
