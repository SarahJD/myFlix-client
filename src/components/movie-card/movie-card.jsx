import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
  render() {
    // given by MainView which is connected to the database via the movies endpoints in the API
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)}className="movie-card">{movie.Title}</div>
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
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};