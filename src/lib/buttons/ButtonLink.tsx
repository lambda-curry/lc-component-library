import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonUnstyled } from '.';
import { ButtonProps } from './Button';

export const ButtonLink: FC<ButtonProps> = ({ className, ...rest }) => (
  <ButtonUnstyled {...rest} className={classNames('lc-button-link', className)} />
);
