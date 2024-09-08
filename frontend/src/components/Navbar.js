import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png"; // Import the PNG file
import { handleLogout } from "./logout"; // Import the handleLogout function
import Login from "./Login"; // Import the Login popup component

const Navbar = () => {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const [isLoginOpen, setIsLoginOpen] = useState(false); // State to manage login popup visibility

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#333", color: "#fff" }}>
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Section: Logo and Title */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                style={{ marginRight: 16 }}
              />
              <Typography variant="h6" component="div">
                Tutor
              </Typography>
            </Box>

            {/* Center Section: Navigation Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
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
            </Box>

            {/* Right Section: Conditional Button */}
            {isDashboard ? (
              <Button
                color="inherit"
                onClick={handleLogout}
                sx={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#c82333" },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleLoginClick} // Open login popup
                sx={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  "&:hover": { backgroundColor: "#0056b3" },
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Render Login Popup */}
      <Login open={isLoginOpen} onClose={handleCloseLogin} />
    </>
  );
};

export default Navbar;
