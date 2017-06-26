let nextUserId = 0;
export const addUser = text => {
  nextUserId += 1;

  return {
    type: 'ADD_USER',
    id: nextUserId,
    text,
  };
};

export const setVisibilityFilter = filter => (
  {
    type: 'SET_VISIBILITY_FILTER',
    filter,
  }
);

export const toggleUser = id => (
  {
    type: 'TOGGLE_USER',
    id,
  }
);
