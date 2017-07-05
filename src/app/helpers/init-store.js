import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import * as top from '../containers/Top/constants';
import * as user from '../containers/Users/constants';

const epics = combineEpics(
  ...user.epics,
);
const reducer = combineReducers({
  top: top.reducer,
  users: user.reducer,
});

export default state => (
  createStore(
    reducer,
    state,
    applyMiddleware(createEpicMiddleware(epics)),
  )
);
