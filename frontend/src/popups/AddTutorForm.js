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
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addTeacher } from "../services/api";

const AddTutorForm = ({ open, onClose, tutorData, onConfirmClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    subjects: "",
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (tutorData) {
      setFormData({
        name: tutorData.profile.name || "",
        email: tutorData.profile.email || "",
        telephone: tutorData.profile.phone || "",
        address: tutorData.profile.address || "",
        subjects: tutorData.subjects || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        telephone: "",
        address: "",
        subjects: "",
      });
    }
  }, [tutorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addTeacher({
        name: formData.name,
        email: formData.email,
        phone: formData.telephone,
        address: formData.address,
        subjects: formData.subjects,
      });

      setShowSnackbar(true); // Display success message if needed
      onClose();
    } catch (error) {
      console.error("Error adding teacher:", error.message);
      setErrorMessage(error.response?.data?.error || "An error occurred");
      setShowSnackbar(true);
    }
  };

  const handleClose = () => {
    if (Object.values(formData).some((value) => value !== "")) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    setFormData({
      name: "",
      email: "",
      telephone: "",
      address: "",
      subjects: "",
    });
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
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
              {tutorData ? "Update Tutor Details" : "Add a Tutor"}
            </Typography>
            <form onSubmit={handleSubmit}>
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
                label="Telephone Number"
                name="telephone"
                value={formData.telephone}
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
                label="Subjects Teaching"
                name="subjects"
                value={formData.subjects}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                {tutorData ? "Update" : "Submit"}
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

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={errorMessage ? "error" : "success"}>
          {errorMessage || "Operation successful"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddTutorForm;
