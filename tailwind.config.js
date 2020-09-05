const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx'],
  prefix: 'lc-',
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      green: {
        active: '#5bd067'
      },
      blue: '#28a7db',
      danger: '#f44336',
      warn: '#f8ba44',
      success: '#21cdac',
      gray: {
        dark: '#707070',
        normal: '#a0a5ba',
        light: '#bdbdbd',
        lighter: '#e2e2e2',
        lightest: '#f5f6fa',
      },
      primary: 'var(--primary-color)',
      secondary: 'var(--secondary-color)'
    },
    spacing: {
      '0': '0',
      '8': '8px',
      '16': '16px',
      '24': '24px',
      '32': '32px',
      '40': '40px',
      '48': '48px',
      '56': '56px',
      '64': '64px',
      '72': '72px',
      '80': '80px',
      '88': '88px',
      '96': '96px',
      '104': '104px',
      '112': '112px',
      '120': '120px'
    },
    fontFamily: {
      sans: ['lc-gilroy', 'sans-serif']
    },
    fontWeight: {
      ...defaultTheme.fontWeight,
      ultralight: 200,
      regular: 400,
      heavy: 900
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
      '0': '0',
      '1': '1px',
      '2': '2px',
      '4': '4px',
      '8': '8px'
    }
  },
  variants: {},
  plugins: []
};
