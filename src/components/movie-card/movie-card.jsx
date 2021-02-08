import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    // given by MainView which is connected to the database via the movies endpoints in the API
    const { movie, onClick } = this.props;

    return (
      <Card style={{ width: '16rem' }} className="m-2 moviecard">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description.substring(0, 140)}</Card.Text>
          <Button variant="outline-dark" onClick={() => onClick(movie)}>More</Button>
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
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onClick: PropTypes.func.isRequired
};