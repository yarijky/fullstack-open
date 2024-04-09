import { createSlice } from "@reduxjs/toolkit";

const anecdotesSlice = createSlice({
  name: "anectodes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const id = action.payload;
      const anecdoteToVote = state.find((n) => n.id === id);
      const voteAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : voteAnecdote
      );
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createAnecdote, voteAnecdote, setNotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
