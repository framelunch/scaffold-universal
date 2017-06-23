import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import 'isomorphic-fetch';

function Top() {
  return <div>Top</div>;
}

class Users extends React.Component {
  static fetchData({ urlHeader }) {
    // Promiseで初期データを返せばいい気がするぞ
    return new Promise((resolve, reject) => {
      fetch(`${urlHeader}/api/users`)
        .then(data => data.json())
        .then(users => resolve({ users }))
        .catch(error => reject(error));
    });
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    console.log(event);
  }

  render() {
    return (
      <section onClick={this.onClick} tabIndex="0" role="link">
        <ul>
        {(this.props.users || []).map(({ name }, i) => <li key={i.toString()}>{name}</li>)}
        </ul>
      </section>
    );
  }
}

function UserDetail({ match: { params: { id } } }) {
  return <div>UserDetail: {id}</div>;
}

function HOC(Component, props) {
  return (
    <Component {...props} />
  );
}

export const routes = [
  { path: '/', component: Top },
  { path: '/users', component: Users },
  { path: '/users/:id', component: UserDetail },
];

export default function (props) {
  // console.log(state);
  return (
    <div>
      <ul>
        <li><Link to="/">TOP</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/users/aaa">User Detail:aaa</Link></li>
        <li><Link to="/users/bbb">User Detail:bbb</Link></li>
        <li><Link to="/lsdflkjsdflkjll">lsdflkjsdflkjll (Redirect to Top)</Link></li>
      </ul>

      <Switch>
        {routes.map(({ path, component }) => (
          // https://github.com/ReactTraining/react-router/issues/4105#issuecomment-294315922
          <Route exact key={path} path={path} render={iDontKnowProps => HOC(component, { ...props, ...iDontKnowProps })} />
        ))}
        <Redirect from="*" to="/" />
      </Switch>

    </div>
  );
}
// {routes.map(({ path, component }) => <Route exact key={path} path={path} component={component} {...props} />)}
