import React, { FC, SVGProps, useContext } from 'react';
import classNames from 'classnames';
import { RegisteredIconContext } from './IconRegistry';
import './icon.css';

import { ReactComponent as addUser } from './addUser.svg';
import { ReactComponent as analytics } from './analytics.svg';
import { ReactComponent as android } from './android.svg';
import { ReactComponent as apple } from './apple.svg';
import { ReactComponent as apps } from './apps.svg';
import { ReactComponent as archive } from './archive.svg';
import { ReactComponent as arrowDown } from './arrowDown.svg';
import { ReactComponent as arrowLeft } from './arrowLeft.svg';
import { ReactComponent as arrowRight } from './arrowRight.svg';
import { ReactComponent as arrowUp } from './arrowUp.svg';
import { ReactComponent as bell } from './bell.svg';
import { ReactComponent as bellRing } from './bellRing.svg';
import { ReactComponent as block } from './block.svg';
import { ReactComponent as chat } from './chat.svg';
import { ReactComponent as check } from './check.svg';
import { ReactComponent as checkbox } from './checkbox.svg';
import { ReactComponent as checkboxFilled } from './checkboxFilled.svg';
import { ReactComponent as chevronDown } from './chevronDown.svg';
import { ReactComponent as chevronLeft } from './chevronLeft.svg';
import { ReactComponent as chevronRight } from './chevronRight.svg';
import { ReactComponent as chevronUp } from './chevronUp.svg';
import { ReactComponent as clock } from './clock.svg';
import { ReactComponent as clockFilled } from './clockFilled.svg';
import { ReactComponent as close } from './close.svg';
import { ReactComponent as company } from './company.svg';
import { ReactComponent as concessionManager } from './concessionManager.svg';
import { ReactComponent as copy } from './copy.svg';
import { ReactComponent as creditCard } from './creditCard.svg';
import { ReactComponent as deal } from './deal.svg';
import { ReactComponent as download } from './download.svg';
import { ReactComponent as drag } from './drag.svg';
import { ReactComponent as error } from './error.svg';
import { ReactComponent as expand } from './expand.svg';
import { ReactComponent as eye } from './eye.svg';
import { ReactComponent as facebook } from './facebook.svg';
import { ReactComponent as filePDF } from './filePDF.svg';
import { ReactComponent as fileExcel } from './fileExcel.svg';
import { ReactComponent as filter } from './filter.svg';
import { ReactComponent as flame } from './flame.svg';
import { ReactComponent as hamburger } from './hamburger.svg';
import { ReactComponent as help } from './help.svg';
import { ReactComponent as home } from './home.svg';
import { ReactComponent as inbox } from './inbox.svg';
import { ReactComponent as income } from './income.svg';
import { ReactComponent as laptop } from './laptop.svg';
import { ReactComponent as lifeRing } from './lifeRing.svg';
import { ReactComponent as location } from './location.svg';
import { ReactComponent as mailOutline } from './mailOutline.svg';
import { ReactComponent as menu } from './menu.svg';
import { ReactComponent as navigation } from './navigation.svg';
import { ReactComponent as paintBrush } from './paintBrush.svg';
import { ReactComponent as partner } from './partner.svg';
import { ReactComponent as pencil } from './pencil.svg';
import { ReactComponent as phone } from './phone.svg';
import { ReactComponent as phoneCheck } from './phoneCheck.svg';
import { ReactComponent as phoneRing } from './phoneRing.svg';
import { ReactComponent as plus } from './plus.svg';
import { ReactComponent as profile } from './profile.svg';
import { ReactComponent as radio } from './radio.svg';
import { ReactComponent as radioFilled } from './radioFilled.svg';
import { ReactComponent as resize } from './resize.svg';
import { ReactComponent as schedule } from './schedule.svg';
import { ReactComponent as search } from './search.svg';
import { ReactComponent as settings } from './settings.svg';
import { ReactComponent as sms } from './sms.svg';
import { ReactComponent as successMessage } from './successMessage.svg';
import { ReactComponent as threeDots } from './threeDots.svg';
import { ReactComponent as touch } from './touch.svg';
import { ReactComponent as trash } from './trash.svg';
import { ReactComponent as twitter } from './twitter.svg';
import { ReactComponent as unfold } from './unfold.svg';
import { ReactComponent as user } from './user.svg';
import { ReactComponent as users } from './users.svg';
import { ReactComponent as video } from './video.svg';
import { ReactComponent as warning } from './warning.svg';

export const defaultIcons = {
  addUser,
  analytics,
  android,
  apps,
  apple,
  archive,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowUp,
  bell,
  bellRing,
  block,
  chat,
  check,
  checkbox,
  checkboxFilled,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  clock,
  clockFilled,
  close,
  company,
  concessionManager,
  copy,
  creditCard,
  deal,
  download,
  drag,
  error,
  expand,
  eye,
  facebook,
  fileExcel,
  filePDF,
  filter,
  flame,
  hamburger,
  help,
  home,
  inbox,
  income,
  laptop,
  lifeRing,
  location,
  mailOutline,
  menu,
  navigation,
  paintBrush,
  partner,
  pencil,
  phone,
  phoneCheck,
  phoneRing,
  plus,
  profile,
  radio,
  radioFilled,
  resize,
  schedule,
  search,
  settings,
  sms,
  successMessage,
  threeDots,
  touch,
  trash,
  twitter,
  unfold,
  user,
  users,
  video,
  warning
};

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
