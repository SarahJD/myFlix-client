import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import './login-view.scss';
import { connect } from 'react-redux';

import { login } from '../../actions/actions';

function LoginView(props) {
  const [username, setUsername] = useState(''); // import useState() method with an empty string
  const [password, setPassword] = useState(''); // import useState() method with an empty string
  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidation();
    /* Use action */
    await props.login(username, password);
    history.push('/movieslist');
    history.go();
  };

  const formValidation = (serverError) => {
    // const usernameErr = {};
    // const passwordErr = {};
    let isValid = true;

    if (serverError === 'Invalid Credential') {
      usernameErr.invalidCredential = 'Invalid Credential';
      passwordErr.invalidCredential = 'Invalid Credential';
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

    if (password.trim().length > 10) {
      passwordErr.passwordLong = 'Password is too long';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.passwordRequired = 'Password is required';
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    return isValid;
  };

  return (
    <Form className="form-login">
      <Form.Row className="justify-content-md-center">
        <h1 className="heading-login">Login to myFlix</h1>
      </Form.Row>
      <Form.Row className="justify-content-md-center">
        <Col>
          <Form.Group controlId="">
            <Form.Label>Username: </Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" required />
            {Object.keys(usernameErr).map((key) => <div style={{ color: 'black' }}>{usernameErr[key]}</div>)}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password: </Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
            {Object.keys(passwordErr).map((key) => <div style={{ color: 'black' }}>{passwordErr[key]}</div>)}
          </Form.Group>
          <Button variant="dark" className="button mt-4 mb-4" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <p>
            Don&apos;t have an account?
            <Link to="register">
              <Button variant="link" className="register-link">Register</Button>
            </Link>
          </p>
        </Col>
      </Form.Row>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
  login: PropTypes.func.isRequired,
};

LoginView.defaultProps = {
  user: {},
};

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login,
};

export default connect(mapState, actionCreators)(LoginView);
