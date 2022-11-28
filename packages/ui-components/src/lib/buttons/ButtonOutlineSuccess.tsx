import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineSuccess: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-outline-success`,
        `lc-text-success`,
        `lc-border-success`,
        `lc-bg-transparent`,
        `hover:lc-text-white`,
        `hover:lc-bg-success`,
        `focus-visible:lc-ring-success`
      ],
      className
    )}
  />
));
