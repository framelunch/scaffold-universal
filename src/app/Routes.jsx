import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

export default () => (
  <div>
    <ul>
      <li><Link to="/">TOP</Link></li>
      <li><Link to="/users">Users</Link></li>
      <li><Link to="/users/594b9cb0a761f1ad5c890d65">User Detail</Link></li>
    </ul>

    <Switch>

    </Switch>
  </div>
);

//
