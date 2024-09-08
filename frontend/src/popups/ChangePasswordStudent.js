import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Grid,
} from "@mui/material";
import { changeStudentPassword } from "../services/api";
import { useNavigate } from "react-router-dom";

const ChangePasswordPopup = ({ open, handleClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const studentID = localStorage.getItem("studentID");
  if (!studentID) {
    navigate("/login");
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm password do not match");
      return;
    }
    try {
      const response = await changeStudentPassword({
        studentID,
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error("Couldn't change password");
    }

    // On success, close the popup
    handleClose();
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
              error={error !== ""}
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
