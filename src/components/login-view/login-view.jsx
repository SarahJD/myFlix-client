import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState(''); // import useState() method with an empty string
  const [ password, setPassword ] = useState(''); // import useState() method with an empty string

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // send a request to the server for authentication, then call props.onLoggedIn(username)
    props.onLoggedIn (username); // allows to automatically be logged in
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}