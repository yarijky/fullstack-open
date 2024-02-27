import axios from "axios";
// const baseUrl = 'http://localhost:3001/persons' //singolo esercizio
// const baseUrl = 'http://localhost:3001/api/phonebook' //insieme al server absolute
const baseUrl = "/api/phonebook"; //insieme al server relative

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  deletePerson: deletePerson,
};
