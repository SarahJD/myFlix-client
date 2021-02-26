import axios from 'axios';

// declare ACTION TYPES
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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

export function request(user) { 
  return { 
    type: LOGIN_REQUEST, 
    user 
  } 
}

export function success(user) { 
  return { 
    type: LOGIN_SUCCESS, 
    user 
  } 
}
    
export function failure(error) { 
  return { 
    type: LOGIN_FAILURE, 
    error 
  } 
}

export async function login(username, password) {
  console.log(username);
  return dispatch => {
    dispatch(request({ username }));
    return axios.post('https://myflixwomo.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      console.log(response);
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user.Username);
      dispatch(success(data))
    })
    .catch(e => {
      console.log('no such user');
      dispatch(failure(e.toString()));
    });
  };    
}