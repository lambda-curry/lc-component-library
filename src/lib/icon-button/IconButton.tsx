import React from 'react';
import classNames from 'classnames';
import { Icon, IconNames } from '../icon/Icon';
import { Button, ButtonProps } from '../buttons';

import './icon-button.css';

export interface IconButtonProps extends ButtonProps {
  icon: IconNames;
}
export const IconButton: React.FC<IconButtonProps> = ({ className, icon, ...rest }) => (
  <Button {...rest} className={classNames('lc-icon-button', className)}>
    <Icon name={icon} />
  </Button>
);
