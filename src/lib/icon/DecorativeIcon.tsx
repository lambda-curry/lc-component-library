import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, DefaultIconNames } from './Icon';
import { getCssVar, isRgbColor, stripRgb } from '../util/colors';

export interface DecorativeIconProps {
  className?: string;
  color: string;
  name: DefaultIconNames | string;
}

export const DecorativeIcon: FC<DecorativeIconProps> = ({ className, color, name, ...props }) => {
  const isDefaultCssVar = getCssVar(`lc-color-${color}`);
  const customColor = !isDefaultCssVar ? getCssVar(color) || color : '';
  const backgroundColor = customColor && isRgbColor(customColor) ? `rgba(${stripRgb(customColor)})` : customColor;

  return (
    <div
      className={classNames('lc-icon-decorative', { [`lc-bg-${color}`]: isDefaultCssVar }, className)}
      style={customColor ? { backgroundColor } : undefined}
      {...props}
    >
      <Icon name={name} />
    </div>
  );
};
