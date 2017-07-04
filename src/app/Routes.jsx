// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import store from './store';

import Top from './containers/top/Top';
import Users from './containers/users/Users';

export const getRoutes = () => ([
  { key: 'top', path: '/', component: Top, exact: true },
  { key: 'users', path: '/users', component: Users, routes: [
    { key: 'user-detail', path: '/users/:id', component: Top },
  ] },
]);

type Props = {
  initialState: any
}

export default class Routes extends React.Component<void, Props, void> {
  store: any;

  constructor(props: Props) {
    super(props);
    this.store = store(props.initialState);
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
