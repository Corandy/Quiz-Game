import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Index from './pages/index';
import 'normalize.css/normalize.css';
import './assets/styles/styles.scss';

const store = configureStore();

const renderApp = Component => (
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
          <Component />
      </BrowserRouter>
    </Provider>
    , document.getElementById('app')
  )
);

renderApp(Index);  