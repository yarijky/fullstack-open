import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleDeleteBlog, handleUpdateBlog }) => {
  const [showAll, setShowAll] = useState(false);

  const handleLike = (blogId) => {
    const updatedLikes = blog.likes + 1;
    const updatedBlog = { ...blog, likes: updatedLikes };
    blogService.update(blogId, updatedBlog).then((returnedBlog) => {
      handleUpdateBlog(returnedBlog);
    });
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      blogService.deleteBlog(blog.id).then(() => {
        handleDeleteBlog(blog);
      });
    }
  };

  return !showAll ? (
    <div className="blog title">
      {blog.title}
      <button onClick={() => setShowAll(true)}>show</button>
    </div>
  ) : (
    <div className="blog title">
      {blog.title}
      <button onClick={() => setShowAll(false)}>hide</button>
      <div className="url">
        <a
          href="https://lh3.googleusercontent.com/proxy/vvvQ9Xtno1X98pgUKeYUW0BJEeUI9CVmhrLBBc_w2v9rwHUK4QRUeX8qmblCSO0sVB0TJ2hZAprdThP3gGxuexyq_6Xf19a1vBkNuRXnbanF7CkAw0PYqGaNOBHZslcfYzj8cYBPmAMAOUvTsW0p7Ysg1skPuSmFztw"
          target="_blank"
          rel="noreferrer"
        >
          {blog.url}
        </a>
      </div>
      <div className="likes">
        likes: {blog.likes}{' '}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>

      <div className="author">{blog.author}</div>
      <button onClick={() => handleDelete(blog)}>delete</button>
    </div>
  );
};

export default Blog;
