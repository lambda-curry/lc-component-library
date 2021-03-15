import React, { FC } from 'react';
import { merge } from 'lodash';
import { ChartData, ChartDataFunction } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { ChartBase } from '../ChartBase';
import classNames from 'classnames';

export interface PieChartProps {
  type?: 'pie' | 'doughnut';
  data?: {
    label: string;
    value: number;
    color: string;
  }[];
  chartJSData?: ChartData<Chart.ChartData>;
  options?: ChartOptions;
  className?: string;
}

export const PieChart: FC<PieChartProps> = ({ className, options, type = 'pie', ...props }) => {
  const defaultOptions: ChartOptions = {
    cutoutPercentage: 55,
    legend: {
      onClick: () => {
        // The default behavior is to toggle data points when the legend item is clicked, but since this is a pie chart
        // we don't really need that behavior.
      }
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

  return (
    <ChartBase
      data={chartJSData}
      options={merge(defaultOptions, options)}
      className={classNames('lc-chart-pie', className)}
      type={type}
    />
  );
};
