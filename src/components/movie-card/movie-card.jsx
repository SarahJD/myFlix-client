import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  
  // // Toggle favorite movie
  // toggleFavorite = m => {
  //   let newFavorites = [];
  //   if (props.favoriteMovies.includes(m)) {
  //     newFavorites = props.favoriteMovies.filter((movie) => movie._id !== m._id)
  //     this.setState({ favoriteMovies: newFavorites });
  //     return 
  //   } 
  //   this.setState(state => { favoriteMovies: state.favoriteMovies.push(m)})
  // }
  
  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: '16rem' }} className="m-2 moviecard">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
         {/* <div>
                { props.favoriteMovies.length && props.favoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
                  <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.toggleFavorite}>
                      Remove              
                  </Button>
              </div> */}
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description.substring(0, 100)}...</Card.Text>
          <div className="card-footer">
            <Link to={`/movies/${movie._id}`} >
              <Button variant="link" className="linktext">Read More</Button>
            </Link>
            <img src="../../img/star-regular.svg" alt="star"></img>
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
      Description: PropTypes.string.isRequired
    })
  }).isRequired
};
