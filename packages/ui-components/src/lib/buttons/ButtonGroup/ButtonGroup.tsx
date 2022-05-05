import React, { FC } from 'react';
import classNames from 'classnames';
import './button-group.css';

export interface ButtonGroupProps {
  className?: string;
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, ...props }) => (
  <div className={classNames('lc-button-group', className)} {...props} />
);
