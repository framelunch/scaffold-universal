import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import App from './components/App';

const store = createStore(reducer, {
  users: [
    { id: 1, name: 'ikeda', completed: true },
  ],
});

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
