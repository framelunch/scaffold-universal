import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducers';
import epics from './epics';

import CTop from './containers/CTop';
import CUsers from './containers/CUsers';

export const getRoutes = () => ([
  { key: 'top', path: '/', component: CTop, exact: true },
  { key: 'users', path: '/users', component: CUsers },
]);

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.store = createStore(
      reducer,
      props.initialState,
      applyMiddleware(createEpicMiddleware(epics)),
    );
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
