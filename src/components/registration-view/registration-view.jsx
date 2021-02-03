import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState(''); // import useState() method with an empty string
  const [ password, setPassword ] = useState(''); // import useState() method with an empty string
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister('test');
    // send data to the server for putting it into MongoDB, then show LoginView (but how?)
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
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="button" onClick={handleRegistration}>Register</button>
    </form>
  );
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,  
  password: PropTypes.string.isRequired, 
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date)
};