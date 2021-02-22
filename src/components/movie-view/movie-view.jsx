import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';
 

export class MovieView extends React.Component {

  // Toggle favorite movie
  toggleFavorite = m => {
    let newFavorites = [];
    if (props.favoriteMovies.includes(m)) {
      newFavorites = props.favoriteMovies.filter((movie) => movie._id !== m._id)
      this.setState({ favoriteMovies: newFavorites });
      return 
    } 
    this.setState(state => { favoriteMovies: state.favoriteMovies.push(m)})
  }


  render() {
    const { movie } = this.props;
    
    if (!movie) return null;

    return ( 
      <React.Fragment>
        <Container className="container">
          <Row>
            <Col>
              <div>
                { props.favoriteMovies.length && props.favoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
                  <Button variant="dark" className="button mt-4 mb-4 profile-btn" type="submit" onClick={this.toggleFavorite}>
                      Remove              
                  </Button>
              </div>
              <div>
                <h1 className="title">{movie.Title}</h1>
                <h2 className="subtitles">Director:</h2>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button className="link" variant="link">{movie.Director.Name}</Button>
                </Link>
              </div>
              <div>
                <h2 className="subtitles">Genre:</h2>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button className="link" variant="link">{movie.Genre.Name}</Button>
                </Link>  
              </div>
              <div className="description">
                <h2 className="subtitles">Description: </h2 >
                <p>{movie.Description}</p>
              </div>
              <Link to="/" >
                <Button variant="dark" className="button mt-4 mb-4" type="submit">Go back</Button>
              </Link>
            </Col>
            <Col>
              <img className="movie-poster mt-4 mb-4" src={movie.ImagePath} />
            </Col>
          </Row>  
        </Container>
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
    Description: PropTypes.string.isRequired
  })
}).isRequired
};
