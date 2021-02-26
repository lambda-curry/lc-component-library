import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-default`,
        `lc-text-gray-darker`,
        `lc-bg-gray-lighter`,
        `lc-border-gray-lighter`,
        `hover:lc-text-black`,
        `hover:lc-bg-gray-light`,
        `hover:lc-border-gray-light`,
        `focus-visible:lc-ring-gray-lighter`
      ],
      className
    )}
  />
);
