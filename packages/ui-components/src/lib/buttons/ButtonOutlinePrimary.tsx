import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlinePrimary: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
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
));
