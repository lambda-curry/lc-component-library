import React from 'react';
import classNames from 'classnames';
import { ButtonUnstyled } from '.';
import { ButtonProps } from './Button';

export const ButtonLink = ({ className, ...rest }: ButtonProps) => (
  <ButtonUnstyled {...rest} className={classNames('lc-button-link', className)} />
);
