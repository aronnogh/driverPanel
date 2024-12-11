import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaPenNib } from "react-icons/fa6";

const ExTableCar = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  // Fetch cars on component mount
  useEffect(() => {
    fetchCars();
  }, []);

  // Fetch all cars from the API
  const fetchCars = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/cars/");
      if (!response.ok) throw new Error("Failed to fetch cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a car by ID
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cars/delete/${deleteId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete car");
      setCars(cars.filter((car) => car._id !== deleteId));
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setDeleteId(null); // Close confirmation dialog
    }
  };

  // Navigate to edit page for a car
  const handleEdit = (id) => {
    navigate(`/car/update/${id}`);
  };

  // Render table rows
  const renderTableRows = () =>
    cars.map((car) => (
      <TableRow key={car._id}>
        <TableCell>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            {car.carName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            {car.driverName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            {car.carNumber}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            {car.brand}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
            {car.capacity}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Button
            variant="contained"
            color="secondary"
            sx={{ mr: 1 }}
            onClick={() => handleEdit(car._id)}
          >
            <FaPenNib fontSize="15" />
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setDeleteId(car._id)} // Open delete confirmation dialog
          >
            <MdDelete fontSize="15" />
          </Button>
        </TableCell>
      </TableRow>
    ));

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Car Management
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading cars...</Typography>
        </Box>
      ) : cars.length === 0 ? (
        <Typography color="textSecondary" sx={{ textAlign: "center", mt: 3 }}>
          No cars found.
        </Typography>
      ) : (
        <Table
          aria-label="car table"
          sx={{
            mt: 3,
            whiteSpace: "nowrap",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Car Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Driver Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Car Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Brand
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Capacity
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" variant="h6">
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Car</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this car? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ExTableCar;
