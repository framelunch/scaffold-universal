import { createActions } from 'redux-actions';

export const { setTopText, usersResult, usersStartFetch } = createActions(
  {
    SET_TOP_TEXT: text => text,
    USERS_RESULT: users => users,
  },
  'USERS_START_FETCH',
);
