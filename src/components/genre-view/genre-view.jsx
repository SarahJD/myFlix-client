import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import './genre-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export function GenreView (props) {

    const { movies, genre } = props;
    
    return ( 
      <React.Fragment>
        <Container className="container">
          <Row>
            <Col>
              <div>
                <h1>{genre.Name}</h1>
                <p>{genre.Description}</p>
                <h2>Some movies that belong to this genre</h2>
                {movies.filter(m => m.Genre.Name === genre.Name).map(m => <MovieCard key={m._id} movie={m}/>)}
              </div>
            </Col>
          </Row>  
        </Container>
      </React.Fragment>

    );
  }


GenreView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    })
  ),
  genre: PropTypes.shape({
    Name: PropTypes.string,
      Description: PropTypes.string
    })
  }