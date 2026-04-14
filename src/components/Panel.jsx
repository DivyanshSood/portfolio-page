import React from 'react';

const Panel = ({ children, style }) => (
  <div className="panel" style={style}>
    <div className="panel-bar">
      <div className="panel-dot dot-r" />
      <div className="panel-dot dot-a" />
      <div className="panel-dot dot-g" />
    </div>
    {children}
  </div>
);

export default Panel;
