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
import UpdateClassForm from "./UpdateClassForm";
import { deleteClass } from "../services/api"; // Make sure axios is imported in the api file

const ClassDetails = ({ open, onClose, classData, onUpdate }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showUpdateClassForm, setShowUpdateClassForm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    console.log("Deleting class with classID:", classData._id);
    try {
      const response = await deleteClass(classData._id); // Pass only the class ID
      console.log("Deleted class successfully:", response);
    } catch (error) {
      console.error("Couldn't delete class:", error.message);
    }
    setShowConfirmDialog(false);
    onClose(); // Close the details modal
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  const handleUpdateClick = () => {
    setShowUpdateClassForm(true); // Open UpdateClassForm modal
  };

  const handleCloseUpdateClass = () => {
    setShowUpdateClassForm(false); // Close UpdateClassForm modal
  };

  const handleUpdateSuccess = () => {
    console.log("Class updated successfully!");
    setShowUpdateClassForm(false); // Close UpdateClassForm modal
    onUpdate(); // Call the onUpdate function passed as prop

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

          <Box sx={{ mt: 5, mb: 2 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Class Details
            </Typography>
            {classData ? (
              <>
                <Typography variant="body1">
                  <strong>ID:</strong> {classData.classId}
                </Typography>
                <Typography variant="body1">
                  <strong>Name:</strong> {classData.className}
                </Typography>
                <Typography variant="body1">
                  <strong>Schedule Days:</strong> {classData.schedule.days.join(", ")}
                </Typography>
                {/* Add more fields as needed */}
                <Box
                  sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleDeleteClick}
                  >
                    Delete Class
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdateClick}
                    disabled={!classData} // Disable the button if there's no class data
                  >
                    Update Class Details
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body1">No class data available.</Typography>
            )}
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this class?</Typography>
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

      {/* Update Class Form Modal */}
      <UpdateClassForm
        open={showUpdateClassForm}
        onClose={handleCloseUpdateClass}
        classData={classData}
        onUpdate={handleUpdateSuccess}
      />
    </>
  );
};

export default ClassDetails;
