import { useState } from 'react';

const CreateBlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleInputNewBlog = (event) => {
    const { name, value } = event.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const addNewBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBlog.title}
            onChange={handleInputNewBlog}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newBlog.author}
            onChange={handleInputNewBlog}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={newBlog.url}
            onChange={handleInputNewBlog}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default CreateBlogForm;