import React from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Row } from 'react-bootstrap';
import './movie-view.scss';
 

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;
    
    if (!movie) return null;

    return ( 
      <React.Fragment>
        <Container className="container">
          <Row>
            <Col>
              <h1 className="title">{movie.Title}</h1>
              <div>
              <h2 className="subtitles">Genre:</h2>
              <a className="links" href="#">{movie.Genre.Name}</a>  
              </div>
              <div>
              <h2 className="subtitles">Director:</h2>
              <a className="links" href="#">{movie.Director.Name}</a>
              </div>
              <div className="description">
              <h2 className="subtitles">Description: </h2 >
              <p>{movie.Description}</p>
              </div>
              <Button variant="dark" type="submit" className="button" onClick={this.props.onClickBack}>
                 Go back
              </Button>
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
  }).isRequired,
  onClickBack: PropTypes.func.isRequired
};