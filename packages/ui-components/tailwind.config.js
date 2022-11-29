const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const defaultTheme = require('tailwindcss/defaultTheme');
const { cssVar } = require('./tailwind/helpers');
const { baseColors, themeColors } = require('./tailwind/colors');

module.exports = {
  content: [`${__dirname}/src/lib/**/*.{tsx,mdx}`, ...createGlobPatternsForDependencies(__dirname)],
  prefix: 'lc-',
  extend: {
    fontWeight: {
      ...defaultTheme.fontWeight,
      ultralight: 200,
      regular: 400,
      heavy: 900
    },
    scale: {
      ...defaultTheme.scale,
      98: '.98'
    }
  },
  theme: {
    ...defaultTheme,
    colors: {
      ...baseColors,
      ...themeColors
    },
    spacing: {
      0: '0',
      1: '1px',
      2: '2px',
      3: '3px',
      4: '4px',
      8: '8px',
      12: '12px',
      14: '14px',
      16: '16px',
      20: '20px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      72: '72px',
      80: '80px',
      88: '88px',
      96: '96px',
      104: '104px',
      112: '112px',
      120: '120px',
      128: '128px',
      136: '136px',
      144: '144px',
      152: '152px',
      160: '160px',
      168: '168px',
      176: '176px',
      184: '184px',
      192: '192px',
      200: '200px',
      208: '208px',
      216: '216px',
      224: '224px',
      232: '232px',
      240: '240px'
    },
    fontFamily: {
      sans: cssVar('font-family-sans'),
      code: cssVar('font-family-code')
    },
    fontSize: {
      xs: ['12px', '1.5'],
      sm: ['14px', '1.5'],
      md: ['16px', '1.5'],
      lg: ['20px', '1.5'],
      xl: ['24px', '1.15'],
      '2xl': ['32px', '1.15'],
      '3xl': ['36px', '1.15'],
      '4xl': ['48px', '1.15']
    },
    borderWidth: {
      0: '0',
      1: '1px',
      2: '2px',
      4: '4px',
      8: '8px'
    },
    borderRadius: {
      none: 'none',
      xs: '2px',
      sm: '4px',
      DEFAULT: 'var(--lc-border-radius)',
      md: '6px',
      lg: '8px',
      xl: '12px'
    }
  },
  variants: {
    extend: {
      opacity: ['disabled', 'active'],
      pointerEvents: ['disabled'],
      cursor: ['disabled', 'hover'],
      transform: ['active'],
      scale: ['active'],
      ringColor: ['focus-visible'],
      outline: ['focus-visible'],
      backgroundColor: ['focus-visible'],
      borderColor: ['focus-visible']
    }
  },
  plugins: []
};
