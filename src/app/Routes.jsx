import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

import CTop from './containers/CTop';
import CUsers from './containers/CUsers';

export const getRoutes = () => ([
  { key: 'top', path: '/', component: CTop, exact: true },
  { key: 'users', path: '/users', component: CUsers },
]);
export const getStore = initialState => (
  createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  )
);

export default ({store}) => (
  <Provider store={store}>
    <div>
      <ul>
        <li><Link to="/">Top</Link></li>
        <li><Link to="/users">User List</Link></li>
      </ul>
      <Switch>
        {getRoutes().map((item, i) => <Route {...item} />)}
      </Switch>
    </div>
  </Provider>
);
