import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from 'react';
import classNames from 'classnames';
import { Icon } from './Icon';
import { getCssVar } from '../util/colors';
export var DecorativeIcon = function DecorativeIcon(_ref) {
  var className = _ref.className,
      color = _ref.color,
      props = _objectWithoutProperties(_ref, ["className", "color"]);

  // const colorIsVariable = [].includes(color);
  var style = {
    backgroundColor: false ? getCssVar(color) : color
  };
  return /*#__PURE__*/React.createElement("div", {
    className: classNames(className, 'icon-decorative'),
    style: style
  }, /*#__PURE__*/React.createElement(Icon, props));
};