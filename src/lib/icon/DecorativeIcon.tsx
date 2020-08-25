import React from 'react';
import classNames from 'classnames';
import { Icon } from './Icon';
import { DefaultIconNames } from './IconRegistry';
import { getCssVar } from '../util/colors';

export type DecorativeIconBackgroundColors =
  | 'primary_color'
  | 'secondary_color'
  | 'black'
  | 'red'
  | 'green'
  | 'blue'
  | 'light-blue'
  | 'app-green'
  | 'app-red';

export const DecorativeIcon: React.FC<{
  className?: string;
  color: DecorativeIconBackgroundColors | string;
  name: DefaultIconNames | string;
}> = ({ className, color, ...props }) => {
  // const colorIsVariable = [].includes(color);
  const style = {
    backgroundColor: false ? getCssVar(color) : color,
  };

  return (
    <div className={classNames(className, 'icon-decorative')} style={style}>
      <Icon {...props} />
    </div>
  );
};
