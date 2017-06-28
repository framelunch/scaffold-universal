import React from 'react';
import { connect } from 'react-redux';
import { setTopText } from '../actions';

const Top = ({top, onChangeText}) => (
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

function mapDispatchToProps(dispatch) {
  return {
    onChangeText(text) {
      dispatch(setTopText(text));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Top);
