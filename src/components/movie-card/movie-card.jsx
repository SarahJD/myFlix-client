import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ToggleFavorites from '../toggle-favorites/toggle-favorites';
import './movie-card.scss';

class MovieCard extends React.Component {
  state = {
    favoriteMovies: [],
    user: ''
  }

  componentDidMount() {
    this.setState({ favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) });
  }

  handleSetFavorites = (favoriteMovies) => {
    this.setState({ favoriteMovies });
  }

  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '16rem' }} className="m-2 moviecard">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="moviecard-description-text">
            {movie.Description.substring(0, 100)}
            ...
          </Card.Text>
          <div className="card-footer">
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link" className="linktext">Read More</Button>
            </Link>
            <ToggleFavorites movie={movie} favoriteMovies={this.state.favoriteMovies} handleSetFavorites={(favorites) => this.handleSetFavorites(favorites)} />
          </div>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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

export default MovieCard;
