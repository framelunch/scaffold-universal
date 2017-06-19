import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../app/routes';
import { store, actions } from '../app/store';

const initialState = JSON.parse(document.querySelector('#initial-data').dataset.json);

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(actions.initialize(initialState));
store.dispatch(actions.awake());

console.log();

ReactDOM.render((
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
), document.getElementById('app'));
