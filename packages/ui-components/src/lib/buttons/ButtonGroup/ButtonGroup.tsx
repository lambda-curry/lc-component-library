import React, { FC } from 'react';
import classNames from 'classnames';
import './button-group.css';
import { PropsWithChildren } from 'react';

export const ButtonGroup: FC<PropsWithChildren<{ className?: string }>> = ({ className, ...props }) => (
  <div {...props} className={classNames('lc-button-group', className)} />
);
