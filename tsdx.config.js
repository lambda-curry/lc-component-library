// See: https://github.com/formium/tsdx/pull/183

const scss = require('rollup-plugin-scss');
const url = require('rollup-plugin-url');
const svgr = require('@svgr/rollup').default;
const postcss = require('rollup-plugin-postcss');
const { terser } = require('rollup-plugin-terser');
const nodeResolve = require('@rollup/plugin-node-resolve').default;

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url(),
      svgr(),
      scss(),
      postcss({ extract: false }),
      terser(),
      nodeResolve({ browser: true }),
      ...config.plugins
    ];
    return config;
  },
};
