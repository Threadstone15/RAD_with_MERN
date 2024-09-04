import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";
import { updateTeacher } from "../services/api";

const UpdateTutorForm = ({ open, onClose, tutorData, onUpdate }) => {
  const [formData, setFormData] = useState({
    TeacherID: "", // Add TeacherID to formData
    name: "",
    email: "",
    phone: "",
    address: "",
    subjects: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    if (tutorData) {
      setFormData({
        TeacherID: tutorData.TeacherID || "", // Initialize TeacherID
        name: tutorData.profile.name || "",
        email: tutorData.profile.email || "",
        phone: tutorData.profile.phone || "",
        address: tutorData.profile.address || "",
        subjects: tutorData.subjects || "",
      });
    }
  }, [tutorData]);

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
      // Perform the update operation
      await updateTeacher(formData);
      setSnackbarMessage("Tutor updated successfully!");
      setSnackbarSeverity("success");
      onUpdate(); // Notify parent component of the update
      onClose(); // Close the form modal
    } catch (error) {
      console.error("Error updating tutor:", error);
      setSnackbarMessage("Failed to update tutor. Please try again.");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          component="form"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: '80vh',
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {tutorData ? "Update Tutor Details" : "Add New Tutor"}
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
            label="Phone"
            name="phone"
            value={formData.phone}
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
            label="Subjects"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              {tutorData ? "Update Tutor" : "Add Tutor"}
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateTutorForm;
