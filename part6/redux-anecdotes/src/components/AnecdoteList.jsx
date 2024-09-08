import { useSelector, useDispatch } from 'react-redux';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { notify } from '../reducers/notificationReducer';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      {anecdote.content} {anecdote.votes}{' '}
      <button onClick={handleClick}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const filteredAnecdotes= anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));

  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(voteForAnecdote(id));
    dispatch(notify(`You voted for '${anecdotes.find((a) => a.id === id).content}'`, 5));
  };
  
  return (
    <div>
        {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote.id)}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;