// declare ACTION TYPES
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

// ACTION CREATORS

// initialize the movies list with movies
export function setMovies(value){
  return { 
    type: SET_MOVIES, 
    value 
  };
}

// set the filter to filter the movies list
export function setFilter(value){
  return { 
    type: SET_FILTER, 
    value 
  };
}

export function setUser(value){
  return {
    type: SET_USER,
    value
  }
};