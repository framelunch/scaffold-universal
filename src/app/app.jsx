import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

const initialState = JSON.parse(document.querySelector('#initial-data').dataset.json);

ReactDOM.render((
  <BrowserRouter>
    <Routes initialState={initialState} />
  </BrowserRouter>
), document.getElementById('app'));
