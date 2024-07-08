import { useState } from "react";

const Anecdote = ({ text, votes }) => {
  return (
    <p>
      {text} <br />
      has {votes} votes
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const updatedPoints = [...points];
    updatedPoints[selected] += 1;
    setPoints(updatedPoints);
  };

  const handleNext = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNumber);
  };

  const highestPoint = Math.max(...points);
  const mostVoted = points.findIndex((value) => value === highestPoint);

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote text={anecdotes[selected]} votes={points[selected]} />
      </div>
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNext}>next anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote
          text={anecdotes[mostVoted]}
          votes={points[mostVoted]}
        />
      </div>
    </>
  );
};

export default App;
