import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png'; // Import the PNG file
import { handleLogout } from './logout'; // Import the handleLogout function

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', color: '#fff' }}>
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Section: Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" width={40} height={40} style={{ marginRight: 16 }} />
            <Typography variant="h6" component="div">
              Tutor
            </Typography>
          </Box>

          {/* Center Section: Navigation Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, justifyContent: 'center' }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/about">
              About Us
            </Button>
            <Button color="inherit" component={Link} to="/contact">
              Contact Us
            </Button>
            <Button color="inherit" component={Link} to="/gallery">
              Gallery
            </Button>
            <Button color="inherit" component={Link} to="/testimonials">
              Testimonials
            </Button>
          </Box>

          {/* Right Section: Conditional Button */}
          {isDashboard ? (
            <Button 
              color="inherit" 
              onClick={handleLogout} 
              sx={{ backgroundColor: '#dc3545', color: '#fff', '&:hover': { backgroundColor: '#c82333' } }}
            >
              Logout
            </Button>
          ) : (
            <Button 
              color="inherit" 
              component={Link} 
              to="/login" 
              sx={{ backgroundColor: '#007bff', color: '#fff', '&:hover': { backgroundColor: '#0056b3' } }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
