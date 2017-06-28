import { handleActions } from 'redux-actions';
import { setTopText } from '../actions';

export default handleActions({
  [setTopText]: (state, action) => action.payload,
}, 'default text');
