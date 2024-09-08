import React from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "./Navbar";

const Contact = () => {
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

        {/* Form Section */}
        <Box display="flex" justifyContent="center" mb={4}>
          <Card style={{ maxWidth: 600, width: "100%" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Send Us a Message
              </Typography>
              <form>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={4}
                  required
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
