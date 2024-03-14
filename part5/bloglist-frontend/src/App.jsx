import { useState, useEffect, useRef } from "react";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AllBlog from "./components/AllBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogVisible, setNewBlogVisible] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState({ content: "", type: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const onLogout = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setMessage({ content: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login in</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const addBlog = (blogObject) => {
    setNewBlogVisible(false);
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setMessage({ content: "blog created correctly", type: "success" });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    });
  };

  const deleteBlog = (blog) => {
    setBlogs(
      blogs.filter((blg) => {
        if (blog.id !== blg.id) {
          return blog;
        }
      })
    );
    setMessage({
      content: `${blog.title} has been deleted correctly`,
      type: "correct",
    });
  };

  const updateBlog = (putBlog) => {
    console.log(putBlog);
    setBlogs(blogs.map((blog) => (blog.id !== putBlog.id ? blog : putBlog)));
    setMessage({
      content: `Number of like increment to ${putBlog.likes} correctly`,
      type: "correct",
    });
  };

  return (
    <div>
      <h1>Blogs</h1>
      {message && (
        <Notification message={message.content} type={message.type} />
      )}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={() => onLogout()}>logout</button>
          <h2>blogs</h2>
          {newBlogVisible && <BlogForm createBlog={addBlog} />}
          <button onClick={() => setNewBlogVisible(!newBlogVisible)}>
            {newBlogVisible ? "cancel" : "new post"}
          </button>
          <AllBlog
            blogs={blogs}
            handleDelete={deleteBlog}
            handleUpdate={updateBlog}
          />
        </div>
      )}
    </div>
  );
};

export default App;
