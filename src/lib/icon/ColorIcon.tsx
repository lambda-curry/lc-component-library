import React, { FC, SVGProps, useContext } from 'react';
import classNames from 'classnames';
import { RegisteredIconContext } from './IconRegistry';
import './icon.scss';

import { ReactComponent as googleCalendar } from '../assets/color-icons/GoogleCalendar.svg';
import { ReactComponent as outlook } from '../assets/color-icons/Outlook.svg';

export const defaultColorIcons = {
  googleCalendar,
  outlook
};

export type DefaultColorIconNames = keyof typeof defaultColorIcons;

export interface ColorIconProps {
  className?: string;
  name: DefaultColorIconNames | string;
  viewBox?: string;
}

export const ColorIcon: FC<ColorIconProps> = ({ className, name, viewBox = '0 0 24 24', ...props }) => {
  const registeredIcons = useContext(RegisteredIconContext);

  const icons: { [x: string]: FC<SVGProps<SVGSVGElement>> } = {
    ...defaultColorIcons,
    ...registeredIcons
  };

  if (!name) {
    throw new Error(`You must provide a valid "name" prop to the "Icon" component.`);
  }

  if (!icons[name]) {
    throw new Error(`Color Icon with name "${name}" does not exist.`);
  }

  const IconSvg = icons[name];

  return (
    <span className={classNames('lc-icon', `lc-icon-color`, `lc-icon-${name}`, className)} {...props}>
      <IconSvg viewBox={viewBox} />
    </span>
  );
};
