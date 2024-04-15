import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login request
    fetch('https://devies-reads-be.onrender.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      setSuccessMessage('Login successful!');
      setErrorMessage('');
      // Store token in local storage
      localStorage.setItem('token', data.accessToken);
      setLoggedIn(true);
    })
    .catch(error => {
      setSuccessMessage('');
      setErrorMessage(error.message);
    });
  };

  return (
    <div>
      {!loggedIn && ( 
        <>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
      {loggedIn && <Navigate to="/mybooks" />} 
    </div>
  );
}

export default Login;
