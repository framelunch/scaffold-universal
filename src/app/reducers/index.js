import { combineReducers } from 'redux';
import top from './top';
import users from './userlist';

export default combineReducers({
  top,
  users,
});
