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

const ExTableUpComingTrips = () => {
  const [trips, setTrips] = useState([]); // Default to an empty array
  const [locations, setLocations] = useState({});

  useEffect(() => {
    fetchUpcomingTrips(); // Corrected function name
    fetchLocations(); // Fetch locations data
  }, []);

  const fetchUpcomingTrips = async () => {
    const userName = Cookies.get("userName"); // Get the logged-in user's username from cookies
    if (!userName) {
      console.error("User not logged in.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/tripAssign/upcomingTrips/${userName}`);
      const data = await response.json();
      console.log("Upcoming trips data:", data); // Log the upcoming trips data

      if (Array.isArray(data)) {
        setTrips(data); // Set the trips data only if it's an array
      } else {
        console.error("Unexpected data format for trips:", data);
      }
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
    }
  };

  // Fetch the location data
  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/locationDatas"); // Corrected endpoint
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
      aria-label="Upcoming trips table"
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
        {trips.length > 0 ? (
          trips.map((trip) => (
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} sx={{ textAlign: "center" }}>
              <Typography>No upcoming trips available</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExTableUpComingTrips;
