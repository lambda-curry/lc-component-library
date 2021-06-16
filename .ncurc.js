module.exports = {
  reject: [
    // NOTE: Let's make sure we are deliberate about when we update React.
    'react',
    'react-dom',

    // NOTE: Chart.js v3 requires a more fine-grained migration, so rejecting for now.
    'chart.js',
    'chartjs-plugin-datalabels',
    'react-chartjs-2',
    '@types/chart.js',

    // NOTE: Let's manually update rollup plugins, as we could see breaking changes.
    'autoprefixer',
    "postcss",
    "postcss-cli",
    "postcss-comment",
    "postcss-each",
    "postcss-import",
    "postcss-nested",
    "postcss-scss",
    "postcss-strip-inline-comments",
    "postcss-url",
    'rollup-plugin-postcss',

    // NOTE: The latest `postcss-loader` version is not working with Storybook. Keep at '^4.2.0' until a fix is released.
    // See: https://stackoverflow.com/questions/66082397/typeerror-this-getoptions-is-not-a-function#answer-66146080
    'postcss-loader'
  ]
}
