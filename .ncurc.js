module.exports = {
  reject: [
    // Let's make sure we are deliberate about when we update React.
    '@types/react',
    '@types/react-dom',
    'react',
    'react-dom',

    // Migrating to ChartJS v3 will take some time. Prevent updating with NCU.
    '@types/chart.js',
    'chart.js',
    'chartjs-plugin-datalabels', ,
    'react-chartjs-2',

    // Other major version updates to avoid until we can address the breaking changes.
    '@date-io/luxon',
    '@types/luxon',
    '@types/node',
    '@szhsin/react-menu',
    'luxon',
    'react-image-crop'
  ]
}
