import React, { FC } from 'react';
import classNames from 'classnames';
import { Button, ButtonProps } from './Button';

export const ButtonOutlineAccent: FC<ButtonProps> = ({ className, ...rest }) => (
  <Button {...rest} className={classNames('lc-button-outline-accent', className)} />
);
