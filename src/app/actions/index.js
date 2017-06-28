export const REQUEST_API = 'REQUEST_API';
export const RESPONSE_API = 'RESPONSE_API';

function requestAPI() {
  return {
    type: REQUEST_API,
  };
}
function responseAPI(json) {
  return {
    type: RESPONSE_API,
  };
}

export function addUsers(fetchData) {
  return dispatch => {
    dispatch(requestAPI());
    return fetchData({ urlHeader: '' }).then(users => {
      dispatch(responseAPI());
      dispatch({
        type: 'ADD_USERS',
        users,
      });
    });
  };
}

export function setTopText(text) {
  return {
    type: 'SET_TOP_TEXT',
    text,
  };
}
