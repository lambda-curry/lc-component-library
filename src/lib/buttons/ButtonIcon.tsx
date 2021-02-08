import React, { FC } from 'react';
import classNames from 'classnames';

export interface ButtonIconProps {
  className?: string;
}

export const ButtonIcon: FC<ButtonIconProps> = ({ className, ...props }) => (
  <span {...props} className={classNames([`lc-button-icon`], className)} />
);
