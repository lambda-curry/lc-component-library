import classNames from 'classnames';
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

import './input-group.css';

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const InputGroup: FC<PropsWithChildren<InputGroupProps>> = ({ className, ...props }) => (
  <div className={classNames('lc-input-group', className)} {...props} />
);
