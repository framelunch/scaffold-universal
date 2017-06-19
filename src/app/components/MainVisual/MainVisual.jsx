// @flow
import React from 'react';
import { findDOMNode } from 'react-dom';

import style from './MainVisual.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

type Props = {
  name: string
};

type State = {
  dispText: string,
  radio: string,
  data: {
    a: boolean
  }
};

export default class MainVisual extends React.Component {
  props: Props;
  state: State;
  onChangeInput: (e: Event) => void;
  onChangeCheckbox: (e: Event) => void;
  onChangeRadio: (e: Event) => void;

  // サーバでメモリリークの原因になるため、こう書くのがよいとのこと
  // https://developers.cyberagent.co.jp/blog/archives/3513/
  static get defaultProps() {
    return {
      name: 'test',
    };
  }

  constructor(props: Props) {
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

  onChangeInput(e: Event) {
    const { currentTarget: { value } } = e;
    this.setState(Object.assign({}, this.state, { dispText: value }));
  }

  onChangeCheckbox(e: Event) {
    const { target: { name, checked } } = e;
    this.setState(Object.assign({}, this.state, {
      data: Object.assign({}, this.state.data, {
        [name]: checked,
      }),
    }));
  }

  onChangeRadio(e: Event) {
    const { target: { value }} = e;
    this.setState(Object.assign({}, this.state, { radio: value }));
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
