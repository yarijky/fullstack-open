import { useState } from "react";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState("");
  const dispatch = useDispatch();

  const addAnecdotes = () => {
    event.preventDefault();
    const content = newAnecdote;
    dispatch({
      type: "NEW_ANECDOTE",
      payload: { content: content },
    });
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
