import { handleActions } from 'redux-actions';

export default handleActions({
  ADD_USERS: (state, action) => ({
    isFetched: true,
    data: [
      ...state.data,
      ...action.payload,
    ],
  }),
}, {});
