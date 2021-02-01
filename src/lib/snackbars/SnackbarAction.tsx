import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonUnstyled } from '../buttons';

export const SnackbarAction: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonUnstyled className={classNames('snackbar-action', className)} {...props} />
);
