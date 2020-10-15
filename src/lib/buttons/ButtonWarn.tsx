import React from 'react';
import classNames from 'classnames';
import { Button } from '.';
import { ButtonProps } from './Button';

export const ButtonWarn = ({ className, ...rest }: ButtonProps) => (
  <Button {...rest} className={classNames('lc-button-warn', className)} />
);
