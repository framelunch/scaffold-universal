import { createStore } from 'redux';

const initState = {
  users: [],
  user: {},
};

export const INITIALIZE = 'initialize';

export const actions = {
  initialize(data) {
    return {
      type: INITIALIZE,
      data,
    };
  },
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return Object.assign({}, state);
    default:
      return state;
  }
};

export const store = createStore(reducer, initState);
