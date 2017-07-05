// @flow
import { createAction, handleActions } from 'redux-actions';
import { getUsers } from '../../helpers/fetches';

import type { Action } from '../../types';
import type { UsersState } from './types';

export const USERS_START_FETCH = 'usersStartFetch';
export const USERS_RESULT = 'usersResult';

export const usersResult = createAction(USERS_RESULT, users => users);
export const usersStartFetch = createAction(USERS_START_FETCH);

export const epics = [
  (action$: Observable<Action>) => (
      action$.ofType(USERS_START_FETCH)
        .switchMap(() => getUsers())
        .map(result => usersResult(result))),
];

export const reducer = handleActions({
  [USERS_START_FETCH]: (): UsersState => ({
    isFetched: false,
    data: [],
  }),
  [USERS_RESULT]: (state: UsersState, action: Action): UsersState => ({
    isFetched: state.isFetched,
    data: [
      ...state.data,
      ...action.payload,
    ],
  }),
}, { isFetched: false, data: [] });
