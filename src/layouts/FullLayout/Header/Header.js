import React, { useState } from "react";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { AppBar, Box, IconButton, Toolbar, Menu, MenuItem, Button, ListItemIcon } from "@mui/material";
import { useAuth } from "../../../components/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);  // Single state for menu anchor
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Open the settings menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the settings menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout handler
  const handleLogout = () => {
    handleMenuClose();  // Close the menu
    logout();  // Call logout function from context
    // Remove authentication data (tokens, cookies, etc.)
    localStorage.removeItem("token");
    Cookies.remove("primaryCookie");
    Cookies.remove("username");
    // Redirect user to login page
    navigate("/login");
  };

  // Change Password handler
  const handleChangePassword = () => {
    handleMenuClose();  // Close the menu
    // Redirect to the Change Password page
    navigate("/change-password");
  };

  // Accessibility: Open menu when the 'Enter' or 'Space' key is pressed
  const handleMenuKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handleMenuOpen(event);
    }
  };

  // Accessibility: Close menu when the 'Esc' key is pressed
  const handleMenuCloseKeyDown = (event) => {
    if (event.key === "Escape") {
      handleMenuClose();
    }
  };

  return (
    <AppBar sx={props.sx} elevation={0} className={props.customClass}>
      <Toolbar>
        {/* Hamburger Menu Icon for mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",  // Hide for large screens
              xs: "inline",  // Show for small screens
            },
          }}
        >
          <MenuOutlinedIcon width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />

        {/* Settings Button with Dropdown */}
        <Box sx={{ width: "1px", backgroundColor: "rgba(0,0,0,0.1)", height: "25px", ml: 1 }}></Box>
        <Button
          aria-label="menu"
          color="inherit"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          onKeyDown={handleMenuKeyDown}  // Added keyboard accessibility to open menu
        >
          Settings
        </Button>
        
        {/* Profile Dropdown Menu */}
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onKeyDown={handleMenuCloseKeyDown}  // Added keyboard accessibility to close menu
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "250px",
              right: 0,
              top: "70px !important",
            },
          }}
        >
          <MenuItem onClick={handleChangePassword}>
            <ListItemIcon>
              <VpnKeyOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Change Password
          </MenuItem>

          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlinedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
