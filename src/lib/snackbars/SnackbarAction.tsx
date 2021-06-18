import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonUnstyled } from '../buttons';

export interface SnackbarActionProps extends ButtonProps {}

export const SnackbarAction: FC<SnackbarActionProps> = ({ className, ...props }) => (
  <ButtonUnstyled className={classNames('snackbar-action', className)} {...props} />
);
