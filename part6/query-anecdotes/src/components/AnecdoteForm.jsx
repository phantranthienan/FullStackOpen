import { createAnecdote } from '../requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from '../contexts/contextHelpers';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      notificationDispatch(setNotification(`a new anecdote "${newAnecdote.content}" created!`));
      setTimeout(() => {
        notificationDispatch(removeNotification());
      }, 3000)
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    },
    onError: (error) => {
      console.log(error);
      notificationDispatch(setNotification(`error creating anecdote: ${error.response.data.error}`));
      setTimeout(() => {
        notificationDispatch(removeNotification());
      }, 3000)
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    newAnecdoteMutation.mutate(content);
    event.target.anecdote.value = '';
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
