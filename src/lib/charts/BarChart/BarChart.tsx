import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import React from 'react';
import { Bar, ChartData } from 'react-chartjs-2';

export const BarChart: React.FC<{
  chartJSData: ChartData<Chart.ChartData>;
  options?: ChartOptions;
}> = props => {
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
