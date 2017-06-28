import { handleActions } from 'redux-actions';
import { usersStartFetch, usersResult } from '../actions';

export default handleActions({
  [usersStartFetch]: (state, action) => ({
    isFetched: false,
    data: [],
  }),
  [usersResult]: (state, action) => ({
    isFetched: true,
    data: [
      ...state.data,
      ...action.payload,
    ],
  }),
}, {});
