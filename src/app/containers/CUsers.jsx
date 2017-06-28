import React from 'react';
import { connect } from 'react-redux';
import 'isomorphic-fetch';
import * as actions from '../actions';

class Users extends React.Component {
  static fetchData({ urlHeader }) {
    return new Promise((resolve, reject) => {
      fetch(`${urlHeader}/api/users`)
        .then(data => data.json())
        .then(users => resolve(users))
        .catch(error => reject(error));
    });
  }

  componentDidMount() {
    const { dispatch, isFetched } = this.props;
    if (isFetched) return;
    dispatch(actions.addUsers(Users.fetchData));
  }

  render() {
    return (
      <ul>
        {(this.props.data || []).map(({ name }, i) => <li key={i.toString()}>{name}</li>)}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state.users,
  };
}

function mapDispatchToProps(dispatch) {
  // FIXME : デフォルトでprops.dispatchが含まれる。カスタマイズが必要な時のみ定義する
  return {};
}

export default connect(mapStateToProps)(Users);
