import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonUnstyled } from '..';
import { ButtonProps } from '../buttons/Button';

export const SnackbarAction: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonUnstyled className={classNames('snackbar-action', className)} {...props} />
);
