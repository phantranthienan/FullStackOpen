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
      <form>
        <div>
          title{' '}
          <input
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleInputNewBlog}
          />
        </div>
        <div>
          author{' '}
          <input
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleInputNewBlog}
          />
        </div>
        <div>
          url{' '}
          <input
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleInputNewBlog}
          />
        </div>
        <button type="submit" onClick={addNewBlog}>
          create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
