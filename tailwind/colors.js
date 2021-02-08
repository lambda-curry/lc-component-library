const colorWithOpactiy = (color) => ({ opacityVariable, opacityValue }) => {
  const cssVariable = `var(--lc-color-${color})`;

  if (opacityValue !== undefined) return `rgba(${cssVariable}, ${opacityValue})`;
  if (opacityVariable !== undefined) return `rgba(${cssVariable}, var(${opacityVariable}, 1))`;

  return `rgb(${cssVariable})`;
}

const baseColors = {
  transparent: 'transparent',
  current: 'currentColor',
  black: colorWithOpactiy('black'),
  white: colorWithOpactiy('white'),
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
  warn: [
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
  acc[variantColorName] = colorWithOpactiy(color);
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
  colorWithOpactiy,
  generateVariantThemeColors,
  generateThemeColors,
};
