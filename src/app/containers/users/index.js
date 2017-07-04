// @flow
import { createActions, handleActions } from 'redux-actions';
import { getUsers } from '../../fetches';

/* START TYPES */
export type User = {
  name: string,
  email: string
};
export type Users = Array<User>;
export type UsersState = {
  isFetched: boolean,
  data: Users,
  dispatch?: Function
};
/* END TYPES */

export const USERS_START_FETCH = 'usersStartFetch';
export const USERS_RESULT = 'usersResult';

export const actions = createActions(
  {
    [USERS_RESULT]: users => users,
  },
  USERS_START_FETCH,
);

export const epics = [
  (action$: any) => (
      action$.ofType(USERS_START_FETCH)
        .switchMap(() => getUsers())
        .map(result => actions.usersResult(result))),
];

export const reducers = handleActions({
  [USERS_START_FETCH]: (): UsersState => ({
    isFetched: false,
    data: [],
  }),
  [USERS_RESULT]: (state, action): UsersState => ({
    isFetched: true,
    data: [
      ...state.data,
      ...action.payload,
    ],
  }),
}, {});
