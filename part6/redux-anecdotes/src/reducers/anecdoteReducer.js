import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdotesSlice = createSlice({
  name: "anectodes",
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    updateAnecdote(state, action) {
      const anecdoteId = action.payload.id;
      return state.map((anecdote) =>
        anecdote.id !== anecdoteId ? anecdote : action.payload
      );
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const voteAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdoteService.updateAnecdote(anecdote.id, voteAnecdote);
    dispatch(updateAnecdote(voteAnecdote));
  };
};

export default anecdotesSlice.reducer;
