import React, { useRef, FC } from 'react';
import { merge } from 'lodash';
import { Pie, ChartData, ChartDataFunction } from 'react-chartjs-2';
import { ChartOptions, ChartTooltipModel } from 'chart.js';
import { customTooltip } from '../chart.helpers';

export interface PieChartProps {
  type?: 'pie' | 'doughnut';
  data?: {
    label: string;
    value: number;
    color: string;
  }[];
  chartJSData?: ChartData<Chart.ChartData>;
  options?: ChartOptions;
  tooltip?: (tooltip: ChartTooltipModel, chartRef: React.RefObject<Pie>) => React.ReactNode;
}

export const PieChart: FC<PieChartProps> = props => {
  const type = props.type || 'pie';
  const chartRef = useRef<Pie>(null);

  const defaultOptions: ChartOptions = {
    cutoutPercentage: 55,
    legend: {
      onClick: () => {
        // The default behavior is to toggle data points when the legend item is clicked, but since this is a pie chart
        // we don't really need that behavior.
      }
    },
    tooltips: {
      enabled: false,
      custom: tooltipModel => customTooltip(tooltipModel, chartRef, props.tooltip)
    },
    plugins: {
      datalabels: {
        color: 'white',
        borderRadius: 6,
        padding: { left: 12, right: 10, top: 4, bottom: 4 },
        backgroundColor: 'rgba(0,0,0,.3)',
        labels: {
          title: {
            font: {
              weight: 'bold'
            }
          }
        },
        formatter: function (value: any, context: any) {
          if (!props.data) return value;
          const total = props.data.reduce((acc, curr) => acc + curr.value, 0);
          const percentage = Math.round((value / total) * 100);
          if (percentage < 10) return null;
          return `${percentage}%`;
        }
      }
    }
  };

  const options = merge(defaultOptions, props.options);

  const chartJSData: ChartDataFunction<any> = (canvas: HTMLElement) => {
    if (props.chartJSData) return props.chartJSData;

    return {
      labels: props.data?.map(dataset => dataset.label),
      datasets: [
        {
          data: props.data?.map(dataset => dataset.value),
          backgroundColor: props.data?.map(dataset => dataset.color)
        }
      ]
    } as ChartData<Chart.ChartData>;
  };

  return <Pie type={type} ref={chartRef} data={chartJSData} options={options} />;
};
