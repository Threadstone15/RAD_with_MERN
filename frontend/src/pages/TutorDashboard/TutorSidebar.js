import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Box, Typography, Divider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutDialog from '../../popups/LogoutConfirmation'; // Import LogoutDialog

const Sidebar = () => {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleOpenLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const handleCloseLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  const handleConfirmLogout = () => {
    // Logic for logging out (e.g., clearing user session)
    window.location.href = '/';
    setIsLogoutDialogOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#333',
          color: '#fff',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <img src={require('../../assets/logo.png')} alt="Logo" width={40} height={40} style={{ marginRight: 16 }} />
        <Typography variant="h6" component="div">
          Tutor
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: '#555' }} />

      <List>
        <ListItem button component={Link} to="/teacher-dashboard">
          <ListItemIcon sx={{ color: '#fff' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/teacher-dashboard/profile">
          <ListItemIcon sx={{ color: '#fff' }}>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button component={Link} to="/teacher-dashboard/payment">
          <ListItemIcon sx={{ color: '#fff' }}>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText primary="Payment" />
        </ListItem>
      </List>

      <Divider sx={{ backgroundColor: '#555' }} />

      <Box sx={{ padding: 2 }}>
        <Button
          color="inherit"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleOpenLogoutDialog}
          sx={{
            backgroundColor: '#dc3545',
            color: '#fff',
            '&:hover': { backgroundColor: '#c82333' },
          }}
        >
          Logout
        </Button>
      </Box>

      <LogoutDialog
        open={isLogoutDialogOpen}
        onClose={handleCloseLogoutDialog}
        onConfirm={handleConfirmLogout}
      />
    </Drawer>
  );
};

export default Sidebar;
