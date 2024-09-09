import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/loginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError('Please enter a valid name.');
      return;
    }

    try {
      const response = await fetch('/balance/createBalance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userName': username,
        },
        body: JSON.stringify({ userID: username }),
      });

      if (!response.ok) {
        throw new Error('Failed to create balance.');
      }

      const data = await response.json();
      console.log('User created successfully:', data);

      localStorage.setItem('userID', username);

      setError(''); 
      onLogin(username);

      navigate('/');
    } catch (error) {
      setError('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Enter your name:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
