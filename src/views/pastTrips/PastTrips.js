import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
import ExTablePastTrips from "./ExTablePastTrips";

const PastTrips = () => {

  const navigate = useNavigate();


  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h3">Past Trips List</Typography>

            
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTablePastTrips />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PastTrips;
