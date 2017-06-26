import React from 'react';

export default ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a
      href="void();"
      onClick={
        e => {
          e.preventDefault();
          onClick();
        }
      }
    >{children}</a>
  );
};
