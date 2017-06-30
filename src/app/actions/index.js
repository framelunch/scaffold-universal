import { createActions } from 'redux-actions';

export const SET_TOP_TEXT = 'setTopText';
export const USERS_START_FETCH = 'usersStartFetch';
export const USERS_RESULT = 'usersResult';

export const {
  setTopText,
  usersStartFetch,
  usersResult,
} = createActions(
  {
    [SET_TOP_TEXT]: text => text,
    [USERS_RESULT]: users => users,
  },
  USERS_START_FETCH,
);
