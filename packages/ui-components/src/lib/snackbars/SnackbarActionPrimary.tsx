import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { SnackbarAction, SnackbarActionProps } from './SnackbarAction';

export const SnackbarActionPrimary: FC<PropsWithChildren<SnackbarActionProps>> = ({ className, ...props }) => (
  <SnackbarAction className={classNames('snackbar-action-primary', className)} {...props} />
);
