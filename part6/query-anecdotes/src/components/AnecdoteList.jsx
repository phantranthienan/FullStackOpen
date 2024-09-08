import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, updateAnecdote } from '../requests';
import { useNotificationDispatch } from '../contexts/contextHelpers';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  const voteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      );
      notificationDispatch(setNotification('anecdote voted!'));
      setTimeout(() => {
        notificationDispatch(removeNotification());
      }, 3000);
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes);
    },
    onError: (error) => {
      console.log(error);
      notificationDispatch(setNotification(`error voting anecdote: ${error}`));
      setTimeout(() => {
        notificationDispatch(removeNotification());
      })
    }
  });

  if (result.isLoading) {
    return <div>Fetching anecdotes...</div>;
  }

  if (result.isError) {
    return <div>Error fetching anecdotes: {result.error}</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          vote={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;
