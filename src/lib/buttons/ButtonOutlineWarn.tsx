import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineWarn: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonStyled
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-outline-warn`,
        `lc-text-warn`,
        `lc-border-warn`,
        `hover:lc-text-white`,
        `hover:lc-bg-warn`,
        `focus-visible:lc-ring-warn`
      ],
      className
    )}
  />
));
