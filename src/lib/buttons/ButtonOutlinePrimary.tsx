import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlinePrimary: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-outline-primary`,
        `hover:lc-text-white`,
        `lc-text-primary`,
        `lc-border-primary`,
        `hover:lc-bg-primary`,
        `focus:lc-ring-primary`
      ],
      className
    )}
  />
);
