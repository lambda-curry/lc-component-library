import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import './button-group.css';

export type ButtonGroupProps = PropsWithChildren<{ className?: string }>;

export const ButtonGroup: FC<ButtonGroupProps> = ({ className, ...props }) => (
  <div className={classNames('lc-button-group', className)} {...props} />
);
