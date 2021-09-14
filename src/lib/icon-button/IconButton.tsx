import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, IconNames } from '../icon/Icon';
import { ButtonProps } from '../buttons/ButtonBase';
import { ButtonStyled } from '../buttons/ButtonStyled';
import './icon-button.css';

export interface IconButtonProps extends ButtonProps {
  icon: IconNames;
}

export const IconButton: FC<IconButtonProps> = ({ className, icon, ...props }) => (
  <ButtonStyled {...props} className={classNames([`lc-icon-button`, `focus-visible:lc-ring-gray-lighter`], className)}>
    <Icon name={icon} />
  </ButtonStyled>
);
