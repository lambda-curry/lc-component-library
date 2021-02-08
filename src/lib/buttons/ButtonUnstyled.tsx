import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonBase, ButtonProps } from './ButtonBase';

export const ButtonUnstyled: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonBase
    {...props}
    className={classNames([`lc-button-unstyled`, `lc-bg-transparent`, `focus:lc-outline-black`], className)}
  />
);
