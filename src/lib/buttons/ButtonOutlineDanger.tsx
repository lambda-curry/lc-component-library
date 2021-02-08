import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineDanger: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-outline-danger`,
        `lc-text-danger`,
        `lc-border-danger`,
        `hover:lc-text-white`,
        `hover:lc-bg-danger`,
        `focus:lc-ring-danger`
      ],
      className
    )}
  />
);
