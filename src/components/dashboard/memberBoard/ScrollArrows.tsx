import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export function LeftArrow() {
  const { scrollPrev } = React.useContext(VisibilityContext);

  return (
    <button onClick={() => scrollPrev()} style={{ cursor: 'pointer' }}>
      ←
    </button>
  );
}

export function RightArrow() {
  const { scrollNext } = React.useContext(VisibilityContext);

  return (
    <button onClick={() => scrollNext()} style={{ cursor: 'pointer' }}>
      →
    </button>
  );
}
