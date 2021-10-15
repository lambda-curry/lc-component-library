import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';

import '../../styles/index.css';

export interface ThemeBaseProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}

export const ThemeBase: FC<ThemeBaseProps> = ({ as: T = 'div', className, ...props }) => (
  <T className={classNames('lc-theme-base', className)} {...props} />
);
