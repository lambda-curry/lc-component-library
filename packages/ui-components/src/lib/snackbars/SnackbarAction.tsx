import React, { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ButtonProps } from '../buttons/ButtonBase';
import { ButtonUnstyled } from '../buttons/ButtonUnstyled';

export interface SnackbarActionProps extends ButtonProps {}

export const SnackbarAction: FC<PropsWithChildren<SnackbarActionProps>> = ({ className, ...props }) => (
  <ButtonUnstyled className={classNames('snackbar-action', className)} {...props} />
);
