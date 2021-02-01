import React from 'react';
import classNames from 'classnames';
import { Icon, DefaultIconNames } from '../icon/Icon';
import { Button, ButtonProps } from '../buttons/Button';

import './icon-button.scss';

export interface IconButtonProps extends ButtonProps {
  icon: DefaultIconNames | string;
}
export const IconButton: React.FC<IconButtonProps> = ({ className, icon, ...rest }) => (
  <Button {...rest} className={classNames('lc-icon-button', className)}>
    <Icon name={icon} />
  </Button>
);
