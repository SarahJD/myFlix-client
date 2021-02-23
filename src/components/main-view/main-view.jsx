import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

// import actions
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import LoginView from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss'; 
import { propTypes } from 'react-bootstrap/esm/Image';


class MainView extends React.Component {
  constructor() {
    // Call the superclass constructor so React can initialize it
    super();

    this.state = {
      accessToken: localStorage.getItem('token')
    };
  }

  componentDidMount() {
    // when page loads check if the user is logged in
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let user = localStorage.getItem('user');
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  shouldComponentUpdate(nextProps, nextState){}

  // When a user is logged in, the movie list is displayed
  getMovies(token) {
    axios.get('https://myflixwomo.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`} // makes authenticated requests to API
    })
    .then(response => {
      // Assign the result Redux
      this.props.setMovies(response.data); 
    })
    .catch(function(error) {
      console.log(error);
    });
  }

    //   // When a user successfully logs in, this function updates the user property in state to the particular user
    // onLoggedIn(authData) { // authData stands for the user and the token
    //   console.log(authData);
    //   this.props.setUser(user.Username)
    //   // this.setState({
    //   //   user: authData.user.Username
    //   // });
    //   localStorage.setItem('token', authData.token);
    //   localStorage.setItem('user', authData.user.Username);
    //   this.getMovies(authData.token); 
    // }

    handleLogOut = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open("/", "_self")
    }
    
  render() {
    const { movies, user } = this.props;
    
    return (
      <Router>
        <div className="main-view">

          {user && (
            <Row className="main-row">
                <Link to="/" className="myFlix" >
                  myFlix
                </Link> 
                <div>
                  <Link to="/profile">
                    <Button className="main-buttons" variant="dark">Profile</Button> 
                  </Link>
                  <Button className="main-buttons" variant="dark" type="submit" onClick={this.handleLogOut}>Log Out</Button> 
                </div>
            </Row>
          )}

          <Switch>
            <Route exact path="/" render={() => {
              if (!this.state.accessToken) return <LoginView setToken ={token => this.setState({accessToken: token})} />;
              {/* Home is the default route */}
              return <MoviesList movies={movies}/>
            }} />
            <Route exact path="/register" render={() => <RegistrationView />} />
            <Route exact path="/profile" render={() => <ProfileView user={this.props.user} movies={this.props.movies} />} />
            <Route exact path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
            {/* Even if the movie object is loaded later, show the route */}
            <Route exact path="/genres/:name" render={({match}) => { 
              if (!movies) return <div className="main-view" />;
              return <GenreView movies={this.props.movies} genre={ (movies.length > 0) ? movies.find(m => m.Genre.Name === match.params.name).Genre : {} }/>} }/>
            <Route exact path="/directors/:name" render={({match}) => { 
              if (!movies) return <div className="main-view" />;
              return <DirectorView movies={this.props.movies} director={ (movies.length > 0) ? movies.find(m => m.Director.Name === match.params.name).Director : {} }/>} }/>
          </Switch>
        </div>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);

MainView.proptypes = {
  movies:propTypes.array,
  user: propTypes.string,
  setMovies: propTypes.func,
  setUser: propTypes.func,
  onLoggedIn: propTypes.func,
}