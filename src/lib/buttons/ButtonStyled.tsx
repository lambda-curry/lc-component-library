import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonBase } from './ButtonBase';

export const ButtonStyled: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonBase
    {...props}
    className={classNames(
      [
        `lc-button-styled`,
        `lc-h-48`,
        `lc-rounded`,
        `lc-py-14`,
        `lc-px-20`,
        `lc-text-sm`,
        `lc-leading-4`,
        `lc-font-bold`,
        `lc-border-1`,
        `focus:lc-ring-4`,
        `focus:lc-ring-opacity-50`,
        `focus:lc-outline-none`
      ],
      className
    )}
  />
);
