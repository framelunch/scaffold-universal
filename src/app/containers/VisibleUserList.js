import { connect } from 'react-redux';
import { toggleUser } from '../actions';
import UserList from '../components/UserList';

function getVisibleUsers(users, filter) {
  switch (filter) {
    case 'SHOW_ALL':
      return users;
    case 'SHOW_COMPLETED':
      return users.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return users.filter(t => !t.completed);
  }
}

function mapStateToProps(state) {
  return {
    users: getVisibleUsers(state.users, state.visibilityFilter),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUserClick(id) {
      dispatch(toggleUser(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
