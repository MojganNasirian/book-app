import React, { useState } from 'react';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [signedUp, setSignedUp] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send signup request
    fetch('https://devies-reads-be.onrender.com/auth/register', {
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
        throw new Error('Error signing up');
      }
    })
    .then(data => {
      setSuccessMessage('Signup successful!');
      setErrorMessage('');
      setSignedUp(true);
    })
    .catch(error => {
      setSuccessMessage('');
      setErrorMessage('Error signing up');
    });
  };

  return (
    <div>
      {!signedUp && ( 
        <>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {successMessage && <p>{successMessage}</p>}
          {errorMessage && <p>{errorMessage}</p>}
        </>
      )}
    </div>
  );
}

export default Signup;
