import React, { FC, SVGProps, useContext } from 'react';
import classNames from 'classnames';
import { RegisteredIconContext } from './IconRegistry';
import './icon.scss';

import { ReactComponent as addUser } from '../assets/icons/addUser.svg';
import { ReactComponent as analytics } from '../assets/icons/analytics.svg';
import { ReactComponent as apps } from '../assets/icons/apps.svg';
import { ReactComponent as archive } from '../assets/icons/archive.svg';
import { ReactComponent as arrowLeft } from '../assets/icons/arrowLeft.svg';
import { ReactComponent as bell } from '../assets/icons/bell.svg';
import { ReactComponent as chat } from '../assets/icons/chat.svg';
import { ReactComponent as checkbox } from '../assets/icons/checkbox.svg';
import { ReactComponent as checkboxFilled } from '../assets/icons/checkboxFilled.svg';
import { ReactComponent as chevronDown } from '../assets/icons/chevronDown.svg';
import { ReactComponent as clock } from '../assets/icons/clock.svg';
import { ReactComponent as clockFilled } from '../assets/icons/clockFilled.svg';
import { ReactComponent as close } from '../assets/icons/close.svg';
import { ReactComponent as company } from '../assets/icons/company.svg';
import { ReactComponent as concessionManager } from '../assets/icons/concessionManager.svg';
import { ReactComponent as confirmationEmail } from '../assets/icons/confirmationEmail.svg';
import { ReactComponent as copy } from '../assets/icons/copy.svg';
import { ReactComponent as deal } from '../assets/icons/deal.svg';
import { ReactComponent as download } from '../assets/icons/download.svg';
import { ReactComponent as drag } from '../assets/icons/drag.svg';
import { ReactComponent as error } from '../assets/icons/error.svg';
import { ReactComponent as expand } from '../assets/icons/expand.svg';
import { ReactComponent as filter } from '../assets/icons/filter.svg';
import { ReactComponent as flame } from '../assets/icons/flame.svg';
import { ReactComponent as hamburger } from '../assets/icons/hamburger.svg';
import { ReactComponent as help } from '../assets/icons/help.svg';
import { ReactComponent as home } from '../assets/icons/home.svg';
import { ReactComponent as income } from '../assets/icons/income.svg';
import { ReactComponent as laptop } from '../assets/icons/laptop.svg';
import { ReactComponent as location } from '../assets/icons/location.svg';
import { ReactComponent as menu } from '../assets/icons/menu.svg';
import { ReactComponent as navigation } from '../assets/icons/navigation.svg';
import { ReactComponent as paintBrush } from '../assets/icons/paintBrush.svg';
import { ReactComponent as pencil } from '../assets/icons/pencil.svg';
import { ReactComponent as phone } from '../assets/icons/phone.svg';
import { ReactComponent as plus } from '../assets/icons/plus.svg';
import { ReactComponent as profile } from '../assets/icons/profile.svg';
import { ReactComponent as radio } from '../assets/icons/radio.svg';
import { ReactComponent as radioFilled } from '../assets/icons/radioFilled.svg';
import { ReactComponent as resize } from '../assets/icons/resize.svg';
import { ReactComponent as schedule } from '../assets/icons/schedule.svg';
import { ReactComponent as search } from '../assets/icons/search.svg';
import { ReactComponent as settings } from '../assets/icons/settings.svg';
import { ReactComponent as sms } from '../assets/icons/sms.svg';
import { ReactComponent as trash } from '../assets/icons/trash.svg';
import { ReactComponent as user } from '../assets/icons/user.svg';
import { ReactComponent as users } from '../assets/icons/users.svg';
import { ReactComponent as video } from '../assets/icons/video.svg';
import { ReactComponent as pdf } from '../assets/icons/file-pdf.svg';
import { ReactComponent as successMessage } from '../assets/icons/successMessage.svg';

export const defaultIcons = {
  addUser,
  analytics,
  apps,
  archive,
  arrowLeft,
  bell,
  chat,
  checkbox,
  checkboxFilled,
  chevronDown,
  clock,
  clockFilled,
  close,
  company,
  concessionManager,
  copy,
  deal,
  download,
  drag,
  error,
  expand,
  filter,
  flame,
  hamburger,
  help,
  home,
  income,
  laptop,
  location,
  menu,
  navigation,
  paintBrush,
  pencil,
  phone,
  plus,
  profile,
  radio,
  radioFilled,
  resize,
  schedule,
  search,
  settings,
  sms,
  trash,
  user,
  users,
  video,
  pdf,
  successMessage
};

const aliasMap = {
  confirmationEmail: 'successMessage'
};

export type DefaultIconNames = keyof typeof defaultIcons;
export type AliasIconNames = keyof typeof aliasMap;
export type IconNames = DefaultIconNames & AliasIconNames;

export interface IconProps {
  className?: string;
  name: DefaultIconNames | string;
  viewBox?: string;
}

export const Icon: FC<IconProps> = ({ className, name, viewBox = '0 0 24 24', ...props }) => {
  const registeredIcons = useContext(RegisteredIconContext);

  const icons: { [x: string]: FC<SVGProps<SVGSVGElement>> } = {
    ...defaultIcons,
    ...registeredIcons
  };

  if (!name) {
    if ((aliasMap as { [x: string]: DefaultIconNames })[name])
      name = (aliasMap as { [x: string]: DefaultIconNames })[name];
    else {
      throw new Error(`You must provide a valid "name" prop to the "Icon" component.`);
    }
  }

  if (!icons[name]) {
    throw new Error(`Icon with name "${name}" does not exist.`);
  }

  const IconSvg = icons[name];

  return (
    <span className={classNames('lc-icon', `lc-icon-${name}`, className)} {...props}>
      <IconSvg viewBox={viewBox ? viewBox : undefined} />
    </span>
  );
};
