import React from 'react';
import classNames from 'classnames';
import { Button } from '.';
import { ButtonProps } from './Button';

export const ButtonOutlinePrimary = ({ className, ...rest }: ButtonProps) => (
  <Button {...rest} className={classNames('button-outline-primary', className)} />
);
