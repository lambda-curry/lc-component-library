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
    legend: { display: false },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  const options = merge(defaultOptions, props.options);

  return <Bar data={props.chartJSData} options={options} />;
};
