import React from 'react';
import classNames from 'classnames';
import { Button } from '.';
import { ButtonProps } from './Button';

export const ButtonAccent = ({ className, ...rest }: ButtonProps) => (
  <Button {...rest} className={classNames('button-accent', className)} />
);
