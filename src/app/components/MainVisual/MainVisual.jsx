import React from 'react';
import { findDOMNode } from 'react-dom';

import style from './MainVisual.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

export default class MainVisual extends React.Component {
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

  onChangeInput(e) {
    this.state.dispText = e.target.value;
    this.setState(this.state);
  }

  onChangeCheckbox(e) {
    const target = e.target;
    this.state.data[target.name] = target.checked;
    this.setState(this.state);
  }

  onChangeRadio(e) {
    this.state.radio = e.target.value;
    this.setState(this.state);
  }

  render() {
    return (
      <div className={style.MainVisual}>
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

        <img src={iconPng} alt="test" width={50} />
        <img src={clickSvg} alt="test" width={50} />
      </div>
    );
  }
}

/* <img src={iconPng} alt="test" width={50} /> */
