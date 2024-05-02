import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdotes } from "../services/requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: () => {
      dispatch({ type: 'showNotification', payload: `too short anecdote, must have length 5 or more !` })
      setTimeout(() => {
        dispatch({ type: 'hideNotification' })
      }, 5000)
    }
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });

    await dispatch({ type: 'showNotification', payload: `You added: ${content} !` })

    setTimeout(() => {
      dispatch({ type: 'hideNotification' })
    }, 5000)
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
