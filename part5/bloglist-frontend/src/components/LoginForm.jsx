import { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };
  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input type="text" value={username} onChange={handleInputUsername} />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={handleInputPassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
