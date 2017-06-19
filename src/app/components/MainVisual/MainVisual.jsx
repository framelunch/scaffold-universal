// @flow
import React from 'react';
import { findDOMNode } from 'react-dom';

import style from './MainVisual.css';
import clickSvg from './assets/click.svg';
import iconPng from './assets/icon.png';

type Props = {
  name: string
};
type Data = {
  a: boolean
}
type State = {
  dispText: string,
  radio: string,
  data: Data
};

export default class MainVisual extends React.Component<Props, Props, State> {
  state: State; // Stateは親クラスが定義してないからここで宣言
  elm: HTMLElement;
  onChangeInput: (e: Event) => void;
  onChangeCheckbox: (e: Event) => void;
  onChangeRadio: (e: Event) => void;

  static defaultProps = {
    name: 'test',
  }

  // サーバでメモリリークの原因になるため、こう書くのがよいとのこと
  // https://developers.cyberagent.co.jp/blog/archives/3513/
  // FIXME: flowtypeのエラーを解決できなかった
  /*
  static get defaultProps(): Props {
    return {
      name: 'test',
    };
  }
  */

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

  onChangeInput(e: Event & {target: HTMLInputElement}) {
    const target = e.target;
    this.setState(Object.assign({}, this.state, { dispText: target.value }));
  }

  onChangeCheckbox(e: Event & {target: HTMLInputElement}) {
    const target = e.target;

    this.setState(Object.assign({}, this.state, {
      data: Object.assign({}, this.state.data, {
        [target.name]: target.checked,
      }),
    }));
  }

  onChangeRadio(e: Event & {target: HTMLInputElement}) {
    const target = e.target;
    this.setState(Object.assign({}, this.state, { radio: target.value }));
  }

  render() {
    return (
      <div className={style.MainVisual} ref={elm => (this.elm = elm)}>
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
