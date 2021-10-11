const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  addons: [
    '@storybook/addon-links/register',
    '@storybook/addon-essentials/register',
    {
      name: '@storybook/addon-storysource/register',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: true }
        }
      }
    }
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.css$/,
      use: ['postcss-loader'],
      include: path.resolve(__dirname, '../')
    });
    return config;
  }
};
