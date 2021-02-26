import React, { useState } from 'react';
import axios from 'axios';
//import PropTypes from 'prop-types';

import './toggle-favorites.scss'; 

import { MovieCard } from '../movie-card/movie-card';

export function toggleFavorites(props) {
  const [ user, setUser ] = useState({});

  toggleMovie = m => {
    let favoriteMovies = props.user.FavoriteMovies;
    if (favoriteMovies.includes(m)) {
      return axios.put(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`);
      return document.getElementsByClassName('img').src('../../img/star-regular.svg');
    } else {
      return axios.post(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`);
      return document.getElementsByClassName('img').src('../../img/star-solid.svg');
     }
  }

  return (
    <div>
      { favoriteMovies.length && favoriteMovies.map(m => <MovieCard key={m._id} movie={m} />)} 
      <img src="" onClick={this.toggleMovie}/>
    </div>
  );
}