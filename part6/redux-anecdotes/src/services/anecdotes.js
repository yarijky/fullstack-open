import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, vote: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateAnecdote = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const getAnecdote = (id) => {
  return axios.get(`${baseUrl}/${id}`);
};

export default { getAll, createNew, updateAnecdote, getAnecdote };
