import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonWarning: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-warning`,
        `lc-text-white`,
        `lc-bg-warning`,
        `lc-border-warning`,
        `hover:lc-text-white`,
        `hover:lc-bg-warning-dark`,
        `hover:lc-border-warning-dark`,
        `focus-visible:lc-ring-warning`
      ],
      className
    )}
  />
));
