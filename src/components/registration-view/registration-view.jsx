import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './registration-view.scss'; 

export function RegistrationView(props) {
  const [ username, setUsername ] = useState(''); // import useState() method with an empty string
  const [ password, setPassword ] = useState(''); // import useState() method with an empty string
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  /*
  // for validation
  const txtFieldState = {
    value: "",
    valid: true,
    typeMismatch: false,
    errMsg: "..."
  };

  state: {
    username: { ... txtFieldState, fieldName: "Username", required: true, requiredTxt: "Username is required"}, 
    password: { ... txtFieldState, fieldName: "Password", required: true, requiredTxt: "Password is required"},
    email: { ...txtFieldState, fieldName: "Email", required: true, requiredTxt: "Email is required", formatErrorTxt: "Incorrect email format" },
    birthday: {... txtFieldState, fieldName: "Birthday", required: false},
    allFieldsValid: false
  };
  */



  const handleRegistration = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://myflixwomo.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // '_self' in order to open the page in the current tab and redirect to login ('/')
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };
    
  return (
    <Form className="form-inside-input" onSubmit={handleRegistration} noValidate>
      <Form.Row className="justify-content-md-center">
      <Col md={3}>
        <h1 className="mb-4">Registration</h1>
        <Form.Group controlId="">
          <Form.Label>Username: </Form.Label>
          <Form.Control type="text" name="txtFname" value={username} onChange={e => setUsername(e.target.value)} placeholder="Create a Username" required />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password: </Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a Password" required />
          <Form.Text className="text-muted desc-text">
            No restrictions
          </Form.Text>
        </Form.Group>
         <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address: </Form.Label>
          <Form.Control type="email" name="txtEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" required/>
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Birthday: </Form.Label>
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter your birthday" />
        </Form.Group>
        <Button className="btn" variant="dark" className="button mt-4 mb-4" type="submit" onClick={handleRegistration}>
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