import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineSuccess: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-outline-success`,
        `hover:lc-text-white`,
        `lc-text-success`,
        `lc-border-success`,
        `hover:lc-bg-success`,
        `focus:lc-ring-success`
      ],
      className
    )}
  />
);
