import { useState } from 'react';

const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = (event) => {
    event.preventDefault();
    likeBlog(blog);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.username === blog.user.username && (
            <button onClick={handleDelete}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};
export default Blog;
