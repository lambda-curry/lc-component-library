export function getCssVar(cssVar, computedStyle) {
  var styles = computedStyle ? computedStyle : getComputedStyle(document.documentElement);
  return styles.getPropertyValue("--".concat(cssVar)).replace(' ', '');
}
export function isColor(color) {
  var s = new Option().style;
  s.color = color;
  return s.color !== '';
}
export function getHexColor(colorStr) {
  var _window$getComputedSt;

  var a = document.createElement('div');
  a.style.color = colorStr;
  var colorArray = (_window$getComputedSt = window.getComputedStyle(document.body.appendChild(a)).color) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.match(/\d+/g);

  if (!colorArray) {
    return '';
  }

  var colors = colorArray.map(function (c) {
    return parseInt(c, 10);
  });
  document.body.removeChild(a);
  return colors.length >= 3 ? // tslint:disable-next-line: no-bitwise
  '#' + ((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1) : '';
}
export function pickTextColorBasedOnBgColorSimple(bgColor) {
  var lightColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#ffffff';
  var darkColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#000000';
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR

  var g = parseInt(color.substring(2, 4), 16); // hexToG

  var b = parseInt(color.substring(4, 6), 16); // hexToB

  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
} // Src: https://www.sitepoint.com/javascript-generate-lighter-darker-color/

export function lightenDarkenColor(hex) {
  var lum = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -0.2;
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');

  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  lum = lum || 0; // convert to decimal and change luminosity
  // tslint:disable-next-line: one-variable-per-declaration

  var rgb = '#',
      c,
      i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}