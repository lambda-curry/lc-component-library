import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonUnstyled } from './ButtonUnstyled';

export const ButtonLink: FC<ButtonProps> = forwardRef(({ className, ...props }, ref) => (
  <ButtonUnstyled
    {...props}
    ref={ref}
    className={classNames(
      [`lc-button-link`, `lc-text-primary`, `hover:lc-text-primary-dark`, `focus:lc-text-primary-dark`],
      className
    )}
  />
));
