import React from 'react';
import axios from 'axios';
import { Button, Card, Container, Form, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

  constructor(props) {
    // Call the superclass constructor so React can initialize it
    super(props);

    this.state = {
      movies: [],
      user: '',
      email: '',
      password: '',
      birthday: '',
      favoriteMovies: []
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
    axios.get('https://myflixwomo.herokuapp.com/users/' + user, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          password: response.data.Password,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

// Update Profile
updateProfile = (e) => {
  console.log(this.state);
   e.preventDefault();
  let token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
   axios.put('https://myflixwomo.herokuapp.com/users/' + user, this.state, {
     headers: { Authorization: `Bearer ${token}` }
   })
     .then(response => {
       const data = response.data;
      // window.open("/", "_self");
       console.log(data);
       localStorage.clear();
     })
     .catch((e) => {
       console.log("Error: User information was not updated");
     });
 }

  // Delete Profile
  deleteProfile = (e) => {
    e.preventDefault();
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.delete('https://myflixwomo.herokuapp.com/users/' + user, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        window.open("/", "_self");
        console.log(data);
        localStorage.clear();
      })
      .catch((e) => {
        console.log("Error: User was not deleted");
      });
  }


  // Toggle favorite movie
  toggleFavorite = m => {
    this.setState ( state => {
    if (state.favoriteMovies.includes(m)) {
      state.favoriteMovies.map (() => {
        let i = state.favoriteMovies.indexOf(m);
        state.favoriteMovies.splice(i, 1);
      })
      } else {
        state.favoriteMovies.push(m);
      }
    })
  }
    
    render() {
      const { user, movies, email, password, birthday, favoriteMovies } = this.state;
      return (
        <Container>            
            <Form className="form-inside-input" noValidate>
              <Form.Row className="justify-content-md-center">
                <Col md={3}>
                  <h1 className="mb-4">My Profile</h1>
                  <Form.Group controlId="">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control type="text" name="txtFname" value={user} onChange={e => this.setState(Object.assign(this.state, {}, { user: e.target.value }))} placeholder="Create a Username" required />
                    <Form.Text className="text-muted desc-text">
                      5-10 Characters
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control type="password" value={password} onChange={e => this.setState(Object.assign(this.state, {}, { password: e.target.value }))} placeholder="Create a Password" required />
                    <Form.Text className="text-muted desc-text">
                      5-10 Characters
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address: </Form.Label>
                    <Form.Control type="email" name="txtEmail" value={email} onChange={e => this.setState(Object.assign(this.state, {}, { email: e.target.value }))} placeholder="Enter your email address" required/>
                  </Form.Group>
                  <Form.Group controlId="date">
                    <Form.Label>Birthday: </Form.Label>
                    <Form.Control type="date" value={birthday} onChange={e => this.setState(Object.assign(this.state, {}, { birthday: e.target.value }))} placeholder="Enter your birthday" />
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

           {/* <div>
            { favoriteMovies && favoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
              <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.toggleFavorite}>
                  Remove              
              </Button>
            </div> */}

        </Container>      
      )
    }
}
