import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import './Login.css'; // Import custom CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any existing user-specific data from local storage
      localStorage.removeItem('studentID');
      localStorage.removeItem('teacherID');
      localStorage.removeItem('manager');
      localStorage.removeItem('authToken');
  
      const response = await login({ email, password });
  
      if (response.userType === 'student') {
        localStorage.setItem('studentID', response.userID);
      } else if (response.userType === 'teacher') {
        localStorage.setItem('teacherID', response.userID);
      } else if (response.userType === 'manager') {
        localStorage.setItem('manager', response.userID); 
      }
  
      // Save the token in localStorage (if returned by your API)
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
    <Container component="main" maxWidth="xs" className="login-container">
      <Paper elevation={3} className="login-paper">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} className="login-form">
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
            <Typography color="error" variant="body2" className="login-error">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="login-button"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
