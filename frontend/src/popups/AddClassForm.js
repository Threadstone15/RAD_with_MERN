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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { addClass, fetchTeachers } from "../services/api";

const AddClassForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    className: "",
    classId: "",
    fee: "",
    TeacherID: "",
    scheduleDays: [],
    scheduleTime: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await fetchTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };

    getTeachers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeacherChange = (event) => {
    setFormData((prev) => ({ ...prev, TeacherID: event.target.value }));
  };

  const handleScheduleDaysChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      scheduleDays: value.split(",").map((day) => day.trim()),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addClass(formData);

      setFormData({
        className: "",
        classId: "",
        fee: "",
        TeacherID: "",
        scheduleDays: [],
        scheduleTime: "",
      });
    } catch (error) {
      console.error("Add Class failed:", error);
    }
    onClose();
  };

  const handleClose = () => {
    if (
      Object.values(formData).some(
        (value) => value !== "" && value.length !== 0
      )
    ) {
      setShowConfirmDialog(true);
    } else {
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
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
            <Typography variant="h6" component="h2" gutterBottom>
              Add a New Class
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Class Name"
                name="className"
                value={formData.className}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Class ID"
                name="classId"
                value={formData.classId}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Fee"
                name="fee"
                type="number"
                value={formData.fee}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Teacher</InputLabel>
                <Select
                  name="TeacherID"
                  value={formData.TeacherID}
                  onChange={handleTeacherChange}
                >
                  {teachers.map((teacher) => (
                    <MenuItem key={teacher._id} value={teacher._id}>
                      {teacher.profile.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Schedule Days (comma separated)"
                name="scheduleDays"
                value={formData.scheduleDays.join(", ")}
                onChange={handleScheduleDaysChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Schedule Time"
                name="scheduleTime"
                value={formData.scheduleTime}
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
                Submit
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

export default AddClassForm;
