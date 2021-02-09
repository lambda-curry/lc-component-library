module.exports = {
  reject: [
    // Let's make sure we are deliberate about when we update React.
    'react',
    'react-dom',

    // Not all our packages currently support PostCSS v8, so we need to wait for them to add support.
    'autoprefixer',
    "postcss",
    "postcss-cli",
    "postcss-comment",
    "postcss-each",
    "postcss-import",
    "postcss-nested",
    "postcss-scss",
    "postcss-simple-vars",
    "postcss-strip-inline-comments",
    "postcss-url",
    "precss",
    'rollup-plugin-postcss'
  ]
}
