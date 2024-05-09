import axios from "axios";
import { useState } from "react";


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  
  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
    return response.data
  }

  const create =  async (resource) => {
    
    // const config = {
    //   headers: { Authorization: token },
    // }
  
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
    return response.data
  };

  const service = {
    create,
    getAll
  };

  return [resources, service];
};
