/**
 * TODO: Consider moving these notes to our README.md.
 *
 * For a size comparison with the most popular UI libraries see:
 * https://blog.logrocket.com/comparing-popular-react-component-libraries/
 *
 * For a helpful configuration example see:
 * https://github.com/formium/tsdx/pull/183
 */

const url = require('rollup-plugin-url');
const svgr = require('@svgr/rollup').default;
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const postCSSConfig = require('./postcss.config');

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url(),
      svgr(),
      postcss({
        ...postCSSConfig,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
        inject: true,
        plugins: [
          ...postCSSConfig.plugins,
          // Only include the `postcss-url` plugin for our TSDX builds,
          // because Storybook uses webpack to process and bundle assets,
          // and this breaks the Storybook build.
          require("postcss-url")(process.env.NODE_ENV === 'production' ? {
            url: 'copy',
            maxSize: 10 * 1024, // inline files < 10k, copy files > 10k
            fallback: 'copy',
            optimizeSvgEncode: true,
            assetsPath: 'dist/assets',
          } : { url: 'rebase' }),
        ]
      }),
      terser(),
      nodeResolve({ browser: true }),
      ...config.plugins
    ];
    return config;
  },
};
