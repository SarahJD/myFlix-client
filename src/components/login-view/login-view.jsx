import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState(''); // import useState() method with an empty string
  const [ password, setPassword ] = useState(''); // import useState() method with an empty string

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflixwomo.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn (data);  // triggers the onLoggedIn method of the "main-view.jsx" file
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Router>
    <Form>
    <Form.Row className="justify-content-md-center">
      <h1 className="mb-4 mt-4">Login to myFlix</h1>
    </Form.Row>
    <Form.Row className="justify-content-md-center">
    <Col md={3}>
      <Form.Group controlId="">
        <Form.Label>Username: </Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
      </Form.Group>
      <Button variant="dark" className="button mt-4 mb-4" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <p>Don't have an account? 
        <Link to="/register">
          <Button variant="link">Register</Button>
        </Link>
      </p>
      </Col>
      </Form.Row>
    </Form>
</Router>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,  
    password: PropTypes.string.isRequired, 
  })
}