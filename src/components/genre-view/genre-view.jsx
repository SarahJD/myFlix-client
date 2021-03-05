import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './genre-view.scss';

import MovieCard from '../movie-card/movie-card';

function GenreView(props) {
  const { movies, genre } = props;
  const history = useHistory();

  return (
    <React.Fragment>
      <Container className="container">
        <Row>
          <Col>
            <div>
              <Button variant="dark" className="button mt-4 mb-4" type="submit" onClick={(e) => history.goBack()}>Go back</Button>
              <h1>{genre.Name}</h1>
              <p className="genre-description">{genre.Description}</p>
              <h2>Some movies that belong to this genre</h2>
              {movies.filter((m) => m.Genre.Name === genre.Name).map((m) => <MovieCard key={m._id} movie={m} />)}
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
      Description: PropTypes.string,
    }),
  ),
  genre: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
  }),
};

GenreView.defaultProps = {
  movies: {},
  genre: {},
};

export default GenreView;
