import React, { FC, ReactNode } from 'react';

import '../../styles/index.scss';

export interface ThemeBaseProps {
  as: keyof JSX.IntrinsicElements;
  children: ReactNode;
}

export const ThemeBase: FC<ThemeBaseProps> = ({ as: T = 'div', ...props }) => (
  <T className="lc-theme-base" {...props} />
);
