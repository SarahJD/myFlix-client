import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss'; 

export const history = createBrowserHistory();

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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open("/", "_self")
    }

  render() {
    const { movies, user } = this.state;   
    // The LoginView is going to be shown if there is no user, only when the register route is on, is will not be shown (but the RegistrationView)
    //if (!user && !window.location.href.includes('/register')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
   // if (!user && window.location.href.includes('/register')) return <RegisterView />

    // Before the movies have been loaded
    //if (!movies) return <div className="main-view"/>;
    // If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, all movies will be returned 
    return (
      <Router history={history} >
        <div className="main-view">

          {user && (
            <Row>
              <Col md={10}>
                <Link to="/" className="myFlix" >
                  myFlix
                </Link> 
              </Col>
              <Col>
                <Link to="/profile">
                  <Button className="btn" variant="dark">Profile</Button> 
                </Link>
              </Col>
              <Col>
                <Button className="btn" variant="dark" type="submit" onClick={this.handleLogOut}>Log Out</Button> 
              </Col>
            </Row>
          )}


          <Switch>
            <Route exact path="/" render={() => {
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              {/* Home is the default route */}
              return movies.map(m => <MovieCard key={m._id} movie={m} />)}}/>
            <Route exact path="/register" render={() => <RegistrationView />} />
            <Route exact path="/profile" render={() => <ProfileView user={this.state.user} movies={this.state.movies} />} />
            <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
            {/* Even if the movie object is loaded later, show the route */}
            <Route exact path="/genres/:name" render={({match}) => { 
              if (!movies) return <div className="main-view" />;
              return <GenreView movies={this.state.movies} genre={ (movies.length > 0) ? movies.find(m => m.Genre.Name === match.params.name).Genre : {} }/>} }/>
            <Route exact path="/directors/:name" render={({match}) => { 
              if (!movies) return <div className="main-view" />;
              return <DirectorView movies={this.state.movies} director={ (movies.length > 0) ? movies.find(m => m.Director.Name === match.params.name).Director : {} }/>} }/>
          </Switch>
        </div>
      </Router>
    );
  }
}
