import React, { FC } from 'react';
import classNames from 'classnames';
import { Icon, DefaultIconNames } from './Icon';
import { getColorVar, getCssVar, isRgbColor } from '../util/colors';

export interface DecorativeIconProps {
  className?: string;
  color: string;
  name: DefaultIconNames | string;
}

export const DecorativeIcon: FC<DecorativeIconProps> = ({ className, color, name, ...props }) => {
  const customColor = getColorVar(color) || getCssVar(color) || color || '';

  const backgroundColor = customColor && isRgbColor(customColor) ? `${customColor}` : customColor;

  console.log('>>>', { cssVar: getColorVar(color) || getCssVar(color), customColor, backgroundColor });

  return (
    <div
      className={classNames('lc-icon-decorative', className)}
      style={customColor ? { backgroundColor } : undefined}
      {...props}
    >
      <Icon name={name} />
    </div>
  );
};
