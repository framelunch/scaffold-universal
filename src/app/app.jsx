import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { store, actions } from './Store';

const initialState = JSON.parse(document.querySelector('#initial-data').dataset.json);

ReactDOM.render((
  <BrowserRouter>
    <Routes {...initialState} />
  </BrowserRouter>
), document.getElementById('app'));
