import { handleActions } from 'redux-actions';

export default handleActions({
  SET_TOP_TEXT: (state, action) => action.payload,
}, 'default text');
