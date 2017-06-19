import { createStore } from 'redux';

export const INITIALIZE = 'initialize';
export const AWAKE = 'awake';

export const actions = {
  initialize(data) {
    return {
      type: INITIALIZE,
      data,
    };
  },
  awake() {
    return {
      type: AWAKE,
    };
  },
};

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state, action.data);
    case AWAKE:
      return Object.assign({}, state);
    default:
      return state;
  }
};

export const store = createStore(reducer, { init: 1234 });
