import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineWarning: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-outline-warning`,
        `lc-text-warning`,
        `lc-border-warning`,
        `lc-bg-transparent`,
        `hover:lc-text-white`,
        `hover:lc-bg-warning`,
        `focus-visible:lc-ring-warning`
      ],
      className
    )}
  />
));
