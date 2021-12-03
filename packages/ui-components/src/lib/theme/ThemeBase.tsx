import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { ThemeProvider as MUIThemeProvider, createTheme, Theme } from '@mui/material/styles';

import '../../styles/index.css';
const muiTheme = createTheme();

export interface ThemeBaseProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
  theme?: Theme;
}

export const ThemeBase: FC<ThemeBaseProps> = ({ as: T = 'div', className, theme = muiTheme, ...props }) => {
  return (
    <MUIThemeProvider theme={muiTheme}>
      <T className={classNames('lc-theme-base', className)} {...props} />
    </MUIThemeProvider>
  );
};
