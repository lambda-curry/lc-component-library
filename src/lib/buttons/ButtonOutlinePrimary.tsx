import React, { FC } from 'react';
import classNames from 'classnames';
import { Button } from '.';
import { ButtonProps } from './Button';

export const ButtonOutlinePrimary: FC<ButtonProps> = ({ className, ...rest }) => (
  <Button {...rest} className={classNames('lc-button-outline-primary', className)} />
);
