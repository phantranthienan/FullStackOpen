import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import CreateBlogForm from './components/CreateBlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });
  const [user, setUser] = useState(null);

  const createBlogFormRef = useRef();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    if (user) {
      fetchAllBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => setShowMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  const handleNotification = (message, type) => {
    setNotification({ message, type });
    setShowMessage(true);
  };

  const likeBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      });
      setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));
    } catch (error) {
      console.log(error);
    }
  };

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      handleNotification(`Welcome ${user.name}`, 'success');
    } catch (error) {
      handleNotification('Wrong username or password', 'error');
      console.log(error);
    }
  };

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      createBlogFormRef.current.toggleVisibility();
      setBlogs(blogs.concat(blog));
      handleNotification(
        `A new blog ${blog.title} by ${blog.author} added`,
        'success'
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        handleNotification(
          `Blog ${blog.title} by ${blog.author} removed`,
          'success'
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  if (user === null) {
    return (
      <>
        {showMessage && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <Togglable buttonLabel="login">
          <LoginForm login={login} />
        </Togglable>
      </>
    );
  }

  return (
    <div>
      <h2>Blogs</h2>

      {showMessage && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={createBlogFormRef}>
        <CreateBlogForm createBlog={createBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            likeBlog={likeBlog}
            deleteBlog={deleteBlog}
          />
        ))}
    </div>
  );
};

export default App;
