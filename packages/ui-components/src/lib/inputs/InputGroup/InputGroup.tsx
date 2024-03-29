import React, { FC, HTMLAttributes } from 'react';
import classNames from 'classnames';
import './input-group.css';

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const InputGroup: FC<InputGroupProps> = ({ className, ...props }) => (
  <div className={classNames('lc-input-group', className)} {...props} />
);
