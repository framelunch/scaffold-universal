export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        isFetched: true,
        data: [
          ...state.data,
          ...action.users,
        ],
      };
    default:
      return state;
  }
};
