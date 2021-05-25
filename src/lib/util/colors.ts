export const hexColorRegexString = '[a-fA-F0-9]';
export const hexColorRegex = new RegExp(hexColorRegexString);

export function getCssVar(cssVar: string, computedStyle?: CSSStyleDeclaration): string {
  const styles = computedStyle ? computedStyle : getComputedStyle(document.documentElement);
  return styles.getPropertyValue(`--${cssVar}`).replace(' ', '');
}

export function getColorVar(color: string, alpha = 1) {
  const cssVar = `lc-color-${color}`;

  if (!getCssVar(cssVar)) return '';
  return `rgba(${getCssVar(cssVar)}, ${alpha})`;
}

export function isColor(color: string): boolean {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
}

export function getHexColor(colorStr: string): string {
  const a = document.createElement('div');
  a.style.color = colorStr;
  const colorArray = window.getComputedStyle(document.body.appendChild(a)).color?.match(/\d+/g);
  if (!colorArray) {
    return '';
  }
  const colors = colorArray.map(c => parseInt(c, 10));
  document.body.removeChild(a);
  return colors.length >= 3
    ? // tslint:disable-next-line: no-bitwise
      '#' + ((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)
    : '';
}

export function pickTextColorBasedOnBgColorSimple(
  bgColor: string,
  lightColor = '#ffffff',
  darkColor = '#000000'
): string {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor;
}

// Src: https://www.sitepoint.com/javascript-generate-lighter-darker-color/
export function lightenDarkenColor(hex: string, lum = -0.2): string {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  // tslint:disable-next-line: one-variable-per-declaration
  let rgb = '#',
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

export function isHexColor(color: string): boolean {
  return new RegExp(`^[#]*(${hexColorRegexString}{6}|${hexColorRegexString}{3})$`, 'i').test(color);
}

export function isRgbColor(color: string): boolean {
  return new RegExp(['rgb', 'rgba', ','].join('|')).test(color);
}

export function stripRgb(color: string): string {
  return color.replace(/[^\d,.]/g, '');
}

export function rgbToHex(color: string) {
  if (isHexColor(color) || !isRgbColor(color)) return color;

  color = stripRgb(color);
  const colorArray = color.replace(' ', '').split(',');
  const colors = colorArray.map(c => parseInt(c, 10));

  return '#' + ((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).slice(1);
}

export function hexToRgb(color: string) {
  if (isRgbColor(color) || !isHexColor(color)) return color;

  let r = `0`;
  let g = `0`;
  let b = `0`;

  if (color.length == 4) {
    // 3 digits
    r = `0x${color[1]}${color[1]}`;
    g = `0x${color[2]}${color[2]}`;
    b = `0x${color[3]}${color[3]}`;
  } else if (color.length == 7) {
    // 6 digits
    r = `0x${color[1]}${color[2]}`;
    g = `0x${color[3]}${color[4]}`;
    b = `0x${color[5]}${color[6]}`;
  }

  return `${+r}, ${+g}, ${+b}`;
}
