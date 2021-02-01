module.exports = {
  reject: [
    // Let's make sure we are deliberate about when we update React.
    'react',
    'react-dom',

    // Formik has breaking changes that we need to resolve before upgrading.
    'formik',

    // Not all our packages currently support PostCSS v8, so we need to wait for them to add support.
    'autoprefixer',
    'postcss',
    'postcss-cli',
    'postcss-scss',
    'rollup-plugin-postcss',
  ]
}
