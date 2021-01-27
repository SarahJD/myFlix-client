import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // given by MainView which is connected to the database via the movies endpoints in the API
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)}className="movie-card">{movie.Title}</div>
    );
  }
}