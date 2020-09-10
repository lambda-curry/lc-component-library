import React from 'react';
import classNames from 'classnames';
import { Button } from '.';
import { ButtonProps } from './Button';

export const ButtonOutlineWarn = ({ className, ...rest }: ButtonProps) => (
  <Button {...rest} className={classNames('button-outline-warn', className)} />
);
