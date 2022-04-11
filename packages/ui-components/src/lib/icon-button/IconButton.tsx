import React, { FC, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { Icon, IconNames, IconProps } from '../icon/Icon';
import { ButtonProps } from '../buttons/ButtonBase';
import { ButtonStyled } from '../buttons/ButtonStyled';
import './icon-button.css';

export interface IconButtonProps extends ButtonProps {
  icon: IconNames | ReactNode;
  iconProps?: IconProps;
}

export const IconButton: FC<IconButtonProps> = forwardRef(({ className, icon, iconProps, ...props }, ref) => (
  <ButtonStyled
    {...props}
    className={classNames([`lc-icon-button`, `focus-visible:lc-ring-gray-lighter`], className)}
    ref={ref}
  >
    {typeof icon === 'string' ? <Icon name={icon} {...iconProps} /> : icon}
  </ButtonStyled>
));
