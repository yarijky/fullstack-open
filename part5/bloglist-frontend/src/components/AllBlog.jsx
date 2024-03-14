import Blog from '../components/Blog'

const AllBlog = ({ blogs, handleDelete, handleUpdate }) => {
  return (
    <ul>
      {blogs
        ?.sort((a, b) => a.likes - b.likes)
        ?.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleDeleteBlog={handleDelete}
            handleUpdateBlog={handleUpdate}
          />
        ))}
    </ul>
  )
}

export default AllBlog
