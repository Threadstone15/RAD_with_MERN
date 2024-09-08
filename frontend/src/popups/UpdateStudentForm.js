import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { updateStudent, fetchClasses } from "../services/api";

const UpdateStudentForm = ({ open, onClose, studentData, onUpdate }) => {
  const [formData, setFormData] = useState({
    studentID: "",
    name: "",
    email: "",
    DOB: "",
    phone: "",
    medium: "",
    school: "",
    address: "",
    parentsName: "",
    parentsContact: "",
    classIds: []
  });

  const [classes, setClasses] = useState([]);


  useEffect(() => {
    const getClasses = async () => {
      try {
        const response = await fetchClasses();
        setClasses(response.data);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      }
    };

    getClasses();
  }, []);

  const handleClassChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      classIds: event.target.value
    }));
  };

  useEffect(() => {
    if (studentData) {
      setFormData({
        studentID: studentData.studentID || "",
        name: studentData.profile?.Name || "",
        email: studentData.profile?.email || "",
        DOB: studentData.profile?.DOB || "",
        phone: studentData.profile?.phone || "",
        medium: studentData.profile?.Medium || "",
        school: studentData.profile?.School || "",
        address: studentData.profile?.Address || "",
        parentsName: studentData.profile?.PName || "",
        parentsContact: studentData.profile?.PContact || "",
        classIds: studentData.classIds || []
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await updateStudent(formData);
      onUpdate(); // Notify parent component of the update
      onClose(); // Close the form modal
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };


  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxHeight: '80vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {studentData ? "Update Student Details" : "Add New Student"}
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Date of Birth"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Medium"
            name="medium"
            value={formData.medium}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="School"
            name="school"
            value={formData.school}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Parents Name"
            name="parentsName"
            value={formData.parentsName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Parents Contact"
            name="parentsContact"
            value={formData.parentsContact}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Classes</InputLabel>
            <Select
              multiple
              name="classIds"
              value={formData.classIds}
              onChange={handleClassChange}
              renderValue={(selected) =>
                selected.map((id) => classes.find((cls) => cls._id === id)?.className).join(", ")
              }
            >
              {classes.map((cls) => (
                <MenuItem key={cls._id} value={cls._id}>
                  {cls.className}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {studentData ? "Update Student" : "Add Student"}
            </Button>
          </Box>
        </Box>
      </Modal>

    </>
  );
};

export default UpdateStudentForm;
