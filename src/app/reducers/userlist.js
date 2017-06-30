import { handleActions } from 'redux-actions';
import { USERS_START_FETCH, USERS_RESULT } from '../actions';

export default handleActions({
  [USERS_START_FETCH]: (state, action) => ({
    isFetched: false,
    data: [],
  }),
  [USERS_RESULT]: (state, action) => ({
    isFetched: true,
    data: [
      ...state.data,
      ...action.payload,
    ],
  }),
}, {});
