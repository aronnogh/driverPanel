import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Cookies from "js-cookie"; // To manage cookies

const ExTablePastTrips = () => {
  const [trips, setTrips] = useState([]);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    fetchPastTrips();
    fetchLocations(); // Fetch locations data
  }, []);

  const fetchPastTrips = async () => {
    const userName = Cookies.get("userName"); // Get the logged-in user's username from cookies
    if (!userName) {
      console.error("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`https://backendserver-4urp.onrender.com/api/tripassign/pastTrips/${userName}`);
      const data = await response.json();
      console.log("Past trips data:", data); // Log the past trips data
      setTrips(data);
    } catch (error) {
      console.error("Error fetching past trips:", error);
    }
  };

  // Fetch the location data
  const fetchLocations = async () => {
    try {
      const response = await fetch("https://backendserver-4urp.onrender.com/api/locationDatas"); // Corrected endpoint
      const data = await response.json();
      console.log("Location data:", data); // Log the location data

      const locationMap = data.reduce((acc, loc) => {
        acc[loc._id] = loc.locationName; // Map location ID to locationName
        return acc;
      }, {});

      console.log("Mapped locations:", locationMap); // Log the mapped locations
      setLocations(locationMap);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  return (
    <Table
      aria-label="Past trips table"
      sx={{
        mt: 3,
        whiteSpace: "nowrap",
      }}
    >
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Start Location
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              End Location
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Date
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Time
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="h6">
              Distance
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {trips.map((trip) => (
          <TableRow key={trip._id}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {locations[trip.startLocation] || trip.startLocation} {/* Use location name or ID */}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {locations[trip.endLocation] || trip.endLocation} {/* Use location name or ID */}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {new Date(trip.date).toLocaleDateString()}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {trip.time}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {trip.distance} km
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExTablePastTrips;
