import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const handleChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.title]: event.target.value });
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = newBlog;
    createBlog(blogObject);
    setNewBlog({ title: "", author: "", url: "" });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        title:{" "}
        <input value={newBlog?.title} title="title" onChange={handleChange} />
      </div>
      <div>
        author:{" "}
        <input value={newBlog?.author} title="author" onChange={handleChange} />
      </div>
      <div>
        url: <input value={newBlog?.url} title="url" onChange={handleChange} />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
    </form>
  );
};

export default BlogForm;
