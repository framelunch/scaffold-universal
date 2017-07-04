import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import * as top from './containers/top';
import * as user from './containers/users';

const epics = combineEpics(
  ...user.epics,
);
const reducer = combineReducers({
  top: top.reducers,
  users: user.reducers,
});

export default state => (
  createStore(
    reducer,
    state,
    applyMiddleware(createEpicMiddleware(epics)),
  )
);
