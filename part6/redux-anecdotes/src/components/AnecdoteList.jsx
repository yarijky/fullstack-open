import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((ancds) =>
      ancds.content.includes(state.filter)
    );
  });

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`VOTED: ${content}`))
  };

  return [...anecdotes]
    .sort((x, y) => y.votes - x.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
