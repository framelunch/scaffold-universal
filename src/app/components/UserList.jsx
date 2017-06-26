import React from 'react';
import User from './User';

export default ({ users, onUserClick }) => (
  <ul>
    {users.map(user => (
      <User key={user.id} {...user} onClick={() => onUserClick(user.id)} />
    ))}
  </ul>
);
