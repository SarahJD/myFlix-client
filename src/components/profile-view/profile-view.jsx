import React from 'react';
import axios from 'axios';
import { Button, Card, Container} from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    }
  }

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

// toggle favorite movie
toggleFavorite = (m) => {
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
    const { user } = this.props;
    return (
      <Container>
          <Link to={"/"}>
            <Button>Back</Button>
          </Link>
        <Card>
          <h2>Profile Information</h2>
          <h3>Username:</h3>
          <p>{user.Username}</p>
          <h3>Email:</h3>
          <p>{user.Email}</p>
          <h3>Birthday:</h3>
          <p>{user.Birthday}</p>
          <h3>Favorite Movies:</h3>
          <p>{user.FavoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)}</p>
          {/* toggle function to deselect movie from FavoriteMovies */}
          <div>
            <Button className="toggle-btn" onClick={this.toggleFavorite}>
                Delete My Profile
            </Button>
          </div>
          <div>
            <Button className="delete-btn" onClick={this.deleteProfile}>
                Delete My Profile
              </Button>
          </div>

          {
              filteredFavorites.map(favorite => {
                return (
                  <li key={favorite._id} className="movie-item">{favorite.title} |
                    <span className="delete-movie" onClick={(e) => this.deleteMovie(e, favorite._id)}> Delete</span>
                  </li>
                )
              })
            }
          
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
