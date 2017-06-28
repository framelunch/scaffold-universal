import { createActions } from 'redux-actions';

const actions = createActions(
  {
    SET_TOP_TEXT: text => text,
  },
  'REQUEST_API',
  'RESPONSE_API',
);

export default actions;

export function addUsers(fetchData) {
  return dispatch => {
    dispatch(actions.requestApi());
    return fetchData({ urlHeader: '' }).then(users => {
      dispatch(actions.responseApi());
      dispatch({
        type: 'ADD_USERS',
        payload: users,
      });
    });
  };
}
