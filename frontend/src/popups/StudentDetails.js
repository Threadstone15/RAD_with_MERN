import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdateStudentForm from "./UpdateStudentForm";
import { deleteStudent } from "../services/api";

const StudentDetails = ({ open, onClose, studentData, onDelete, onUpdate }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting student with StudentID:", studentData.studentID);
    setShowConfirmDialog(false);
    try {
      const response = await deleteStudent({
        studentID: studentData.studentID,
      });
      console.log("Deleted student successfully:", response);
    } catch (error) {
      console.log("Couldn't delete student:", error.message);
    }
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleUpdateClick = () => {
    setShowAddStudentForm(true);
  };

  const handleCloseUpdateStudent = () => {
    onClose();
    setShowAddStudentForm(false);
  };

  const handleUpdateSuccess = () => {
    onUpdate();
    console.log("Student updated successfully!");
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Close Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
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
            {studentData ? (
              <>
                <Typography variant="body1">
                  <strong>ID:</strong> {studentData.studentID}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {studentData.profile.Name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {studentData.profile.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Date of Birth:</strong> {studentData.profile.DOB}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone:</strong> {studentData.profile.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {studentData.profile.Address}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">
                No student data available.
              </Typography>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
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
                disabled={!studentData} // Disable the button if there's no student data
              >
                Update Student Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
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

      <UpdateStudentForm
        open={showAddStudentForm}
        onClose={handleCloseUpdateStudent}
        studentData={studentData}
        onUpdate={handleUpdateSuccess}
      />
    </>
  );
};

export default StudentDetails;
