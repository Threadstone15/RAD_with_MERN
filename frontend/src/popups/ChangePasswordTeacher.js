import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { changeTeacherPassword } from '../services/api';

const ChangePasswordPopup = ({ open, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');


  const navigate = useNavigate();
  const teacherID = localStorage.getItem('teacherID');
  if(!teacherID) {
    navigate('/');
  }


  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirm password do not match');
      return;
    }
    try {
      const response = await changeTeacherPassword({
        teacherID,
        currentPassword,
        newPassword,
      })
      handleClose("Successfully changed password", "success");
    } catch (error){
      console.error("Couldn't change password");
    handleClose("Error changing password", "error");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your current password and your new password.
        </DialogContentText>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm New Password"
              type="password"
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              error={error !== ''}
              helperText={error}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleChangePassword} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordPopup;