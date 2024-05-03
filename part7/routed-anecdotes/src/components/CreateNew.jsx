import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

export const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField("content")
  const author = useField("author")
  const info = useField("info")

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            name={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            name={info.type}
            value={info.value}
            onChange={info.onChange}
          />
        </div>
        <button type="submit">create</button>
        <button type="reset"onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};
