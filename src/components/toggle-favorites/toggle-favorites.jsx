import React, { useState } from 'react';
import axios from 'axios';
import starRegular from '../../img/star-regular.svg';
import starSolid from '../../img/star-solid.svg';
//import PropTypes from 'prop-types';

import './toggle-favorites.scss'; 

export default function ToggleFavorites(props) {

  const toggleMovie = async m => {
    let favoriteMovies = props.favoriteMovies;
    let accessToken = localStorage.getItem('token');
    let presentFavorite = favoriteMovies.includes(m);
    let newFavorites = [];
    if (presentFavorite && (accessToken !== null)) {
      //await axios.put(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`, { headers: { Authorization: `Bearer ${token}`}});
      newFavorites = favoriteMovies.filter((movie) => movie._id !== m._id)
      props.handleSetFavorites(newFavorites)
    }
    if (!presentFavorite && (accessToken !== null)) {
      //await axios.post(`https://myflixwomo.herokuapp.com/users/${user}/Movies/${m._id}`, { headers: { Authorization: `Bearer ${token}`}});
      newFavorites.push(m);
      props.handleSetFavorites(newFavorites);
     }
    //localStorage.setItem('favoriteMovies', JSON.stringify(FavoriteMovies));
  }

  return (
    <div onClick={() => toggleMovie(props.movie)}>
      {<img id="star" src={props.favoriteMovies.includes(props.movie) ? starSolid : starRegular} alt="star"></img>}
    </div>
  );
}