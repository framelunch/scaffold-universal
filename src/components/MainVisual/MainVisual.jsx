import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import style from './MainVisual.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

export default class MainVisual extends React.Component {
  // サーバでメモリリークの原因になるため、こう書くのがよいとのこと
  // https://developers.cyberagent.co.jp/blog/archives/3513/
  static get defaultProps() {
    return {
      name: 'test',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      dispText: this.props.name,
      data: {
        a: true,
      },
      radio: 'first',
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
    this.onChangeRadio = this.onChangeRadio.bind(this);
  }

  componentDidMount() {
    console.log(findDOMNode(this));
  }

  onChangeInput({ target: { value } }) {
    this.setState(Object.assign({}, this.state, { dispText: value }));
  }

  onChangeCheckbox({ target: { name, checked } }) {
    this.setState(Object.assign({}, this.state, {
      data: Object.assign({}, this.state.data, {
        [name]: checked,
      }),
    }));
  }

  onChangeRadio({ target: { value }}) {
    this.setState(Object.assign({}, this.state, { radio: value }));
  }

  render() {
    return (
      <div className={style.header}>
        <input
          type="text"
          value={this.state.dispText}
          onChange={this.onChangeInput}
        />

        <input
          type="checkbox"
          name="a"
          checked={this.state.data.a}
          onChange={this.onChangeCheckbox}
        />

        <input
          type="radio"
          value="first"
          checked={this.state.radio === 'first'}
          onChange={this.onChangeRadio}
        />
        <input
          type="radio"
          value="second"
          checked={this.state.radio === 'second'}
          onChange={this.onChangeRadio}
        />

        <p>{this.props.name}</p>
        <p>2016 - {new Date().getFullYear()}</p>
        <img src={clickSvg} alt="test" width={50} />
        <img src={iconPng} alt="test" width={50} />
      </div>
    );
  }
}

MainVisual.propTypes = {
  name: PropTypes.string.isRequired,
};

