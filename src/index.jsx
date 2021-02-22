import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Container from 'react-bootstrap/Container'; 
import { devToolsEnhancer } from 'redux-devtools-extension';

import { MainView } from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

// Create Redux Store
const store = createStore(moviesApp, devToolsEnhancer());
// when adding redux_store in addition it says"index.jsx:15 Uncaught ReferenceError: redux_store is not defined", but otherwise the redux devtools don't work

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
      return (
        <Container>
          <MainView/>
        </Container>
      );
  }
}

// Find the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);