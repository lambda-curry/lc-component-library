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
        `lc-text-primary`,
        `lc-border-primary`,
        `hover:lc-text-white`,
        `hover:lc-bg-primary`,
        `focus-visible:lc-ring-primary`
      ],
      className
    )}
  />
);
