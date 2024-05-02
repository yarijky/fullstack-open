import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdotes = (newAnecdotes) =>
  axios.post(baseUrl, newAnecdotes).then((res) => res.data);

export const updateAnecdote = (updateAnecdote) => {
  axios.put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote).then(res => res.data);
};
