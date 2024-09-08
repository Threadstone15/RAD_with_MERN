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
import { deleteFeedback } from "../services/api";

const FeedbackDetails = ({ open, onClose, feedbackData, onFeedbackDelete }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFeedback(feedbackData._id);
      onFeedbackDelete(feedbackData._id);
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
    setShowConfirmDialog(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
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

          <Typography variant="h6" component="h2" gutterBottom>
            Feedback Details
          </Typography>
          {feedbackData ? (
            <>
              <Typography variant="body1">
                <strong>Name:</strong> {feedbackData.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {feedbackData.email}
              </Typography>
              <Typography variant="body1">
                <strong>Message:</strong> {feedbackData.message}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {new Date(feedbackData.date).toLocaleDateString()}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteClick}
                >
                  Delete Feedback
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">No feedback details available.</Typography>
          )}
        </Box>
      </Modal>

      <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this feedback?</Typography>
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

export default FeedbackDetails;
