import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonSuccess: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-success`,
        `lc-text-white`,
        `lc-bg-success`,
        `lc-border-success`,
        `hover:lc-text-white`,
        `hover:lc-bg-success-dark`,
        `hover:lc-border-success-dark`,
        `focus-visible:lc-ring-success`
      ],
      className
    )}
  />
));
