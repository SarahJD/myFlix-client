import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

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

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myflixwomo.herokuapp.com/movies')
      .then(response => {
        // Tells that the component's state has changed
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' property to that movie
  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // When a user successfully logs in, this function updates the user property in state to the particular user
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  // When a user clicks the 'Go home' button in the movie view, this function updated the selectedMovie property to null
  onClickBack() {
    this.setState({
      selectedMovie: null
    });
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
          <h1 className="myFlix">myFlix</h1> 
        </Row>
        <Row className="main-view justify-content-md-center">
          
          {selectedMovie
            ? (
                <Col md={8} xs={6}>
                  <MovieView movie={selectedMovie} onClickBack={() => this.onClickBack()}/>
                </Col>
              )
            : movies.map(movie => (
                <Col md="auto" key={movie._id}> 
                  <MovieCard  movie={movie} onClick={movie => this.onMovieClick(movie)}/>
                </Col>
              ))
          }
        </Row>
      </React.Fragment>
    );
  }
}
