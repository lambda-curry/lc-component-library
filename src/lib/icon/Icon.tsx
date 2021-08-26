import React, { FC, SVGProps, useContext } from 'react';
import classNames from 'classnames';
import { RegisteredIconContext } from './IconRegistry';
import './icon.css';

import * as icons from '../../assets/icons';

export const defaultIcons = icons;

const aliasMap = {
  confirmationEmail: 'successMessage',
  excel: 'fileExcel',
  support: 'lifeRing',
  notifications: 'bellRing',
  pdf: 'filePDF',
  ringVolume: 'phoneRing',
  visibility: 'eye',
  question: 'help'
};

export type IconsMap = { [x: string]: FC<SVGProps<SVGSVGElement>> };
export type DefaultIconNames = keyof typeof defaultIcons;
export type AliasIconNames = keyof typeof aliasMap;
export type IconNames = DefaultIconNames | AliasIconNames | string;

export interface IconProps {
  className?: string;
  name: IconNames;
  viewBox?: string;
}

export const Icon: FC<IconProps> = ({ className, name, viewBox = '0 0 24 24', ...props }) => {
  const registeredIcons = useContext(RegisteredIconContext);

  const icons: IconsMap = {
    ...defaultIcons,
    ...registeredIcons
  };

  if (!name) {
    throw new Error(`You must provide a valid "name" prop to the "Icon" component.`);
  }

  if (!icons[name]) {
    if ((aliasMap as { [x: string]: DefaultIconNames })[name])
      name = (aliasMap as { [x: string]: DefaultIconNames })[name];
    else {
      throw new Error(`Icon with name "${name}" does not exist.`);
    }
  }

  const IconSvg = icons[name];

  return (
    <span className={classNames('lc-icon', `lc-icon-${name}`, className)} {...props}>
      <IconSvg viewBox={viewBox ? viewBox : undefined} />
    </span>
  );
};
