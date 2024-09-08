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
import Logo from "../assets/logo.png";
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
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#333", color: "#fff", zIndex: 1100 }}
      >
        <Container>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src={Logo}
                alt="Logo"
                width={40}
                height={40}
                style={{ marginRight: 16 }}
              />
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": {
                    color: "#f0f0f0",
                  },
                }}
              >
                Tutor
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                About Us
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
                Contact Us
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/gallery"
                sx={{
                  "&:hover": {
                    backgroundColor: "#555",
                  },
                }}
              >
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

      <Login open={isLoginOpen} onClose={handleCloseLogin} />
    </>
  );
};

export default Navbar;
