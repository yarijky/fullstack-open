const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return parts.map((item) => {
    return (
      <p key={item.name}>
        {item.name} {item.exercises}
      </p>
    );
  });
};

const Total = (props) => {
  return (
    <p>
      <b>Number of exercises {props.total}</b>
    </p>
  );
};

const Course = ({ courses }) => {
  if (!courses) return;
  {
    return courses.map((course) => {
      const total = course.parts.reduce((s, a) => s + a.exercises, 0);
      return (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total total={total} />
        </div>
      );
    });
  }
};

export default Course;
