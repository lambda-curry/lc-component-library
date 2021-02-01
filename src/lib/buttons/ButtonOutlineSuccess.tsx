import React, { FC } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from './Button';

export const ButtonOutlineSuccess: FC<ButtonProps> = ({ className, ...rest }) => (
  <Button {...rest} className={classNames('lc-button-outline-success', className)} />
);
