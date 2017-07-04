// @flow
import React from 'react';
import { connect } from 'react-redux';
import { actions } from './index';

const Top = ({ top, onChangeText }: {top: string, onChangeText: Function}) => (
  <div>
    <h1>{top}</h1>
    <div>
      <button onClick={e => onChangeText('top text 1')}>text1</button>
      <button onClick={e => onChangeText('top text 2')}>text2</button>
    </div>
  </div>
);

function mapStateToProps(state) {
  return {
    top: state.top,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    onChangeText(text) {
      dispatch(actions.setTopText(text));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
