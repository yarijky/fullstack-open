const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return props.content.map((item) => {
    return (
      <p key={item.name}>
        {item.name} {item.exercises}
      </p>
    );
  });
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };
  const total = course.parts.reduce((s, a) => s + a.exercises, 0);
  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={total} />
    </div>
  );
};

export default App;
