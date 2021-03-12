const { cssVar } = require('./helpers');

const colorWithOpacity = (color) => ({ opacityVariable, opacityValue }) => {
  const cssVariable = cssVar(`color-${color}`);

  if (opacityValue !== undefined) return `rgba(${cssVariable}, ${opacityValue})`;
  if (opacityVariable !== undefined) return `rgba(${cssVariable}, var(${opacityVariable}, 1))`;

  return `rgb(${cssVariable})`;
}

const baseColors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: colorWithOpacity('black'),
  white: colorWithOpacity('white'),
};

const themeColorsConfig = {
  gray: [
    'lightest',
    'lighter',
    'light',
    'DEFAULT',
    'dark',
    'darker'
  ],
  primary: [
    'light',
    'DEFAULT',
    'dark'
  ],
  accent: [
    'DEFAULT',
    'dark'
  ],
  success: [
    'DEFAULT',
    'dark'
  ],
  warning: [
    'DEFAULT',
    'dark'
  ],
  danger: [
    'DEFAULT',
    'dark'
  ],
  active: [
    'DEFAULT'
  ]
};

const generateVariantThemeColors = (colorName) => themeColorsConfig[colorName].reduce((acc, variantColorName) => {
  const color = `${colorName}${variantColorName !== 'DEFAULT' ? `-${variantColorName}` : ''}`
  acc[variantColorName] = colorWithOpacity(color);
  return acc;
}, {});

const generateThemeColors = () => Object.keys(themeColorsConfig).reduce((acc, colorName) => {
  acc[colorName] = generateVariantThemeColors(colorName);
  return acc;
}, {});

const themeColors = generateThemeColors();

module.exports = {
  baseColors,
  themeColors,
  themeColorsConfig,
  colorWithOpactiy: colorWithOpacity,
  generateVariantThemeColors,
  generateThemeColors,
};
