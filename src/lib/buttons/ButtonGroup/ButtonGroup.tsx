import React, { FC } from 'react';
import classNames from 'classnames';
import './button-group.css';

export const ButtonGroup: FC<{ className?: string }> = ({ className, ...props }) => (
  <div {...props} className={classNames('lc-button-group', className)} />
);
