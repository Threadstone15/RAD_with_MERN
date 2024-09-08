import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { sendFeedback } from "../services/api";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendFeedback(formData);
      console.log("This got executed");
      setShowSnackbar(true); // Display success message if needed
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting Feedback form");
      setErrorMessage(error.response?.data?.error || "An error occurred");
      setShowSnackbar(true);
    }
  };

  return (
    <div>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #b3e5fc, white)", // Light blue to white gradient
          minHeight: "100vh",
          paddingTop: 4,
          paddingBottom: 4,
          color: "#333", // Default text color
        }}
      >
        <Container maxWidth="lg">
          <Box my={4} textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ color: "#2d3436" }}
            >
              Contact Us
            </Typography>
            <Typography
              variant="h5"
              color="textSecondary"
              paragraph
              sx={{ color: "#4a4a4a" }}
            >
              We’d love to hear from you! Get in touch with us using the form
              below or through our contact details.
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" mb={4}>
            <Card
              sx={{
                maxWidth: 600,
                width: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ color: "#2d3436" }}>
                  Send Us a Message
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    margin="normal"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 2 }}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>

          <Snackbar
            open={showSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={errorMessage ? "error" : "success"}
            >
              {errorMessage || "Feedback given successfully"}
            </Alert>
          </Snackbar>

          {/* Contact Details Section */}
          <Box display="flex" justifyContent="center" mt={4}>
            <Card
              sx={{
                maxWidth: 600,
                width: "100%",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h4" gutterBottom sx={{ color: "#2d3436" }}>
                  Our Contact Details
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  paragraph
                  sx={{ color: "#555" }}
                >
                  <strong>Address:</strong> 123 Success Street, Colombo, Sri
                  Lanka
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  paragraph
                  sx={{ color: "#555" }}
                >
                  <strong>Phone:</strong> +94 77 123 4567
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  paragraph
                  sx={{ color: "#555" }}
                >
                  <strong>Email:</strong> info@successinstitute.com
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Contact;
