import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");
  const dispatch = useDispatch();

  const addAnecdotes = () => {
    event.preventDefault();
    const content = newAnecdote;
    dispatch(createAnecdote(content));
    dispatch(showNotification(`CREATED: ${content}`))
  };

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
          <input
            className="anecdote"
            value={newAnecdote}
            onChange={() => setNewAnecdote(event.target.value)}
          />
        </div>
        <button onClick={() => addAnecdotes()}>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
