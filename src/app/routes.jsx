// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import initStore from './helpers/init-store';

import Top from './containers/Top';
import Users from './containers/Users';

import type { RoutesProps } from './types';

export const getRoutes = () => ([
  { key: 'top', path: '/', component: Top, exact: true },
  { key: 'users', path: '/users', component: Users, routes: [
    { key: 'user-detail', path: '/users/:id', component: Top },
  ] },
]);

export default class Routes extends React.Component {
  props: RoutesProps;
  store: any;

  constructor(props: RoutesProps) {
    super(props);
    this.store = initStore(props.initialState);
  }
  render() {
    return (
      <Provider store={this.store}>
        <div>
          <ul>
            <li><Link to="/">Top</Link></li>
            <li><Link to="/users">User List</Link></li>
          </ul>
          <Switch>
            {getRoutes().map(item => <Route {...item} />)}
          </Switch>
        </div>
      </Provider>
    );
  }
}
