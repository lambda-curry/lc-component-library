import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonWarn: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-warn`,
        `lc-text-white`,
        `lc-bg-warn`,
        `lc-border-warn`,
        `hover:lc-text-white`,
        `hover:lc-bg-warn-dark`,
        `hover:lc-border-warn-dark`,
        `focus-visible:lc-ring-warn`
      ],
      className
    )}
  />
));
