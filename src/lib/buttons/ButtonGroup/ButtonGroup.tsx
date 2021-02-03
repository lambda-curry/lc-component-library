import React from 'react';
import classNames from 'classnames';
import './button-group.css';

export const ButtonGroup: React.FC<{ className?: string }> = ({ className, ...rest }) => (
  <div {...rest} className={classNames('lc-button-group', className)} />
);
