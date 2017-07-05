// @flow
import React from 'react';
import { connect } from 'react-redux';
import { setTopText } from './constants';

import type { TopProps } from './types';

const Top = ({ text, onChangeText }: TopProps) => (
  <div>
    <h1>{text}</h1>
    <div>
      <button onClick={e => onChangeText('top text 1')}>text1</button>
      <button onClick={e => onChangeText('top text 2')}>text2</button>
    </div>
  </div>
);

function mapStateToProps(state): TopProps {
  return {
    ...state.top,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    onChangeText(text) {
      dispatch(setTopText(text));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
