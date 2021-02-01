import React, { FC, ReactNode } from 'react';

import '../../styles/index.scss';

export interface ThemeBaseProps {
  children: ReactNode;
}

export const ThemeBase: FC<ThemeBaseProps> = ({ children }) => {
  return <div className="lc-theme-base">{children}</div>;
};
