import React from 'react';
import classNames from 'classnames';
import { Button, Icon } from '..';
import { DefaultIconNames } from '../icon/Icon';
import { ButtonProps } from '../buttons/Button';

import './icon-button.scss';

export interface IconButtonProps extends ButtonProps {
  icon: DefaultIconNames | string;
}
export const IconButton: React.FC<IconButtonProps> = ({ className, icon, ...rest }) => (
  <Button {...rest} className={classNames('icon-button', className)}>
    <Icon name={icon} />
  </Button>
);
