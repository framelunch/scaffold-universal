import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { store, actions } from './Store';

const initialState = JSON.parse(document.querySelector('#initial-data').dataset.json);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.initialize(initialState));
store.dispatch(actions.awake());

ReactDOM.render((
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
), document.getElementById('app'));
