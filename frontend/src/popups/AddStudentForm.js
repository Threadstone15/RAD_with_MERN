import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addStudent } from "../services/api";
import { fetchClasses } from "../services/api";

const AddStudentForm = ({ open, onClose, studentData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    medium: "",
    school: "",
    address: "",
    parentsName: "",
    parentsContact: "",
    classIds: [],
  });
  const [classes, setClasses] = useState([]); // State to hold available classes
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

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

  useEffect(() => {
    if (studentData) {
      setFormData({
        name: studentData.name || "",
        email: studentData.email || "",
        dateOfBirth: studentData.dateOfBirth || "",
        phone: studentData.phone || "",
        medium: studentData.medium || "",
        school: studentData.school || "",
        address: studentData.address || "",
        parentsName: studentData.parentsName || "",
        parentsContact: studentData.parentsContact || "",
        classIds: studentData.classIds || [],
      });
    } else {
      setFormData({
        name: "",
        email: "",
        dateOfBirth: "",
        phone: "",
        medium: "",
        school: "",
        address: "",
        parentsName: "",
        parentsContact: "",
        classIds: [],
      });
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClassChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      classIds: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addStudent(formData);
    } catch (error) {
      console.error("Add Student failed:", error);
    }
    onClose();
  };

  const handleClose = () => {
    if (
      Object.values(formData).some(
        (value) =>
          value !== "" && (Array.isArray(value) ? value.length !== 0 : true)
      )
    ) {
      setShowConfirmDialog(true); // Show confirmation dialog if there are unsaved changes
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setFormData({
      name: "",
      email: "",
      dateOfBirth: "",
      phone: "",
      medium: "",
      school: "",
      address: "",
      parentsName: "",
      parentsContact: "",
      classIds: [],
    });
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            margin: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              top: 10,
              right: 10,
            }}
          >
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ mt: 5, mb: 2 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{ margin: 0 }}
            >
              {studentData ? "Update Student Details" : "Add a Student"}
            </Typography>
            <form onSubmit={handleSubmit}>
              {/* Other form fields */}
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
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                label="Contact Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
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
                label="Parent's Name"
                name="parentsName"
                value={formData.parentsName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Parent's Contact Number"
                name="parentsContact"
                value={formData.parentsContact}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />

              {/* Class Selection */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Classes</InputLabel>
                <Select
                  multiple
                  name="classIds"
                  value={formData.classIds}
                  onChange={handleClassChange}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (id) => classes.find((cls) => cls._id === id)?.className
                      )
                      .join(", ")
                  }
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls._id} value={cls._id}>
                      {cls.className}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {studentData ? "Update" : "Submit"}
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      <Dialog open={showConfirmDialog} onClose={handleCancelClose}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to close without saving changes?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmClose} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddStudentForm;
