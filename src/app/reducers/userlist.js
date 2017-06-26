export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case 'TOGGLE_USER':
      return state.map(user => (
         user.id === action.id ? { ...user, completed: !user.completed } : user
      ));
    default:
      return state;
  }
};
