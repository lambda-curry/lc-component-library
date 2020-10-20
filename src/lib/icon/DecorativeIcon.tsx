import React from 'react';
import classNames from 'classnames';
import { Icon, DefaultIconNames } from './Icon';
import { getCssVar } from '../util/colors';

export const DecorativeIcon: React.FC<{
  className?: string;
  color: string;
  name: DefaultIconNames | string;
}> = ({ className, color, ...props }) => {
  const cssVar = getCssVar(color);
  const style = {
    backgroundColor: cssVar || color
  };

  return (
    <div className={classNames(className, 'lc-icon-decorative')} style={style}>
      <Icon {...props} />
    </div>
  );
};
