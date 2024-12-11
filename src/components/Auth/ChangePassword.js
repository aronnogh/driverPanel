import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [userName, setUserName] = useState(""); // To hold the API userName
  const [driverName, setDriverName] = useState(""); // To hold the driverName from the API
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch driver details on component mount based on the cookie userName
  useEffect(() => {
    const fetchDriverDetails = async () => {
      const driverNameFromCookie = Cookies.get("userName"); // Get userName from cookies

      if (!driverNameFromCookie) {
        setError("No user found in cookies.");
        return;
      }

      try {
        const response = await fetch(`https://backendserver-4urp.onrender.com/api/drivers/username/${driverNameFromCookie}`);
        if (!response.ok) {
          throw new Error("Failed to fetch driver details.");
        }

        const driver = await response.json();

        if (driver) {
          setUserName(driver.userName); // Set the userName from API
          setDriverName(driver.driverName); // Set the driverName from API
        } else {
          setError("Driver details not found.");
        }
      } catch (err) {
        setError("An error occurred while fetching driver details.");
        console.error(err);
      }
    };

    fetchDriverDetails();
  }, []);

  // Handle password change on form submission
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`https://backendserver-4urp.onrender.com/api/drivers/username/${userName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch driver details.");
      }

      const driver = await response.json();

      if (driver) {
        if (driver.password === oldPassword) {
          // Update password if old password matches
          const updateResponse = await fetch(
            `https://backendserver-4urp.onrender.com/api/drivers/update/${driver._id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...driver, password: newPassword }),
            }
          );

          if (!updateResponse.ok) {
            throw new Error("Failed to update the password.");
          }

          setSuccess("Password updated successfully.");
          setOldPassword("");
          setNewPassword("");

          // After successful password change, navigate to home
          navigate("/"); // Redirect to home page
        } else {
          setError("Old password is incorrect.");
        }
      } else {
        setError("Driver not found.");
      }
    } catch (err) {
      setError("An error occurred while updating the password. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Change Password
          </Typography>

          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" variant="body2" gutterBottom>
              {success}
            </Typography>
          )}

          <form onSubmit={handlePasswordChange}>
            <TextField
              label="UserName"
              value={userName}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Driver Name"
              value={driverName}
              fullWidth
              sx={{ mb: 2 }}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ChangePassword;
