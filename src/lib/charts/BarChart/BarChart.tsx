import React, { FC } from 'react';
import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import { Bar, ChartData } from 'react-chartjs-2';
import { ChartBase } from '../ChartBase';
import classNames from 'classnames';

export interface BarChartProps {
  chartJSData: ChartData<Chart.ChartData>;
  options?: ChartOptions;
  className?: string;
}

export const BarChart: FC<BarChartProps> = ({ className, options, ...props }) => {
  const defaultOptions: ChartOptions = {
    legend: { display: false },
    scales: {
      gridLines: {
        drawBorder: false
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          },
          gridLines: {
            color: '#dedede',
            borderDash: [2, 2],
            drawBorder: false
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            display: false
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

  return (
    <ChartBase
      className={classNames('lc-chart-bar', className)}
      data={props.chartJSData}
      options={merge(defaultOptions, options)}
      type="bar"
    />
  );
};
