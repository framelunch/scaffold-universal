import React from 'react';
import { connect } from 'react-redux';
import 'isomorphic-fetch';
import { usersStartFetch } from '../actions';
import { getUsers } from '../epics';

class Users extends React.Component {
  static fetchData() { return getUsers(); }

  componentDidMount() {
    const { dispatch, isFetched } = this.props;
    if (isFetched) return;
    dispatch(usersStartFetch());
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
