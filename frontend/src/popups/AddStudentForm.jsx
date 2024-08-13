import React from 'react';
import { Box, TextField, Button, Typography, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button
import axios from 'axios';
import {addStudent} from '../services/api';
axios.defaults.withCredentials = true;


const AddStudentForm = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    DOB: '',
    Medium: '',
    School: '',
    Address: '',
    PName:'',
    PContact:'',
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Sending request");
    try {
      const response = await addStudent(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    onClose();
  };

  const handleChange = (e) => {
    console.log("Changing");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: '80vh', // Reduce the maximum height for a shorter modal
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          overflowY: 'auto', // Make content scrollable if it overflows
          display: 'flex',
          flexDirection: 'column',
          margin:0, // Ensure the close button is positioned correctly
        }}
      >
        {/* Close Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            top: 10,
            right: 10,
          }}
        >
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* Content Container */}
        <Box sx={{ mt: 5, mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom sx={{margin:0,}}>
            Add Student
          </Typography>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            <TextField label="Name" name="Name" value={formData.Name} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Email" name="Email" value={formData.Email}onChange={handleChange}  fullWidth margin="normal" required />
            <TextField
              label="Date of Birth"
              value={formData.DOB}
              name="DOB"
              type="date"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
            <TextField label="Medium" name="Medium" value={formData.Medium} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="School" name="School"value={formData.School} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Address" name="Address"value={formData.Address} onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Parent's Name" value={formData.PName} name="PName" onChange={handleChange} fullWidth margin="normal" required />
            <TextField label="Parent's Contact Number" value={formData.PContact} name="PContact" onChange={handleChange} fullWidth margin="normal" required />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
              Add Student
            </Button>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddStudentForm;
