import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import countries from "./services/countries";

const App = () => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    countries.getAll().then((response) => {
      console.log(response)
    }
    )
  },[])

  return (
    <div>
      <h2>Countries</h2>
      <Filter filter={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default App;