import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonBase } from './ButtonBase';

export const ButtonStyled: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonBase
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-styled`,
        `lc-h-48`,
        `lc-py-14`,
        `lc-px-20`,
        `lc-text-sm`,
        `lc-leading-4`,
        `lc-font-bold`,
        `lc-border-1`,
        `lc-rounded`,
        `focus:lc-ring-4`,
        `focus:lc-ring-opacity-50`,
        `focus:lc-outline-none`
      ],
      className
    )}
  />
));
