import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import './director-view.scss';

import { MovieCard } from '../movie-card/movie-card';

export function DirectorView (props) {

    const { movies, director } = props;
    
    return ( 
      <React.Fragment>
        <Container className="container">
          <Row>
            <Col>
              <div>
                <h1>{director.Name}</h1>
                <h2>{director.Birthyear}</h2>
                <p>{director.Bio}</p>
                <h2>Some movies from this director</h2>
                {movies.filter(m => m.Director.Name === director.Name).map(m => <MovieCard key={m._id} movie={m}/>)}
              </div>
            </Col>
          </Row>  
        </Container>
      </React.Fragment>
    );
  }


DirectorView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string
    })
  ),
  director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    Birthyear: PropTypes.string
    })
  }