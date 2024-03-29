import React, { FC, ReactNode } from 'react';
import classNames from 'classnames';
import { ThemeProvider as MUIThemeProvider, createTheme, Theme } from '@mui/material/styles';

import '../../styles/index.css';
const muiTheme = createTheme();

export interface ThemeBaseProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  theme?: Theme;
  children?: ReactNode;
}

export const ThemeBase: FC<ThemeBaseProps> = ({ as: T = 'div', className, theme = muiTheme, children, ...props }) => (
  <MUIThemeProvider theme={muiTheme}>
    <T className={classNames('lc-theme-base', className)} {...props} children={children as any} />
  </MUIThemeProvider>
);
