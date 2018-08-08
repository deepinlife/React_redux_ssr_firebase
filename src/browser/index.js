import React from 'react';
import ReactDOM from 'react-dom';
import App from '../shared/App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "../shared/ReduxSetup/store/Navbar"
import history from '../shared/history/history';

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter history={history} >
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('app')
);