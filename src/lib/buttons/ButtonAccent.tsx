import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonAccent: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-accent`,
        `lc-text-white`,
        `lc-bg-accent`,
        `lc-border-accent`,
        `hover:lc-text-white`,
        `hover:lc-bg-accent-dark`,
        `hover:lc-border-accent-dark`,
        `focus-visible:lc-ring-accent`
      ],
      className
    )}
  />
);
