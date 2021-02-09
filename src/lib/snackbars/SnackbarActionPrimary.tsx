import React, { FC } from 'react';
import classNames from 'classnames';
import { SnackbarAction } from './SnackbarAction';
import { ButtonProps } from '../buttons';

export const SnackbarActionPrimary: FC<ButtonProps> = ({ className, ...props }) => (
  <SnackbarAction className={classNames('snackbar-action-primary', className)} {...props} />
);
