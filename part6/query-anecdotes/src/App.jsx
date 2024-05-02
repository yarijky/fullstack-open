import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useNotificationDispatch,
} from "./NotificationContext";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./services/requests";

const App = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const notificationReducer = (state, action) => {
    switch (action.type) {
      case "showNotification":
        return action.payload;
      case "hideNotification":
        return "";
      default:
        return state;
    }
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const updateAnecdotesMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((ancd) =>
          ancd.id === updatedAnecdote.id ? updatedAnecdote : ancd
        )
      );
    },
  });

  const handleVote = async (anecdote) => {
    updateAnecdotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    await dispatch({
      type: "showNotification",
      payload: `You voted: ${anecdote.content} !`,
    });

    setTimeout(() => {
      dispatch({ type: "hideNotification" });
    }, 5000);
  };

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
