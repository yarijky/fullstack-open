import React, { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, HospitalEntry } from "../../types";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    const fetchDiagnosesList = async () => {
      const myDiagnoses = await diagnosesService.getAll();
      setDiagnoses(myDiagnoses);
    };
    void fetchDiagnosesList();
  }, []);
  return (
    <div key={entry.id}>
      <span>
        {entry.date} <i>{entry.description}</i>
      </span>
      <ul>
        {entry.diagnosisCodes?.map((item) => (
          <li key={item}>
            {item}{" "}
            {diagnoses?.map((elem) => (elem.code === item ? elem.name : ""))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hospital;
