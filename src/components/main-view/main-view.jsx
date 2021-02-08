import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss'; 

export class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    this.state = {
      movies: [],
      user: null
    };
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
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token); 
    }

    handleLogOut = () => {
      accessToken: localStorage.removeItem('token');
      user: localStorage.removeItem('user');
    }

  render() {
    const { movies, user } = this.state;

    // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    // If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all movies will be returned 
    return (
      <Router>
        <div className="main-view">
        <Row>
          <Col md={10}>
            <h1 className="myFlix">myFlix</h1>
          </Col>
          <Col>
            <Button className="btn" variant="dark" type="submit" onClick={this.handleLogOut}>Log Out</Button> 
          </Col>
        </Row>
        <Row>
          <Route exact path="/" render={() => {
            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            return movies.map(m => <MovieCard key={m._id} movie={m} />)
          }
          }/>
        </Row>
          <Route path="/register" render={() => <RegistrationView />} />
          <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
          <Route exact path="/genres/:name" render={({match}) => { 
            if (!movies) return <div className="main-view" />;
            return <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>} }/>
          <Route exact path="/directors/:name" render={({match}) => { 
            if (!movies) return <div className="main-view" />;
            return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>}
          } />
        </div>
      </Router>
    );
  }
}
