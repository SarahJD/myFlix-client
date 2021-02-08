import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view'
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss'; 

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    this.state = {
      movies: null,
      selectedMovie: null, 
      user: null
    };
  }

  componentDidMount() {
    // when page loads check if the user is logged in
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      })
      this.getMovies(accessToken);
    }
  }

    // When a user successfully logs in, this function updates the user property in state to the particular user
    onLoggedIn(authData) { // authData stands for the user and the token
    //console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token); 
    }

    // When a user is logged in, the movie list is displayed
    getMovies(token) {
      axios.get('https://myflixwomo.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`} // makes authenticated requests to API
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies:response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
    onMovieClick(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    // When a user clicks the 'Go home' button in the movie view, this function updated the selectedMovie property to null
    onClickBack() {
      this.setState({
        selectedMovie: null
      });
    }

    onClickLogOut() {
      this.setState({
        accessToken: localStorage.removeItem('token'),
        user: localStorage.removeItem('user')
      })
    }

  render() {
    const { movies, selectedMovie, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    // If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all movies will be returned 
    return (
      <React.Fragment>
        <Row className="myFlix-container">
          <Col md={10}>
          <h1 className="myFlix">myFlix</h1> 
          </Col>
          <Col>
           <Button variant="dark" type="submit" className="button" onClick={() => this.onClickLogOut()}>
              Log out
            </Button>
          </Col>
        </Row>
        <Row className="main-view justify-content-md-center">
          
          {selectedMovie
            ? (
                <Col>
                  <MovieView movie={selectedMovie} onClickBack={() => this.onClickBack()}/>
                </Col>
              )
            : movies.map(movie => (
                <Col md={4} s={12} key={movie._id}> 
                  <MovieCard  movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                </Col>
              ))
          }
        </Row>
      </React.Fragment>
    );
  }
}
