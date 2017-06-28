import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes, { getStore } from './Routes';

const store = getStore(JSON.parse(document.querySelector('#initial-data').dataset.json));

ReactDOM.render((
  <BrowserRouter>
    <Routes store={store} />
  </BrowserRouter>
), document.getElementById('app'));
