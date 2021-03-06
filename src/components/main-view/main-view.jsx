import React from 'react';
import axios from 'axios';
import { Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';

// import actions
import { setMovies, login } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      accessToken: '',
    };
  }

  componentDidMount() {
    // when page loads check if the user is logged in
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ accessToken });
      this.getMovies(accessToken);
    }
  }

  // When a user is logged in, the movie list is displayed
  getMovies = async (token) => {
    axios.get('https://myflixwomo.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }, // makes authenticated requests to API
    })
      .then((response) => {
      // Assign the result Redux
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  render() {
    const { movies } = this.props;

    return (
      <Router>
        <div className="main-view">

          {this.state.accessToken && (
            <Row className="main-row main-heading-row">
              <Link to="/movieslist" className="myFlix">
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
            <Route exact path="/" render={() => <LoginView setToken={(token) => this.setState({ accessToken: token })} loginUser={(name, pass) => this.props.login(name, pass)} />} />
            <Route
              exact
              path="/movieslist"
              render={() => {
                if (!this.state.accessToken) return <LoginView setToken={(token) => this.setState({ accessToken: token })} loginUser={(name, pass) => this.props.login(name, pass)} />;
                { /* Home is the default route */ }
                return <MoviesList movies={movies} />;
              }}
            />
            <Route exact path="/register" render={() => <RegistrationView />} />
            <Route exact path="/profile" render={() => <ProfileView user={this.props.user} movies={this.props.movies} />} />
            <Route exact path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieId)} />} />
            {/* Even if the movie object is loaded later, show the route */}
            <Route
              exact
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <GenreView movies={this.props.movies} genre={(movies.length > 0) ? movies.find((m) => m.Genre.Name === match.params.name).Genre : {}} />;
              }}
            />
            <Route
              exact
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <div className="main-view" />;
                return <DirectorView movies={this.props.movies} director={(movies.length > 0) ? movies.find((m) => m.Director.Name === match.params.name).Director : {}} />;
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ movies: state.movies, user: state.user });

export default connect(mapStateToProps, { setMovies, login })(MainView);

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
  setMovies: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
