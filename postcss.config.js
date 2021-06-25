/**
 * TODO: Consider adding notes about our configuration to our README.md.
 *
 * References for Tailwind/Storybook configuration:
 * - https://github.com/postcss/postcss-scss
 * - https://lifesaver.codes/answer/a-working-example-with-postcss-for-storybook-v5
 * - https://medium.com/@rbutera/jamstack-tutorial-part-1-gatsbyjs-with-storybook-tailwindcss-and-typescript-setup-bd28855db897
 * - https://dev.to/0xcap/nextjs-typescript-tailwindcss-storybook-project-setup-4clj
 * - https://medium.com/@romansorin/integrating-gatsby-tailwind-and-storybook-90b4f76d0fc7
 * - https://medium.com/better-programming/start-a-component-library-with-storybook-tailwind-css-and-typescript-ebaffc33d098
 * - https://dev.to/michaeldscherr/switching-from-sass-to-postcss-4p0c
 * - https://tailwindcss.com/docs/using-with-preprocessors#using-post-css-as-your-preprocessor
 * - https://epsi-rns.gitlab.io/frontend/2019/10/10/postcss-configuration/
 */

const { hexToRGB } = require('./util');

module.exports = (api) => {
  // `api.file` - path to the file
  // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // `api.webpackLoaderContext` - loader context for complex use cases
  // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // `api.options` - the `postcssOptions` options

  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    inject: false,
    syntax: 'postcss-scss',
    plugins: [
      'postcss-import',
      'postcss-strip-inline-comments',
      'precss',
      ['postcss-functions', { functions: { hexToRGB } }],
      ['postcss-url', {
        url: 'copy',
        maxSize: 10 * 1024, // inline files < 10k, copy files > 10k
        fallback: 'copy',
        optimizeSvgEncode: true,
        assetsPath: 'dist/assets',
      }],
      'postcss-focus-visible',
      'tailwindcss',
      'autoprefixer'
      ['cssnano', {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
        }]
      }]
    ],
  };
};