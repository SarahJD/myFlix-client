import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './genre-view.scss';


export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movies, genre } = this.props;
    
    if (!genre) return null;

    return ( 
      <React.Fragment>
        <Container className="container">
          <Row>
            <Col>
              <div>
                <h1>{genre.Genre.Name}</h1>
                <p>{genre.Genre.Description}</p>
                <h2>Some movies that belong to this genre</h2>
                {/* if ({movies.Genre.Name}===(movieparams.Genre.Name) then display movie, else don't display movie
              movies.map(m => <MovieCard key={m._id} movie={m} )*/}
              </div>
            </Col>
          </Row>  
        </Container>
      </React.Fragment>

    );
  }
}


{/*export function GenreView(props) {
  const [ movie, setMovie ] = useState('');
    
  return (
    <React.Fragment>
    <h1>{movie.Genre.Name}</h1>
    <p>{movie.Genre.Description}</p>
    <h2>Some movies that belong to this genre</h2>
     if ({movies.Genre.Name}===(movieparams.Genre.Name) then display movie, else don't display movie
    movies.map(m => <MovieCard key={m._id} movie={m} )

    <Link to="/movies" >
      <Button variant="dark" className="button mt-4 mb-4" type="submit">Go back</Button>
    </Link>
    </React.Fragment>
  )
} */}

{/*GenreView.propTypes = {
  movie: PropTypes.shape({ 
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired
  };*/}