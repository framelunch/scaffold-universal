// @flow
import React from 'react';
import { connect } from 'react-redux';
import 'isomorphic-fetch';

import { getUsers } from '../../helpers/fetches';
import { usersStartFetch } from './constants';

import type { UsersProps } from './types';

class Users extends React.Component {
  props: UsersProps;
  static fetchData() { return getUsers(); }

  componentDidMount() {
    const { dispatch, isFetched } = this.props;
    if (isFetched) return;
    if (dispatch) dispatch(usersStartFetch());
  }

  render() {
    return (
      <ul>
        {(this.props.data || []).map(({ name }, i) => <li key={i.toString()}>{name}</li>)}
      </ul>
    );
  }
}

function mapStateToProps(state): UsersProps {
  return {
    ...state.users,
  };
}

function mapDispatchToProps(dispatch) {
  // FIXME : デフォルトでprops.dispatchが含まれる。カスタマイズが必要な時のみ定義する
  return {};
}

export default connect(mapStateToProps)(Users);
