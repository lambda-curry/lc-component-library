import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonDanger: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-danger`,
        `lc-text-white`,
        `lc-bg-danger`,
        `lc-border-danger`,
        `hover:lc-text-white`,
        `hover:lc-bg-danger-dark`,
        `hover:lc-border-danger-dark`,
        `focus-visible:lc-ring-danger`
      ],
      className
    )}
  />
);
