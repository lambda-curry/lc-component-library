import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonUnstyled } from './ButtonUnstyled';

export const ButtonLink: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonUnstyled
    {...props}
    className={classNames(
      [`lc-button-link`, `lc-text-primary`, `hover:lc-text-primary-dark`, `focus:lc-text-primary-dark`],
      className
    )}
  />
);
