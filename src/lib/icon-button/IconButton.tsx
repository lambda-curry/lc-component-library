import React, { FC, forwardRef } from 'react';
import classNames from 'classnames';
import { Icon, IconNames } from '../icon/Icon';
import { ButtonProps } from '../buttons/ButtonBase';
import { ButtonStyled } from '../buttons/ButtonStyled';
import './icon-button.css';

export interface IconButtonProps extends ButtonProps {
  icon: IconNames;
}

export const IconButton: FC<IconButtonProps> = forwardRef(({ className, icon, ...props }, ref) => (
  <ButtonStyled
    {...props}
    className={classNames([`lc-icon-button`, `focus-visible:lc-ring-gray-lighter`], className)}
    ref={ref}
  >
    <Icon name={icon} />
  </ButtonStyled>
));
