import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutline: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-outline`,
        `lc-text-gray-darker`,
        `lc-bg-transparent`,
        `lc-border-gray-light`,
        `hover:lc-text-black`,
        `hover:lc-bg-gray-light`,
        `focus-visible:lc-ring-gray-lighter`
      ],
      className
    )}
  />
));
