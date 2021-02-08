import React, { FC } from 'react';
import classNames from 'classnames';
import { ButtonProps } from './ButtonBase';
import { ButtonStyled } from './ButtonStyled';

export const ButtonOutlineWarn: FC<ButtonProps> = ({ className, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-button-outline-warn`,
        `hover:lc-text-white`,
        `lc-text-warn`,
        `lc-border-warn`,
        `hover:lc-bg-warn`,
        `focus:lc-ring-warn`
      ],
      className
    )}
  />
);
