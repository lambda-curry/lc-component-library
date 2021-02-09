import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonPrimary: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-primary`,
        `lc-text-white`,
        `lc-bg-primary`,
        `lc-border-primary`,
        `hover:lc-bg-primary-dark`,
        `hover:lc-border-primary-dark`,
        `focus:lc-ring-primary`
      ],
      className
    )}
  />
);
