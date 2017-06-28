import 'rxjs';
import { combineEpics } from 'redux-observable';
import { usersStartFetch, usersResult } from './actions';

export function getUsers() {
  return fetch(`${process.env.DOMAIN}/api/users`)
    .then(data => data.json());
}
export default combineEpics(
  (action$ => (
      action$.ofType(usersStartFetch().type)
        .mergeMap(() => getUsers())
        .map(result => usersResult(result)))
  ),
);
