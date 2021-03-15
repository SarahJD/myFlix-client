import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import starRegular from '../../img/star-regular.svg';
import starSolid from '../../img/star-solid.svg';
import './toggle-favorites.scss';

export default function ToggleFavorites(props) {
  const toggleMovie = async (m) => {
    const { favoriteMovies } = props;
    const accessToken = localStorage.getItem('token');
    const presentFavorite = favoriteMovies.includes(m);
    let newFavorites = [];
    if (presentFavorite && (accessToken !== null)) {
      // const user = localStorage.getItem('user');
      // await axios.put(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      newFavorites = favoriteMovies.filter((movie) => movie._id !== m._id);
      props.handleSetFavorites(newFavorites);
    }
    if (!presentFavorite && (accessToken !== null)) {
      // const user = localStorage.getItem('user');
      // await axios.post(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      newFavorites.push(m);
      props.handleSetFavorites(newFavorites);
    }
    // localStorage.setItem('favoriteMovies', JSON.stringify(FavoriteMovies));
  };

  return (
    <div onClick={() => toggleMovie(props.movie)}>
      <img id="star" src={props.favoriteMovies.includes(props.movie) ? starSolid : starRegular} alt="star" />
    </div>
  );
}

ToggleFavorites.propTypes = {
  favoriteMovies: PropTypes.array,
  handleSetFavorites: PropTypes.func.isRequired,
};
