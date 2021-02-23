import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
      default:
        return state;
  }
}

let storedUser = localStorage.getItem('user');
const initialAuthState = storedUser ? { loggedIn: true, user: storedUser } : {};

export function authentication(state = initialAuthState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        loggingIn: true,
        user: action.user
      };
    case 'LOGIN_SUCCESS':
      return {
        loggedIn: true,
        user: action.user
      };
    case 'LOGIN_FAILURE':
      return {};
    // case userConstants.LOGOUT:
    //   return {};
    default:
      return state
  }
}

// Combined Reducers
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user, 
  authentication
});

export default moviesApp;