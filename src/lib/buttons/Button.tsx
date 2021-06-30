import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps, ButtonStyled } from '../buttons';

export const Button: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
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
));
