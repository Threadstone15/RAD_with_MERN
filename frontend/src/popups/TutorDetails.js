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
import AddTutorForm from "./AddTutorForm"; // Import AddTutorForm component
import { deleteTutor } from "../services/api";

const TutorDetails = ({ open, onClose, tutorData, onDelete, onUpdate }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showAddTutorForm, setShowAddTutorForm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDialog(false);
    try {
      const response = await deleteTutor({ TeacherID: tutorData.TeacherID });
    } catch {
      console.log("Couldn't delete teacher");
    }
    onClose(); // Close the details modal
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleUpdateClick = () => {
    setShowAddTutorForm(true); // Open AddTutorForm modal
  };

  const handleCloseAddTutorForm = () => {
    setShowAddTutorForm(false); // Close AddTutorForm modal
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
              Tutor Details
            </Typography>
            {tutorData ? (
              <>
                <Typography variant="body1">
                  <strong>ID:</strong> {tutorData.TeacherID}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {tutorData.profile.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {tutorData.profile.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Subjects:</strong> {tutorData.subjects}
                </Typography>
                <Typography variant="body1">
                  <strong>Telephone:</strong> {tutorData.profile.phone}
                </Typography>
                <Typography variant="body1">
                  <strong>Address:</strong> {tutorData.profile.address}
                </Typography>
              </>
            ) : (
              <Typography variant="body1">No tutor data available.</Typography>
            )}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteClick}
              >
                Delete Tutor
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateClick}
                disabled={!tutorData} // Disable the button if there's no tutor data
              >
                Update Tutor Details
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this tutor?</Typography>
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

      {/* Add/Edit Tutor Form Modal */}
      <AddTutorForm
        open={showAddTutorForm}
        onClose={handleCloseAddTutorForm}
        tutorData={tutorData}
      />
    </>
  );
};

export default TutorDetails;
