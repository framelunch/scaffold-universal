// @flow
import { createAction, handleActions } from 'redux-actions';

import type { Action } from '../../types';
import type { TopState } from './types';

export const SET_TOP_TEXT = 'setTopText';
export const setTopText = createAction(SET_TOP_TEXT, text => text);

export const reducer = handleActions({
  [SET_TOP_TEXT]: (state: TopState, action: Action) => action.payload,
}, { text: 'default text' });

