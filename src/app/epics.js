import 'rxjs';
import { combineEpics } from 'redux-observable';
import { USERS_START_FETCH, usersResult } from './actions';

export function getUsers() {
  return fetch(`${process.env.DOMAIN}/api/users`)
    .then(data => data.json());
}
export default combineEpics(
  (action$ => (
    action$.ofType(USERS_START_FETCH)
      .switchMap(() => getUsers())
      .map(result => usersResult(result)))
  ),
);
