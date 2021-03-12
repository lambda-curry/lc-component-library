import React, { FC } from 'react';
import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import { Bar, ChartData } from 'react-chartjs-2';

export interface BarChartProps {
  chartJSData: ChartData<Chart.ChartData>;
  options?: ChartOptions;
}
export const BarChart: FC<BarChartProps> = props => {
  const defaultOptions: ChartOptions = {
    legend: {
      align: 'start'
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        display: false
      }
    }
  };
  const options = merge(defaultOptions, props.options);

  return <Bar data={props.chartJSData} options={options} />;
};
