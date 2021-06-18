import React, { FC } from 'react';
import classNames from 'classnames';
import { SnackbarAction, SnackbarActionProps } from './SnackbarAction';

export const SnackbarActionPrimary: FC<SnackbarActionProps> = ({ className, ...props }) => (
  <SnackbarAction className={classNames('snackbar-action-primary', className)} {...props} />
);
