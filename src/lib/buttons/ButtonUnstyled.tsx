import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonBase, ButtonProps } from './ButtonBase';

export const ButtonUnstyled: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonBase
    {...props}
    ref={ref}
    className={classNames(
      [
        `lc-button-unstyled`,
        `lc-bg-transparent`,
        `lc-border-none`,
        `lc-padding-0`,
        `focus:lc-outline-none`,
        `focus-visible:lc-outline-black`
      ],
      className
    )}
  />
));
