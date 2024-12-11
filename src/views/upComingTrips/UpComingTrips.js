import React from "react";

import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExTableUpComingTrips from "./ExTableUpComingTrips";

const UpComingTrips = () => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h3">Upcoming Trips</Typography>            
          </Box>
          <Box
            sx={{
              overflow: {
                xs: "auto",
                sm: "unset",
              },
            }}
          >
            <ExTableUpComingTrips />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UpComingTrips;
