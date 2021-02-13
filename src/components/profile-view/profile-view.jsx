import React from 'react';
import axios from 'axios';
import { Button, Card, Container, Form, Row, Col} from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export class ProfileView extends React.Component {

  componentDidMount = () => {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getUser(accessToken);
    }
  }

  getUser = (token) => {
    axios.get('https://myflixwomo.herokuapp.com/login/users/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          username: response.data.Username,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete Profile
  deleteProfile = (e) => {
    e.preventDefault();
    axios.delete('https://myflixwomo.herokuapp.com/login/users/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        window.open("/client", "_self");
        console.log(data);
        localStorage.clear();
      })
      .catch((e) => {
        console.log("Error: User was not deleted");
      });
  }

  // Update Profile
  updateProfile = (e) => {
    e.preventDefault();
    axios.put('https://myflixwomo.herokuapp.com/login/users/', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const data = response.data;
        window.open("/client", "_self");
        console.log(data);
        localStorage.clear();
      })
      .catch((e) => {
        console.log("Error: User information was not updated");
      });
  }

  // Toggle favorite movie
  toggleFavorite = m => {
    if (user.FavoriteMovies.includes(m)) {
      user.FavoriteMovies.map (() => {
        let i = FavoriteMovies.indexOf(m);
        FavoriteMovies.splice(i, 1);
      })
      } else {
        FavoriteMovies.push(m);
      }
    } 

    render() {
      const { user, movies } = this.props;
      console.log(user);
      return (
        <Container>
          <Link to={"/"}>
            <Button>Back</Button>
          </Link>
          <Card>
            <h2>Profile</h2>
            <h3>Username:</h3>
            <p>{user.Username}</p>
            <h3>Password:</h3>
            <p>{user.Password}</p>
            <h3>Email:</h3>
            <p>{user.Email}</p>
            <h3>Birthday:</h3>
            <p>{user.Birthday}</p>
            <h3>Favorite Movies:</h3>
            <p>
            { user.FavoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
            </p>
            {/* toggle function to remove movie from FavoriteMovies */}
            <div>
              <Button className="toggle-btn" onClick={this.toggleFavorite}>
                Remove              
              </Button>
            </div>
            <div>
              <Button className="delete-btn" onClick={this.deleteProfile}>
                  Delete My Profile
                </Button>
            </div>
            
            <Form className="form-inside-input" onSubmit={updateProfile} noValidate>
              <Form.Row className="justify-content-md-center">
                <Col md={3}>
                  <h1 className="mb-4">Update My Profile Information</h1>
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
                  <Button className="btn" variant="dark" className="button mt-4 mb-4" type="submit" onClick={updateProfile}>
                    Update
                  </Button>
                </Col>
              </Form.Row>
            </Form>

          </Card>
        </Container>
    )
  }
}
