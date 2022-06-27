import React, { FC, SVGProps, useContext } from 'react';
import classNames from 'classnames';
import { RegisteredIconContext } from './IconRegistry';
import './icon.css';

import { ReactComponent as addUser } from '../../assets/icons/addUser.svg';
import { ReactComponent as analytics } from '../../assets/icons/analytics.svg';
import { ReactComponent as android } from '../../assets/icons/android.svg';
import { ReactComponent as apple } from '../../assets/icons/apple.svg';
import { ReactComponent as apps } from '../../assets/icons/apps.svg';
import { ReactComponent as archive } from '../../assets/icons/archive.svg';
import { ReactComponent as arrowDown } from '../../assets/icons/arrowDown.svg';
import { ReactComponent as arrowLeft } from '../../assets/icons/arrowLeft.svg';
import { ReactComponent as arrowRight } from '../../assets/icons/arrowRight.svg';
import { ReactComponent as arrowUp } from '../../assets/icons/arrowUp.svg';
import { ReactComponent as bell } from '../../assets/icons/bell.svg';
import { ReactComponent as bellRing } from '../../assets/icons/bellRing.svg';
import { ReactComponent as block } from '../../assets/icons/block.svg';
import { ReactComponent as chat } from '../../assets/icons/chat.svg';
import { ReactComponent as check } from '../../assets/icons/check.svg';
import { ReactComponent as checkbox } from '../../assets/icons/checkbox.svg';
import { ReactComponent as checkboxFilled } from '../../assets/icons/checkboxFilled.svg';
import { ReactComponent as chevronDown } from '../../assets/icons/chevronDown.svg';
import { ReactComponent as chevronLeft } from '../../assets/icons/chevronLeft.svg';
import { ReactComponent as chevronRight } from '../../assets/icons/chevronRight.svg';
import { ReactComponent as chevronUp } from '../../assets/icons/chevronUp.svg';
import { ReactComponent as clock } from '../../assets/icons/clock.svg';
import { ReactComponent as clockFilled } from '../../assets/icons/clockFilled.svg';
import { ReactComponent as close } from '../../assets/icons/close.svg';
import { ReactComponent as company } from '../../assets/icons/company.svg';
import { ReactComponent as concessionManager } from '../../assets/icons/concessionManager.svg';
import { ReactComponent as copy } from '../../assets/icons/copy.svg';
import { ReactComponent as creditCard } from '../../assets/icons/creditCard.svg';
import { ReactComponent as deal } from '../../assets/icons/deal.svg';
import { ReactComponent as download } from '../../assets/icons/download.svg';
import { ReactComponent as drag } from '../../assets/icons/drag.svg';
import { ReactComponent as error } from '../../assets/icons/error.svg';
import { ReactComponent as expand } from '../../assets/icons/expand.svg';
import { ReactComponent as eye } from '../../assets/icons/eye.svg';
import { ReactComponent as facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as filePDF } from '../../assets/icons/filePDF.svg';
import { ReactComponent as fileExcel } from '../../assets/icons/fileExcel.svg';
import { ReactComponent as filter } from '../../assets/icons/filter.svg';
import { ReactComponent as flame } from '../../assets/icons/flame.svg';
import { ReactComponent as hamburger } from '../../assets/icons/hamburger.svg';
import { ReactComponent as help } from '../../assets/icons/help.svg';
import { ReactComponent as home } from '../../assets/icons/home.svg';
import { ReactComponent as inbox } from '../../assets/icons/inbox.svg';
import { ReactComponent as income } from '../../assets/icons/income.svg';
import { ReactComponent as instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as laptop } from '../../assets/icons/laptop.svg';
import { ReactComponent as lifeRing } from '../../assets/icons/lifeRing.svg';
import { ReactComponent as linkedin } from '../../assets/icons/linkedin.svg';
import { ReactComponent as location } from '../../assets/icons/location.svg';
import { ReactComponent as mailOutline } from '../../assets/icons/mailOutline.svg';
import { ReactComponent as menu } from '../../assets/icons/menu.svg';
import { ReactComponent as navigation } from '../../assets/icons/navigation.svg';
import { ReactComponent as paintBrush } from '../../assets/icons/paintBrush.svg';
import { ReactComponent as partner } from '../../assets/icons/partner.svg';
import { ReactComponent as pencil } from '../../assets/icons/pencil.svg';
import { ReactComponent as phone } from '../../assets/icons/phone.svg';
import { ReactComponent as phoneCheck } from '../../assets/icons/phoneCheck.svg';
import { ReactComponent as phoneRing } from '../../assets/icons/phoneRing.svg';
import { ReactComponent as plus } from '../../assets/icons/plus.svg';
import { ReactComponent as profile } from '../../assets/icons/profile.svg';
import { ReactComponent as radio } from '../../assets/icons/radio.svg';
import { ReactComponent as radioFilled } from '../../assets/icons/radioFilled.svg';
import { ReactComponent as resize } from '../../assets/icons/resize.svg';
import { ReactComponent as schedule } from '../../assets/icons/schedule.svg';
import { ReactComponent as search } from '../../assets/icons/search.svg';
import { ReactComponent as settings } from '../../assets/icons/settings.svg';
import { ReactComponent as sms } from '../../assets/icons/sms.svg';
import { ReactComponent as successMessage } from '../../assets/icons/successMessage.svg';
import { ReactComponent as threeDots } from '../../assets/icons/threeDots.svg';
import { ReactComponent as touch } from '../../assets/icons/touch.svg';
import { ReactComponent as trash } from '../../assets/icons/trash.svg';
import { ReactComponent as twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as unfold } from '../../assets/icons/unfold.svg';
import { ReactComponent as user } from '../../assets/icons/user.svg';
import { ReactComponent as users } from '../../assets/icons/users.svg';
import { ReactComponent as video } from '../../assets/icons/video.svg';
import { ReactComponent as warning } from '../../assets/icons/warning.svg';

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
  instagram,
  laptop,
  lifeRing,
  linkedin,
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
  question: 'help',
  linkedIn: 'linkedin'
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

  // TODO: #106 Fix React 18 TypeScript errors @jaredhill4
  // @ts-ignore
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
