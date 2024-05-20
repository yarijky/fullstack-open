import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import patientService from "../../services/patients";
import { Entry, Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      const fetchPatientList = async () => {
        const myPatient = await patientService.getPatient(id);
        setPatient(myPatient);
      };
      void fetchPatientList();
    }
  }, [id]);

  if (!patient) {
    return (
      <Box>
        <Typography align="center" variant="h6">
          {"No patient found"}
        </Typography>
      </Box>
    );
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} />;
      case "HealthCheck":
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <h2>{patient.name}</h2>
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Male && <MaleIcon />}
      </Box>
      {patient.ssn && <div>{`ssh ${patient.ssn}`}</div>}
      <div>{`occupation ${patient.occupation}`}</div>
      {patient.entries.length > 0 && <h3>{"entries"}</h3>}
      {patient.entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
    </Box>
  );
};

export default PatientPage;
