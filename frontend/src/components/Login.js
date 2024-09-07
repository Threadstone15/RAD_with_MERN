import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { TextField, Button, Typography, Box, Modal, Paper, Link, Checkbox, FormControlLabel, Grid } from '@mui/material';
import './Login.css';
import Logo from '../assets/logo.png';

const Login = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();

      const response = await login({ email, password });

      if (response.userType === 'student') {
        localStorage.setItem('studentID', response.userID);
      } else if (response.userType === 'teacher') {
        localStorage.setItem('teacherID', response.userID);
      } else if (response.userType === 'manager') {
        localStorage.setItem('manager', response.userID);
      }

      if (response.token) {
        localStorage.setItem('authToken', response.token);
      }

      if (response.redirectUrl) {
        navigate(response.redirectUrl);
      } else {
        setErrorMessage('Login failed: Invalid credentials');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage('Login failed: Invalid credentials or server error');
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Paper elevation={6} sx={{ p: 4, maxWidth: 500, mx: 'auto', my: '20vh', borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" id="login-modal-title" align="center" gutterBottom>
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
        {/* Right Section: Image/Illustration */}
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="h6">Success Higher Education Institute</Typography>
          <Typography variant="body2">
            Your Higher Education Partner - Your Pathmaker
          </Typography>
          {/* Replace with your illustration */}
          <img src={Logo} alt="Logo" width={60} height={60} style={{ marginRight: 16 }} />
        </Grid>
      </Paper>
    </Modal>
  );
};

export default Login;
