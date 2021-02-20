import React from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      username: '',
      email: '',
      password: '',
      birthday: '',
      favoriteMovies: [],

      usernameErr: {},
      emailErr: {},
      passwordErr: {},
      birthdayErr: {}
    };
  }

  componentDidMount = () => {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getUser(accessToken, localStorage.getItem('user'));
    }
  }

  getUser = (token, user) => {
    axios.get(`https://myflixwomo.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const favoriteMovies = this.props.movies.filter(value => response.data.FavoriteMovies.includes(value._id));
        const birthday = moment(response.data.Birthday).format('DD.MM.YYYY');
        console.log(birthday);
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          password: response.data.Password,
          birthday,
          favoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Update Profile
  updateProfile = (e) => {
    const { username, password, email, birthday } = this.state;
    e.preventDefault();
    if(!this.formValidation()) {
      return;
    };
    let options = { 
      Username: username, 
      Password: password, 
      Email: email, 
      Birthday: birthday 
    }
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
      axios.put(`https://myflixwomo.herokuapp.com/users/${user}`, options, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log('test');
        const data = response.data;
        document.getElementById('form-response').innerHTML = 'Your Profile Information has been updated.'; 
               
       localStorage.clear();
     })
     .catch((e) => {
       console.log("Error: User information was not updated");
       this.formValidation(); 
     });
 }

  // Delete Profile
  deleteProfile = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete(`https://myflixwomo.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        window.open("/", "_self");
        localStorage.clear();
      })
      .catch((e) => {
        console.log("Error: User was not deleted");
      });
  }

  // Toggle favorite movie
  toggleFavorite = m => {
    let newFavorites = [];
    if (state.favoriteMovies.includes(m)) {
      newFavorites = this.state.favoriteMovies.filter((movie) => movie._id !== m._id)
      this.setState({ favoriteMovies: newFavorites });
      return 
    } 
    this.setState(state => { favoriteMovies: state.favoriteMovies.push(m)})
  }
  
  formValidation = () => {
    const { username, password, email, birthday } = this.state;
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    const birthdayErr = {};
    const emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    let checkEmail = emailReg.test(email);
    let isValid = true;

    if (birthday === '') {
      birthdayErr.selectDate = 'Please Select a Date';
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

    if (!checkEmail) {
      emailErr.emailInvalid = 'Invalid Email';
      isValid = false;
    }
console.log(emailErr);

    this.setState({
      usernameErr, 
      birthdayErr,
      passwordErr,
      emailErr
    })
   
    return isValid;
  };

    render() {
      const { user, movies, email, password, birthday, favoriteMovies } = this.state;
      return (
        <Container>            
            <Form className="form-inside-input" noValidate>
              <Form.Row className="justify-content-md-center">
                <Col md={3}>
                  <h1 className="mb-4">My Profile</h1>
                  <div id="form-response"></div>
                  <Form.Group controlId="">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" name="txtFname" value={user} onChange={e => this.setState(Object.assign(this.state, {}, { user: e.target.value }))} placeholder="Create a Username" required />
                    <Form.Text className="text-muted desc-text">
                      5-10 Characters
                    </Form.Text>
                    {Object.keys(this.state.usernameErr).map((key) => {
                        return <div style={{ color: 'black' }}>{usernameErr[key]}</div>;
                      })}
                      {/*inside div: key={`${idx}`}*/}
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={e => this.setState(Object.assign(this.state, {}, { password: e.target.value }))} placeholder="Create a Password" required />
                    <Form.Text className="text-muted desc-text">
                      5-10 Characters
                    </Form.Text>
                    {Object.keys(this.state.passwordErr).map((key) => {
                        return <div style={{ color: 'black' }}>{this.state.passwordErr[key]}</div>;
                      })}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address: </Form.Label>
                    <Form.Control type="email" name="txtEmail" value={email} onChange={e => this.setState(Object.assign(this.state, {}, { email: e.target.value }))} placeholder="Enter your email address" required/>
                    {Object.keys(this.state.emailErr).map((key) => {
                        return <div key={`${idx}`} style={{ color: 'black' }}>{this.state.emailErr[key]}</div>;
                      })}
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => this.setState(Object.assign(this.state, {}, { birthday: e.target.value }))} placeholder="Enter your birthday" />
                    {Object.keys(this.state.birthdayErr).map((key, idx) => {
                        return <div key={`${idx}`} style={{ color: 'black' }}>{this.state.birthdayErr[key]}</div>;
                      })}
                  </Form.Group>
                  <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.updateProfile}>
                    Update
                  </Button>
                  <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.deleteProfile}>
                    Delete My Profile
                  </Button>
                </Col>
              </Form.Row>
            </Form>

           <div>
            { this.state.favoriteMovies.length && this.state.favoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
              <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.toggleFavorite}>
                  Remove              
              </Button>
            </div>

        </Container>      
      )
    }
}
