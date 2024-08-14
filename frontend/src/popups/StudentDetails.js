import React, { useState } from 'react';
import { Box, Typography, Modal, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const StudentDetails = ({ open, onClose, studentData, onDelete, onUpdate }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    onDelete(studentData.id); // Call the delete function passed as a prop
    onClose(); // Close the details modal
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleUpdateClick = () => {
    onUpdate(studentData); // Call the update function passed as a prop
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
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
            <Typography variant="h6" component="h2" gutterBottom>
              Student Details
            </Typography>
            {studentData && (
              <>
                <Typography variant="body1"><strong>Name:</strong> {studentData.name}</Typography>
                <Typography variant="body1"><strong>Student ID:</strong> {studentData.id}</Typography>
                <Typography variant="body1"><strong>Attending Classes:</strong> {studentData.classes}</Typography>
                <Typography variant="body1"><strong>Grade:</strong> {studentData.grade}</Typography>
                <Typography variant="body1"><strong>Additional Info:</strong> {studentData.additionalInfo}</Typography>
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button 
                variant="contained" 
                color="secondary" 
                onClick={handleDeleteClick}
              >
                Delete Student
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleUpdateClick}
              >
                Update Student Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog
        open={showConfirmDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this student?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentDetails;
