import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, DefaultIconNames } from './Icon';
import { getCssVar } from '../util/colors';

export interface DecorativeIconProps {
  className?: string;
  color: string;
  name: DefaultIconNames | string;
}

export const DecorativeIcon: FC<DecorativeIconProps> = ({ className, color, name, ...props }) => {
  const isDefaultCssVar = getCssVar(`lc-color-${color}`);
  const customColor = !isDefaultCssVar ? getCssVar(color) || color : '';
  const style = customColor ? { backgroundColor: customColor } : undefined;

  return (
    <div
      className={classNames('lc-icon-decorative', { [`lc-bg-${color}`]: isDefaultCssVar }, className)}
      style={style}
      {...props}
    >
      <Icon name={name} />
    </div>
  );
};
