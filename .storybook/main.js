/**
 * For info about getting PostCSS to work with Storybook:
 * https://storybook.js.org/addons/@storybook/addon-postcss
 * https://lifesaver.codes/answer/a-working-example-with-postcss-for-storybook-v5
 * https://blog.jakoblind.no/postcss-webpack/
 */

const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|tsx|mdx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport/register',
    '@storybook/addon-postcss',
    {
      name: '@storybook/addon-docs',
      options: {
        sourceLoaderOptions: null
      }
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: true }
        }
      }
    },
    '@storybook/addon-controls'
  ],
  webpackFinal: async config => {
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader');

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env')
    ];

    config.module.rules[0].use[0].options.plugins = [
      [
        require.resolve('babel-plugin-named-asset-import'),
        {
          loaderMap: {
            svg: {
              ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]'
            }
          }
        }
      ]
    ];

    // Remove the existing css rule
    config.module.rules = config.module.rules.filter(
      f => f.test.toString() !== '/\\.css$/'
    );

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.(css|scss)$/,
      loaders: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ],
      include: [path.resolve(__dirname, '../src'), __dirname]
    });

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main'];

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [['react-app', { flow: false, typescript: true }]],
            plugins: [
              require.resolve('babel-plugin-react-require'),
              require.resolve('@babel/plugin-proposal-class-properties'),
              // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
              // require.resolve('babel-plugin-remove-graphql-queries'),
              require.resolve('babel-plugin-react-docgen')
            ]
          }
        }
      ]
    });
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
};
