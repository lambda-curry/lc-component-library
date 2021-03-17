import { ChartFontOptions, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { merge } from 'lodash';
import { defaults } from 'react-chartjs-2';
import { getCssVar } from '../util/colors';

export * from './PieChart/PieChart';
export * from './BarChart/BarChart';
export * from './LineChart/LineChart';
export * from './TimeChart/TimeChart';

// Note: this overrides the default global chart.js options
const chartDefaultOverrides: ChartOptions & ChartFontOptions = {
  legend: { position: 'bottom' },
  plugins: [ChartDataLabels],
  defaultFontSize: 14,
  defaultFontFamily: getCssVar('lc-font-family-sans'),
  maintainAspectRatio: false // suggested for responsiveness https://stackoverflow.com/questions/53594042/how-to-make-react-chartjs-2-responsive-on-mobile
};
merge(defaults, {
  global: chartDefaultOverrides
});
