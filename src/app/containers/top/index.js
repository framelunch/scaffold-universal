import { createActions, handleActions } from 'redux-actions';

export const SET_TOP_TEXT = 'setTopText';

export const actions = createActions(
  {
    [SET_TOP_TEXT]: text => text,
  },
);

export const reducers = handleActions({
  [SET_TOP_TEXT]: (state, action) => action.payload,
}, 'default text');

