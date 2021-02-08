import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineAccent: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-outline-accent`,
        `hover:lc-text-white`,
        `lc-text-accent`,
        `lc-border-accent`,
        `hover:lc-bg-accent`,
        `focus:lc-ring-accent`
      ],
      className
    )}
  />
);
