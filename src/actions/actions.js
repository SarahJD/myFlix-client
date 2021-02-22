// declare ACTION TYPES
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

// ACTION CREATORS

// initializes the movies list with movies
export function setMovies(value){
  return { 
    type: SET_MOVIES, 
    value 
  };
}

// sets the filter to filter the movies list
export function setFilter(value){
  return { 
    type: SET_FILTER, 
    value 
  };
}