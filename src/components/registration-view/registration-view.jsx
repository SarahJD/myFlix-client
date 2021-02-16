import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Form } from 'react-bootstrap';
import './registration-view.scss'; 

export function RegistrationView() {
  const [ username, setUsername ] = useState(''); // import useState() method with an empty string
  const [ password, setPassword ] = useState(''); // import useState() method with an empty string
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [usernameErr, setUsernameErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});
  const [birthdayErr, setBirthdayErr] = useState({});

  const handleRegistration = (e) => {
    e.preventDefault();
    if (birthday === '') {
      formValidation();
      return;
    }
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
      console.log('error registering the user');
      formValidation();
    });
  };
    
  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const confirmPasswordErr = {};
    const emailErr = {};
    const birthdayErr = {};
    const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let checkEmail = emailReg.test(email);
    let isValid = true;

    if (birthday === '') {
      birthdayErr.selectDate = 'Please Select a Date';
      isValid = false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      confirmPasswordErr.confirmNotMatch = 'Password does not match';
      isValid = false;
    }

    if (username.trim().length < 5) {
      usernameErr.userNameShort = 'Username is too short';
      isValid = false;
    }

    if (username.trim().length > 10) {
      usernameErr.userNameLong = 'Username is too long';
      isValid = false;
    }

    if (username.trim().length === 0) {
      usernameErr.userNameRequired = 'Username is required';
      isValid = false;
    }

    if (password.trim().length < 5) {
      passwordErr.passwordShort = 'Password is too short';
      isValid = false;
    }

    if (password.trim().length > 50) {
      passwordErr.passwordLong = 'Password is too long';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordRequired = 'Password is required';
      isValid = false;
    }

    if (confirmPassword.trim().length < 5) {
      confirmPasswordErr.confirmPasswordShort = 'Password is too short';
      isValid = false;
    }

    if (confirmPassword.trim().length > 50) {
      confirmPasswordErr.confirmPasswordLong = 'Password is too long';
      isValid = false;
    }

    if (confirmPassword.trim().length === 0) {
      confirmPasswordErr.confirmPasswordRequired = 'Password is required';
      isValid = false;
    }

    if (!checkEmail) {
      emailErr.emailInvalid = 'Invalid Email';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setBirthdayErr(birthdayErr);
    setPasswordErr(passwordErr);
    setConfirmPasswordErr(confirmPasswordErr);
    setEmailErr(emailErr);
    return isValid;
  };

  return (
    <Form className="form-register">
      <Form.Row className="justify-content-md-center">
        <Col md={3}>
          <h1 className="mb-4">Registration</h1>
          <Form.Group controlId="">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Create a Username" />
            <Form.Text className="text-muted desc-text">
              5-10 Characters
            </Form.Text>
            {Object.keys(usernameErr).map((key) => {
            return <div style={{ color: 'black' }}>{usernameErr[key]}</div>;
          })}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address: </Form.Label>
            <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" />
            {Object.keys(emailErr).map((key) => {
            return <div style={{ color: 'black' }}>{emailErr[key]}</div>;
          })}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a Password" />
            <Form.Text className="text-muted desc-text">
              5-10 Characters
            </Form.Text>
            {Object.keys(passwordErr).map((key) => {
            return <div style={{ color: 'black' }}>{passwordErr[key]}</div>;
          })}
          </Form.Group>
          <Form.Group controlId='formBasicConfirmPassword'>
            <Form.Label>Confirm Password: </Form.Label>
            <Form.Control type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Password'
            />
            {Object.keys(confirmPasswordErr).map((key) => {
              return (
                <div style={{ color: 'black' }}>{confirmPasswordErr[key]}</div>
              );
            })}
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Birthday: </Form.Label>
            <Form.Control type='date' value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter Your Birthday" />
            {Object.keys(birthdayErr).map((key) => {
            return <div style={{ color: 'black' }}>{birthdayErr[key]}</div>;
          })}
          </Form.Group>
          <Button className="btn" variant="dark" className="button mt-4 mb-4" type="submit" onClick={handleRegistration}>
            Register
          </Button>
        </Col>
      </Form.Row>
    </Form>
  )
}

