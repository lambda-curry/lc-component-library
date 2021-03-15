import React, { FC } from 'react';
import { ChartOptions } from 'chart.js';
import { merge } from 'lodash';
import { ChartBase, ChartBaseProps } from '../ChartBase';
import classNames from 'classnames';

export interface BarChartProps extends ChartBaseProps {}

export const BarChart: FC<BarChartProps> = ({ className, options, type = 'bar', ...props }) => {
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
      options={merge(defaultOptions, options)}
      type={type}
      {...props}
    />
  );
};
