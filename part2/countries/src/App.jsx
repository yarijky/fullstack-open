import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import countries from "./services/countries";
import Countries from "./components/Countries";

const App = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const onChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    countries.getAll().then((response) => {
      const allCountries = response.data.map((item) => item.name.common)
      const filtredData = allCountries?.filter(x => x?.toLowerCase().includes(filter?.toLowerCase()))
      setData(filtredData)
    });
  }, [filter]);

  return (
    <div>
      <Filter filter={filter} onChange={onChange} />
      <Countries data={data}/>
    </div>
  );
};

export default App;
