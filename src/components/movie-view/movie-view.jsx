import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleClick = () => {
    this.props.onClickBack();    
  };

  render() {
    const { movie } = this.props;
    
    if (!movie) return null;

    return ( 
      <React.Fragment>
        <img className="movie-poster mt-4 mb-4" src={movie.ImagePath} />
        <Table striped hover variant="dark" className="table">
          <thead>
            <tr>
              <th>Title:</th>
              <th>{movie.Title}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Description: </td>
              <td>{movie.Description}</td>
            </tr>
            <tr>
              <td>Genre: </td>
              <td>{movie.Genre.Name}</td>
            </tr>
            <tr>
              <td>Director: </td>
              <td>{movie.Director.Name}</td>
            </tr>
          </tbody>
        </Table>
        <button type="submit" variant="dark" onClick={this.handleClick}>
          Go back
        </button>
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