import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ToggleFavorites from '../toggle-favorites/toggle-favorites';
import './movie-view.scss';

class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.setState({ favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) });
  }

  handleSetFavorites = (favoriteMovies) => {
    this.setState({ favoriteMovies });
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <React.Fragment>
        <div className="movie-poster-container">
          <div>
            <div>
              <div className="title-star-container">
                <h1 className="title">{movie.Title}</h1>
                <ToggleFavorites movie={movie} favoriteMovies={this.state.favoriteMovies} handleSetFavorites={(favorites) => this.handleSetFavorites(favorites)} />
                </div>
                <div className="key-value-container">
                  <h2 className="subtitles">Director:</h2>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button className="link" variant="link">{movie.Director.Name}</Button>
                    </Link>
                </div>
              </div>
              <div className="key-value-container">
                <h2 className="subtitles">Genre:</h2>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="link" variant="link">{movie.Genre.Name}</Button>
                </Link>
              </div>
              <div className="description">
                <h2 className="subtitles description-title">Description: </h2>
                <p className="description-text">{movie.Description}</p>
              </div>
              <Link to="/movieslist">
                <Button variant="dark" className="button mt-4 mb-4" type="submit">Go back</Button>
              </Link>
            </div>
            <div>
              <img className="movie-poster mt-4 mb-4" src={movie.ImagePath} />
            </div>
          </div>
      </React.Fragment>

    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default MovieView;
