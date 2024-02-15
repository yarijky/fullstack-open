import { useState } from "react";

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
  const [points, setPoint] = useState({});
  const [best, setBest] = useState(undefined);

  const random = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const vote = () => {
    const copy = { ...points };
    copy[selected] = copy[selected] ? copy[selected] + 1 : 1;
    setPoint(copy);
    const keyBest = Object.keys(copy).reduce((a, b) => (copy[a] > copy[b] ? a : b))
    setBest(keyBest)
  }

  const TotalVote = ({ value }) => {
    if (!value) {
      return <div>has 0 vote</div>;
    }
    return (
      <div>
        <div>
          has {value} {value === 1 ? "vote" : "votes"}
        </div>
      </div>
    );
  };

  const Button = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
  };

  const Anecdote = ({ anecdote }) => {
    return <div>{anecdote}</div>;
  };

  return (
    <div>
      <h1>Anectdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} />
      <TotalVote value={points[selected]} />
      <Button text="vote" onClick={() => vote()} />
      <Button text="next anecdotes" onClick={() => setSelected(random)} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[best]} />
    </div>
  );
};

export default App;
