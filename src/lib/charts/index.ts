import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import { defaults } from 'react-chartjs-2';
import './charts.css';
export * from './PieChart/PieChart';
export * from './BarChart/BarChart';

// Note: this overrides the default global chart.js options
const chartDefaultOverrides: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: { position: 'bottom' },
  plugins: [ChartDataLabels]
};
merge(defaults, {
  global: chartDefaultOverrides
});
