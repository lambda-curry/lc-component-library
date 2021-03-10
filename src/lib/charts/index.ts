import { defaults } from 'react-chartjs-2';
import { merge } from 'lodash';
import { ChartOptions } from 'chart.js';

// interface ChartOptions {
//   responsive?: boolean;
//   responsiveAnimationDuration?: number;
//   aspectRatio?: number;
//   maintainAspectRatio?: boolean;
//   events?: string[];
//   legendCallback?(chart: Chart): string;
//   onHover?(this: Chart, event: MouseEvent, activeElements: Array<{}>): any;
//   onClick?(event?: MouseEvent, activeElements?: Array<{}>): any;
//   onResize?(this: Chart, newSize: ChartSize): void;
//   title?: ChartTitleOptions;
//   legend?: ChartLegendOptions;
//   tooltips?: ChartTooltipOptions;
//   hover?: ChartHoverOptions;
//   animation?: ChartAnimationOptions;
//   elements?: ChartElementsOptions;
//   layout?: ChartLayoutOptions;
//   scale?: RadialLinearScale;
//   scales?: ChartScales | LinearScale | LogarithmicScale | TimeScale;
//   showLines?: boolean;
//   spanGaps?: boolean;
//   cutoutPercentage?: number;
//   circumference?: number;
//   rotation?: number;
//   devicePixelRatio?: number;
//   plugins?: ChartPluginsOptions;
//   defaultColor?: ChartColor;
// }

const chartDefaultOverrides: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  legend: { position: 'bottom' }
};
merge(defaults, {
  global: chartDefaultOverrides
});

export * from './PieChart/PieChart';
