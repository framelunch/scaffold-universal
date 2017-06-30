import { handleActions } from 'redux-actions';
import { SET_TOP_TEXT } from '../actions';

export default handleActions({
  [SET_TOP_TEXT]: (state, action) => action.payload,
}, 'default text');
