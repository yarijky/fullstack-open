import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import patientService from "../../services/patients";
import { Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

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
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: "center"}}>
        <h2>{patient.name}</h2>
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Male && <MaleIcon />}
      </Box>
      {patient.ssn && <div>{`ssh ${patient.ssn}`}</div>}
      <div>{`occupation ${patient.occupation}`}</div>
    </Box>
  );
};

export default PatientPage;
