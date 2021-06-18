import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, IconNames } from '../icon/Icon';
import { ButtonStyled, ButtonProps } from '../buttons';

import './icon-button.css';

export interface IconButtonProps extends ButtonProps {
  icon: IconNames;
}

export const IconButton: FC<IconButtonProps> = ({ className, icon, ...props }) => (
  <ButtonStyled
    {...props}
    className={classNames(
      [
        `lc-icon-button`,
        `lc-text-gray-dark`,
        `hover:lc-bg-gray-lighter`,
        // `focus-visible:lc-bg-gray-lightest`,
        // `focus-visible:lc-border-gray-lightest`,
        `focus-visible:lc-ring-gray-lighter`
      ],
      className
    )}
  >
    <Icon name={icon} />
  </ButtonStyled>
);
