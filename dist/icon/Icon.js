import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import classNames from 'classnames';
import './icon.scss';
import { ReactComponent as addUser } from '../assets/icons/addUser.svg';
import { ReactComponent as analytics } from '../assets/icons/analytics.svg';
import { ReactComponent as apps } from '../assets/icons/apps.svg';
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
export var icons = {
  addUser: addUser,
  analytics: analytics,
  apps: apps,
  arrowLeft: arrowLeft,
  bell: bell,
  chat: chat,
  checkbox: checkbox,
  checkboxFilled: checkboxFilled,
  chevronDown: chevronDown,
  clock: clock,
  clockFilled: clockFilled,
  close: close,
  company: company,
  concessionManager: concessionManager,
  copy: copy,
  deal: deal,
  download: download,
  drag: drag,
  error: error,
  expand: expand,
  filter: filter,
  flame: flame,
  hamburger: hamburger,
  help: help,
  home: home,
  income: income,
  laptop: laptop,
  location: location,
  menu: menu,
  navigation: navigation,
  paintBrush: paintBrush,
  pencil: pencil,
  phone: phone,
  plus: plus,
  profile: profile,
  radio: radio,
  radioFilled: radioFilled,
  resize: resize,
  schedule: schedule,
  search: search,
  settings: settings,
  sms: sms,
  trash: trash,
  user: user,
  users: users,
  video: video
};
export var Icon = function Icon(_ref) {
  var className = _ref.className,
      name = _ref.name,
      props = _objectWithoutProperties(_ref, ["className", "name"]);

  if (!name) {
    throw new Error("You must provide a valid \"name\" prop to the \"Icon\" component.");
  }

  if (!icons[name]) {
    throw new Error("Icon with name \"".concat(name, "\" does not exist."));
  }

  var IconSvg = icons[name];
  return /*#__PURE__*/React.createElement("span", Object.assign({
    className: classNames("icon icon-".concat(name), className)
  }, props), /*#__PURE__*/React.createElement(IconSvg, null));
};