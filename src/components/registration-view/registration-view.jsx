import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';

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
    <Form>
      <Form.Row className="justify-content-md-center">
      <Col md={3}>
        <h1 className="mb-4">Registration</h1>
        <Form.Group controlId="">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your name" />
          <Form.Text className="text-muted">
            First Name and Last Name
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address: </Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" />
        </Form.Group>
        <Form.Group controlId="">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter your birthday" />
          <Form.Text className="text-muted">
            YYYY-MM-DD
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a password" />
          <Form.Text className="text-muted">
            No restrictions
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
        </Col>
        </Form.Row>
      </Form>
  )
}

RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,  
  password: PropTypes.string.isRequired, 
  email: PropTypes.string.isRequired,
  birthday: PropTypes.instanceOf(Date)
};