import { useEffect, useState } from "react";
import countries from "../services/countries";

const Country = ({ name }) => {
  const [selectedCountry, setSelectedCountry] = useState();
  useEffect(() => {
    countries.getCountry(name).then((response) => {
      setSelectedCountry(response.data);
    });
  }, [name]);

  console.log(selectedCountry)
  return (
    <div>
      <h1>{name}</h1>
      <div>
        capital{" "}
        {selectedCountry?.capital?.map((c) => (
          <span key={c}> {c}</span>
        ))}
      </div>
      <div>area {selectedCountry?.area}</div>
      <h3>languages</h3>
      {selectedCountry &&
        Object.values(selectedCountry.languages).map((lan) => (
          <li key={lan}> {lan}</li>
        ))}
      <img src={selectedCountry?.flags.svg}></img>
    </div>
  );
};

const Filter = ({ data: dataRaw }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataRaw);
  }, [dataRaw]);

  if (!dataRaw) return null;

  const showCountry = (name) => {
    setData([name]);
  };

  return (
    <div>
      {data.length === 0 && <div>Zero matches!</div>}
      {data.length === 1 && <Country name={data[0]} />}
      {data.length <= 10 &&
        data.length !== 1 &&
        data.map((country) => {
          return (
            <div key={country}>
              {country}{" "}
              <button onClick={() => showCountry(country)}>show</button>
            </div>
          );
        })}
      {data.length > 10 && <div>Too many matches, specify another filter</div>}
    </div>
  );
};

export default Filter;
