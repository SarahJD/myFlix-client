import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './movies-list.scss';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
  }

  if (!movies) { return <div className="main-view" />; }

  return (
    <div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      <div className="class-container">
        {/* rendering all movies without filtering */}
        {filteredMovies.map((m) => <MovieCard key={m._id} movie={m} />)}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

// mapStateToProps fransforms the store into props that the MoviesList component will use
export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};
