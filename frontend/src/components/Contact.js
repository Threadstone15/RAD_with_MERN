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
import Navbar from "./Navbar";
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
      setShowSnackbar(true);
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
      <Navbar />
      <Container maxWidth="lg">
        <Box my={4} textAlign="center">
          <Typography variant="h2" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" color="textSecondary" paragraph>
            We’d love to hear from you! Get in touch with us using the form
            below or through our contact details.
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" mb={4}>
          <Card style={{ maxWidth: 600, width: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
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
            {errorMessage || "Feedback given successful"}
          </Alert>
        </Snackbar>
        {/* Contact Details Section */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Card style={{ maxWidth: 600, width: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Our Contact Details
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Address:</strong> 123 Success Street, Colombo, Sri Lanka
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Phone:</strong> +94 77 123 4567
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                <strong>Email:</strong> info@successinstitute.com
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
};

export default Contact;
