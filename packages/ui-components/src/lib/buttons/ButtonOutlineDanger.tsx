import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineDanger: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-outline-danger`,
        `lc-text-danger`,
        `lc-bg-transparent`,
        `lc-border-danger`,
        `hover:lc-text-white`,
        `hover:lc-bg-danger`,
        `focus-visible:lc-ring-danger`
      ],
      className
    )}
  />
));
