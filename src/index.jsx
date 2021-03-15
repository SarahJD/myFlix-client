import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

require('@babel/polyfill');
require('@babel/register');

// Create Redux Store with combined reducer (moviesApp)
const store = createStore(moviesApp, applyMiddleware(thunk));

function MyFlixApplication() {
  return (
    <Provider store={store}>
      <MainView />
    </Provider>
  );
}

// Find the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
