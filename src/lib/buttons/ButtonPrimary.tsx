import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonPrimary: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-primary`,
        `lc-text-white`,
        `lc-bg-primary`,
        `lc-border-primary`,
        `hover:lc-text-white`,
        `hover:lc-bg-primary-dark`,
        `hover:lc-border-primary-dark`,
        `focus-visible:lc-ring-primary`
      ],
      className
    )}
  />
));
