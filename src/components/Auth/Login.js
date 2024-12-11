import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext"; // Import the AuthContext
import { TextField, Button, Typography, Box, CircularProgress } from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState(""); // Input for username
  const [password, setPassword] = useState(""); // Input for password
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // For navigation after login

  // Access login function from AuthContext
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error on each attempt

    try {
      const response = await fetch("http://localhost:5000/api/drivers");
      if (!response.ok) {
        throw new Error("Failed to fetch drivers");
      }

      const drivers = await response.json();
      const driver = drivers.find((d) => d.userName === userName && d.password === password);

      if (driver) {
        // Setting cookies upon successful login
        Cookies.set("primaryCookie", "Driver", { expires: 1 }); // Universal cookie for auth
        Cookies.set("userName", driver.userName, { expires: 1 }); // Specific cookie for userName

        // Calling login function from context to update state
        login(driver.userName);

        // Redirecting to the dashboard page after successful login
        navigate("/dashboards/dashboard1");
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while logging in. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Box sx={{ width: 400, padding: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography color="error" variant="body2" gutterBottom>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="UserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
