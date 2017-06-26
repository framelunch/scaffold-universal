import { combineReducers } from 'redux';
import users from './userlist';
import visibilityFilter from './visibilityFilter';

export default combineReducers({
  users,
  visibilityFilter,
});
