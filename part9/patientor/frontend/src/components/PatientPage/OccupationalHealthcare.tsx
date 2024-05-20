import React from "react";
import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import { Box } from "@mui/material";

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <Box sx={{ border: 1, padding: 2, margin:2 }}>
    <Box sx={{ display: "inline-flex" }}>
      <div>{entry.date} </div> <WorkIcon /> {entry.employerName}
    </Box>
    <div>{entry.description}</div>
    <div>{`diagnose by ${entry.specialist}`}</div>
  </Box>
);

export default OccupationalHealthcare;
