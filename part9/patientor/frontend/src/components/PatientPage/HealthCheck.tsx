import React from "react";
import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Box } from "@mui/material";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  let style = { color: "green" };
  switch (entry.healthCheckRating) {
    case 0:
      style = { color: "green" };
      break;
    case 1:
      style = { color: "yellow" };
      break;
    case 2:
      style = { color: "orange" };
      break;
    case 3:
      style = { color: "red" };
      break;
  }
  return (
    <Box sx={{ border: 1, padding: 2, margin:2 }}>
      <Box sx={{ display: "inline-flex" }}>
        <div>{entry.date} </div> <MedicalServicesIcon />
      </Box>
      <div>{entry.description}</div>
      <FavoriteIcon style={style} />
      <div>{`diagnose by ${entry.specialist}`}</div>
    </Box>
  );
};

export default HealthCheck;
