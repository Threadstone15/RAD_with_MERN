import React from 'react';
import { Box, TextField, Button, Typography, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon for the close button

const AddStudentForm = ({ open, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    onClose();
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
          <form onSubmit={handleSubmit}>
            <TextField label="Name" fullWidth margin="normal" required />
            <TextField label="Email" fullWidth margin="normal" required />
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              margin="normal"
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField label="Medium" fullWidth margin="normal" required />
            <TextField label="School" fullWidth margin="normal" required />
            <TextField label="Address" fullWidth margin="normal" required />
            <TextField label="Parent's Name" fullWidth margin="normal" required />
            <TextField label="Parent's Contact Number" fullWidth margin="normal" required />
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
