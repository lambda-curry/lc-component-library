import React, { FC } from 'react';
import { ChartDataSets } from 'chart.js';
import classNames from 'classnames';
import { merge } from 'lodash';
import { getColorVar } from '../util/colors';
import { ChartJSOptions, ChartLabels } from './chart.helpers';
import { ChartBase, ChartBaseProps } from './ChartBase';

export interface AxialChartProps extends ChartBaseProps {
  labels?: ChartLabels;
  datasets?: Array<
    ChartDataSets & {
      color?: string;
    }
  >;
}

export const AxialChart: FC<AxialChartProps> = ({ options, className, ...props }) => {
  const defaultOptions: ChartJSOptions = {
    scales: {
      gridLines: {
        drawBorder: false
      },
      yAxes: [
        {
          position: 'right',
          ticks: {
            beginAtZero: true,
            padding: 24,
            fontSize: 14,
            fontColor: getColorVar('gray')
          },
          gridLines: {
            borderDash: [2, 2],
            drawBorder: false,
            color: getColorVar('gray-lighter'),
            zeroLineColor: getColorVar('gray-lighter')
          }
        }
      ],
      xAxes: [
        {
          offset: true,
          ticks: {
            padding: 12,
            fontSize: 14,
            fontColor: getColorVar('gray')
          },
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  return (
    <ChartBase
      className={classNames('lc-chart-axial', className)}
      options={merge(defaultOptions, options)}
      {...props}
    />
  );
};
