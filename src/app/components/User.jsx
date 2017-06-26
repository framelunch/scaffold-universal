import React from 'react';

export default ({ onClick, completed, name }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >{name}</li>
);
