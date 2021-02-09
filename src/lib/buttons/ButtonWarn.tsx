import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonWarn: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-warn`,
        `lc-text-white`,
        `lc-bg-warn`,
        `lc-border-warn`,
        `hover:lc-bg-warn-dark`,
        `hover:lc-border-warn-dark`,
        `focus:lc-ring-warn`
      ],
      className
    )}
  />
);
