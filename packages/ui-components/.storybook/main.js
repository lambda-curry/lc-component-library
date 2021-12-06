const path = require('path');
const toPath = filePath => path.join(process.cwd(), filePath);

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: false,
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@nrwl/react/plugins/storybook',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: true }
        }
      }
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss')
        },
        postcssOptions: {
          config: '../postcss.config.js'
        }
      }
    }
  ],
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    // NOTE: For some reason the '@nrwl/react/plugins/storybook' css loader did not work, so we remove that one in favor of the storybook postcss loader
    config.module.rules = config.module.rules.filter(
      r => !(r.test instanceof RegExp && r.test.toString().includes('less'))
    );

    // Note: https://github.com/mui-org/material-ui/issues/24282#issuecomment-796755133
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': toPath('node_modules/@emotion/react'),
      'emotion-theming': toPath('node_modules/@emotion/react')
    };

    return config;
  }
};
