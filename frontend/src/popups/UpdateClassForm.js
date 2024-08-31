import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Modal, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { updateClass, fetchTeachers } from '../services/api';

const UpdateClassForm = ({ open, onClose, classData, onUpdate }) => {
  const [formData, setFormData] = useState({
    _id: '',
    classId: '',
    className: '',
    fee: '',
    TeacherID: '',
    scheduleDays: [],
    scheduleTime: '',
  });

  const [teachers, setTeachers] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (classData) {
      setFormData({
        _id: classData._id || '',
        classID: classData.classId || '',
        className: classData.className || '',
        fee: classData.fee || '',
        TeacherID: classData.TeacherID || '',
        scheduleDays: classData.scheduleDays || [],
        scheduleTime: classData.scheduleTime || '',
      });
    }
  }, [classData]);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await fetchTeachers();
        setTeachers(response.data);
      } catch (error) {
        console.error('Failed to fetch teachers:', error);
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
    setFormData((prev) => ({ ...prev, scheduleDays: value.split(',').map(day => day.trim()) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submit event:', event);
    console.log('FormData:', formData);
    try {
      const response = await updateClass(formData);
      console.log('Update Class response:', response);
      setSnackbarMessage('Class updated successfully!');
      setSnackbarSeverity('success');
      onUpdate(); // Call the onUpdate function passed as a prop
    } catch (error) {
      console.error('Update Class failed:', error);
      setSnackbarMessage('Failed to update class.');
      setSnackbarSeverity('error');
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Update Class
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Class ID"
                name="classID"
                value={formData.classID}
                onChange={handleChange}
                fullWidth
                margin="normal"
                disabled
              />
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
                value={formData.scheduleDays.join(', ')}
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
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                Update
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateClassForm;
